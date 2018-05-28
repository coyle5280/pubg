require('dotenv').config()
require('require-sql');
const express = require('express')
const app = express()
const {Pool} = require('pg')
const pool = new Pool()
const { Logger } = require('../Logger/Logger')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const helperFunctions = require('./src/helperFunctions')

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
        app.use('/resources', express.static(path.join(__dirname, '../PubgTeamPage/PubgTeamPage/resources/')));
        break;

    default:
        app.use('/pubg', express.static(path.join(__dirname, '../PubgBuild/PubgTeamPage')));
        break;
}

app.get('/matches', async function (req, res) {
    const query = require('./sql/matches/matches.sql')
    try {
        let response = await helperFunctions.queryExecute({
            params: [],
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/matches/modes', async (req, res) => {
    const query = require('./sql/matches/match_modes.sql')
    try {
        let response = await helperFunctions.queryExecute({
            params: [],
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/matches/:match_id', async (req, res) => {
    const query = require('./sql/matches/match_details_single.sql')
    try {
        let response = await helperFunctions.queryExecute({
            params: [req.params.match_id],
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/matches/:match_id/players', async (req, res) => {
    const query = require('./sql/matches/match_players.sql')
    try {
        let response = await helperFunctions.queryExecute({
            params: [req.params.match_id],
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/matches/:match_id/players/:player_id', async (req, res) => {
    const attackQuery = require('./sql/matches/match_player_details_attack.sql')
    const defenseQuery = require('./sql/matches/match_player_details_defense.sql')
    const params = [req.params.match_id, req.params.player_id]
    try {
        let response = {
            attackInfo: await helperFunctions.queryExecute({
                params,
                pool, 
                query: attackQuery
            }),
            defenseInfo: await helperFunctions.queryExecute({
                params,
                pool, 
                query: defenseQuery
            })
        }
        res.json([response])
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/records', async (req, res) => {
    var longest_kill = require('./sql/records/longest_kill.sql')
    var most_kills = require('./sql/records/most_kills.sql')
    var most_revives = require('./sql/records/most_revives.sql')
    var most_assists = require('./sql/records/most_assists.sql')
    let queries = {}
    let params = {}
    
    queries = {
        longest_kill_duo: longest_kill,
        longest_kill_squad: longest_kill,
        longest_kill_solo: longest_kill,
        most_kills_duo: most_kills,
        most_kills_squad: most_kills,
        most_kills_solo: most_kills,
        most_revives_duo: most_revives,
        most_revives_squad: most_revives,
        most_revives_solo: most_revives,
        most_assists_duo: most_assists,
        most_assists_squad: most_assists,
        most_assists_solo: most_assists
    }

    params = {
        longest_kill_duo: ['duo-fpp'],
        longest_kill_squad: ['squad-fpp'],
        longest_kill_solo: ['solo-fpp'],
        most_kills_duo: ['duo-fpp'],
        most_kills_squad: ['squad-fpp'],
        most_kills_solo: ['solo-fpp'],
        most_revives_duo: ['duo-fpp'],
        most_revives_squad: ['squad-fpp'],
        most_revives_solo: ['solo-fpp'],
        most_assists_duo: ['duo-fpp'],
        most_assists_squad: ['squad-fpp'],
        most_assists_solo: ['solo-fpp']
    }
    
    try {
        let response = await helperFunctions.multiQueryExecute({
            params,
            pool, 
            queries
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
    // try {
    //     result = {
    //         longest_kill_duo: await helperFunctions.queryExecute({
    //             params: ['duo-fpp'],
    //             pool, 
    //             query: longest_kill
    //         }),
    //         longest_kill_squad: await helperFunctions.queryExecute({
    //             params: ['squad-fpp'],
    //             pool, 
    //             query: longest_kill
    //         }),
    //         longest_kill_solo: await helperFunctions.queryExecute({
    //             params: ['solo-fpp'],
    //             pool, 
    //             query: longest_kill
    //         }),
    //         most_kills_duo: await helperFunctions.queryExecute({
    //             params: ['duo-fpp'],
    //             pool, 
    //             query: most_kills
    //         }),
    //         most_kills_squad: await helperFunctions.queryExecute({
    //             params: ['squad-fpp'],
    //             pool, 
    //             query: most_kills
    //         }),
    //         most_kills_solo: await helperFunctions.queryExecute({
    //             params: ['solo-fpp'],
    //             pool, 
    //             query: most_kills
    //         }),
    //         most_revives_duo: await helperFunctions.queryExecute({
    //             params: ['duo-fpp'],
    //             pool, 
    //             query: most_revives
    //         }),
    //         most_revives_squad: await helperFunctions.queryExecute({
    //             params: ['squad-fpp'],
    //             pool, 
    //             query: most_revives
    //         }),
    //         most_revives_solo: await helperFunctions.queryExecute({
    //             params: ['solo-fpp'],
    //             pool, 
    //             query: most_revives
    //         }),
    //         most_assists_duo: await helperFunctions.queryExecute({
    //             params: ['duo-fpp'],
    //             pool, 
    //             query: most_assists
    //         }),
    //         most_assists_squad: await helperFunctions.queryExecute({
    //             params: ['squad-fpp'],
    //             pool, 
    //             query: most_assists
    //         }),
    //         most_assists_solo: await helperFunctions.queryExecute({
    //             params: ['solo-fpp'],
    //             pool, 
    //             query: most_assists
    //         })
    //     }
    //     res.json(result)
    // } catch (err) {
    //     res.status(500).send({ err })
    // }
})

app.get('/players', async (req, res) => {
    const query = require('./sql/players/players.sql')
    const params = []
    try {
        let response = await helperFunctions.queryExecute({
            params,
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/players/charts', async (req, res) => {
    const query = require(helperFunctions.getChartQuery(req.query.type))
    const params = []
    try {
        let response = await helperFunctions.queryExecute({
            params,
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/players/:player_id', async (req, res) => {
    const playerStats1 = require('./sql/players/player_stats_1.sql')
    const playerStats2 = require('./sql/players/player_stats_2.sql')
    const playerStats3 = require('./sql/players/player_stats_3.sql')
    const playerStats4 = require('./sql/players/player_stats_4.sql')
    const params = [req.params.player_id]
    try {
        let playerStats1Result = await helperFunctions.queryExecute({
            params,
            pool, 
            query: playerStats1
        })
        let response = Object.assign({}, playerStats1Result[0])
        let playerStats2Result = await helperFunctions.queryExecute({
            params,
            pool, 
            query: playerStats2
        })
        response = Object.assign(response, playerStats2Result[0])
        let playerStats3Result = await helperFunctions.queryExecute({
            params,
            pool, 
            query: playerStats3
        })
        response = Object.assign(response, playerStats3Result[0])
        let playerStats4Result = await helperFunctions.queryExecute({
            params,
            pool, 
            query: playerStats4
        })
        response = Object.assign(response, playerStats4Result[0])
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/players/:player_id/charts', async (req, res) => {
    const query = require(helperFunctions.getPlayerChartQuery(req.query.type))
    const params = [req.params.player_id]
    try {
        let response = await helperFunctions.queryExecute({
            params,
            pool, 
            query
        })
        res.json(response)
    } catch (err) {
        res.status(500).send({ err })
    }
})

app.get('/tiles/256/:map/:z/:x/:y', (req, res) => {
    try {
        res.download(path.join(__dirname, `../PubgTiles/${req.params.map}/${req.params.z}-${req.params.x}-${req.params.y}.png`))
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/map/:mapname/:player_id', async (req, res) => {
    try {
        const query = require(helperFunctions.getMapLayerQuery(req.query.type))
        const params = [req.params.player_id,req.query.mode,req.params.mapname]
        let response = await helperFunctions.queryExecute({
            params,
            pool, 
            query
        })
        let data = (req.query.layertype === 'point') ?  helperFunctions.geojson(response) : helperFunctions.heat(response)
        res.json(data)
    } catch (err) {
        res.status(500).send({ err })
    }
})



app.listen('80', function () {
    logger.log('PubgAnalytics API listening on port:', '80')
})