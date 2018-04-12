const Request = require('request-promise');

class PubgPlayer {
    /**
     * Creates an instance of PubgPlayer.
     * @param {any} options 
     * @memberof PubgPlayer
     */
    constructor (playerIds) {
        this._playerIds = playerIds
        this._matchList = []
        this._matchObjectsArray
        this._playerAttributes
    }
    /**
     * 
     * 
     * @memberof PubgPlayer
     */
    run () {
        return new Promise(async (resolve, reject) => {
            try {
                let options = {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        Authorization: process.env.PUBG_KEY
                    },
                    json: true,
                    method: 'GET',
                    uri: `https://api.playbattlegrounds.com/shards/pc-na/players?filter[playerIds]=${this._playerIds}`
    
                }
                let {data} = await Request(options)
                resolve(this.reduce(data))
            } catch (error) {
                reject(error)
            }
        })
    }

    reduce (data) {
        return Array.from(new Set([].concat.apply([], data.map(item => {
            return item.relationships.matches.data
        })).map(item => {
            return item.id
        })));
    }
}

exports.PubgPlayer = PubgPlayer