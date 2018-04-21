const { Client } = require('pg')

class PubgPlayers {
    constructor () {
        return new Promise(async (resolve, reject) => {
            try {
                this._client = new Client()
                await this._client.connect()
                const query = 'SELECT * from pubg.player'
                const res = await this._client.query(query)
                this._players = this.extractIds(res.rows)
            } catch (error) {
                reject(error)
            } finally {
                await this._client.end()
                resolve(this._players)
            }
        })
    }

    extractIds (players) {
        return players.map(item => {
            return item.player_id
        })
    }
}


exports.PubgPlayers = PubgPlayers