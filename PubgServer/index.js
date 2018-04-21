require('dotenv').config()
const express = require('express')
const app = express()
const {Pool} = require('pg')
const pool = new Pool()
const { Logger } = require('../Logger/Logger')

pool.on('error', (err) => {
    Logger.error('Unexpected error on idle client', err)
})

app.get('/matches', function (req, res) {
    (async () => {
        const client = await pool.connect()
        try {
            const response = await client.query('SELECT * FROM pubg.match')
            res.json(response)
        } catch(error) {
            Logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => Logger.log(error))
})

app.get('/match_records/:player_id', function (req, res) {
    (async () => {
        const client = await pool.connect()
        try {
            let query = 'SELECT * FROM pubg.match_record where player_id = $1'
            const response = await client.query(query, [req.params.player_id])
            res.json(response)
        } catch(error) {
            Logger.log('error', error)
        } finally {
            client.release()
        }
    })().catch(error => Logger.log(error))
})


app.listen('3000', function () {
    Logger.log('PSS API listening on port:', '3000')
})