require('dotenv').config()
const express = require('express')
const app = express()
const {Pool} = require('pg')
const pool = new Pool()
const { Logger } = require('../Logger/Logger')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
pool.on('error', (err) => {
    Logger.error('Unexpected error on idle client', err)
})
const logger = new Logger()
app.use(cors())
app.use(cookieParser())

switch (process.env.NODE_ENV) {
case 'development':
    app.use('/pubg', express.static(path.join(__dirname, '../PubgTeamPage/PubgTeamPage')));
    app.use('/ext', express.static(path.join(__dirname, '../PubgTeamPage/ext')));
    app.use('/packages', express.static(path.join(__dirname, '../PubgTeamPage/packages')));
    app.use('/build', express.static(path.join(__dirname, '../PubgTeamPage/build')));
    app.use('/resources/public', express.static(path.join(__dirname, '../PubgTeamPage/PubgTeamPage/resources/public')));
    // apiRouter.get('/users_in_session', (req, res) => {res.json(_.values(cachedTokens));});
    break;

default:
    app.use('/pubg', express.static(path.join(__dirname, '../PubgBuild/PubgTeamPage')));
    break;
}

app.get('/matches', function (req, res) {
    (async () => {
        const client = await pool.connect()
        try {
            const response = await client.query('Select m.map_name, m.match_id, m.created_at as created_at, m.duration as duration, m.game_mode as game_mode, Max(mr.win_place) as finish from pubg.match m join pubg.match_record mr on m.match_id = mr.match_id group by m.match_id order by created_at desc')
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})

app.get('/match_records/:player_id', function (req, res) {
    (async () => {
        const client = await pool.connect()
        try {
            let query = 'SELECT * FROM pubg.match_record where player_id = $1'
            const response = await client.query(query, [req.params.player_id])
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})

app.get('/record', function (req, res) {
    (async () => {
        const client = await pool.connect()
        try {
            let query = `select * from pubg.match_record mr 
                Join pubg.match m on mr.match_id = m.match_id 
                where ${req.query.field} = (select max(${req.query.field}) from pubg.match_record mr Join pubg.match m on mr.match_id = m.match_id where m.game_mode = ${req.query.mode})`
            const response = await client.query(query, [])
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})

app.get('/players', (req, res) => {
    (async () => {
        const client = await pool.connect()
        try {
            let query = 'Select * from pubg.player'
            const response = await client.query(query, [])
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})

app.get('/players/:player_id/stats', (req, res) => {
    (async () => {
        const client = await pool.connect()
        try {
            let query = `
            Select 
                Avg(kills) as avg_kills, 
                Avg(dbnos) as avg_dbnos, 
                Avg(assists) as avg_assists,
                Avg(damage_dealt) as avg_damage_dealt,
                Avg(head_shot_kills) as avg_head_shot_kills,
                Avg(heals) as avg_heals,
                Avg(boosts) as avg_boosts,
                Max(longest_kill) as longest_kill,
                Max(kills) as most_kills_in_any_match,
                Max(kill_streaks) as highest_kill_streak,
                Max(revives) as most_revives_in_match,
                Max(heals) as most_heals_in_match,
                Max(boosts) as most_boosts,
                Max(ride_distance) as longest_ride,
                Sum(vehicle_destroys) as total_vehicles_destroyed
            FROM
                pubg.match_record
            Where
                player_id = $1
            `
            const response = await client.query(query, [req.params.player_id])
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})

app.get('/players/avgs', (req, res) => {
    (async () => {
        const client = await pool.connect()
        try {
            let query = 'Select * from player'
            const response = await client.query(query, [])
            res.json(response)
        } catch(error) {
            logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => logger.log(error))
})


app.listen('80', function () {
    logger.log('PSS API listening on port:', '80')
})