
const PubgMatch = require('./PubgMatch')
const Request = require('request-promise');

class PubgPlayer {
    constructor (options) {
        this._playerId = options._playerId
        this._matchList = []
        this._matchObjects
        this._playerAttributes
    }

    get playerId () {return this._playerId}

    set playerId (playerId) {this._playerId = playerId}

    run () {
        return new Promise(async (resolve, reject) => {
            let options = {
                json: true,
                method: 'GET',
                uri: `https://api.playbattlegrounds.com/shards/pc-na/players/${this._playerId}`
            }
            try {
                let {data} = await Request(options)
                this._matchList = data[0].relationships.matches.data
                this._playerAttributes = data[0].attributes
                await this.loadMatches()
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    loadMatches () {
        return new Promise(async (resolve, reject) => {
            try {
                this._matchObjects = this._matchList.map(match => {
                    return new PubgMatch.PubgMatch(match)
                })
                await Promise.all(this._matchObjects)
                resolve()
            } catch (error) {
                reject(error)
            }
        })  
    }
}

exports.PubgPlayer = PubgPlayer