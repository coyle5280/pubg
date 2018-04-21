const { Client } = require('pg')
const Request = require('request-promise')

class PubgMatch {
    /**
     * Creates an instance of PubgMatch.
     * @param {any} options 
     * @memberof PubgMatch
     */
    constructor (options) {
        this._matchId = options.matchId
        this._playerIDs = options.playerIds
        this._matchQueryData
        this._isNew = false
        this._timeout = 1
    }
    /**
     * 
     * 
     * @returns 
     * @memberof PubgMatch
     */
    run () {
        return new Promise(async (resolve, reject)=>{
            try {
                this._client = new Client()
                await this._client.connect()
                await this.isNew()
                if (this._isNew) {
                    this._timeout = 10000
                    await this.loadMatchData()
                    await this.saveMatchData(this._matchQueryData)
                } 
            } catch (error) {
                reject(error)
            } finally {
                await this._client.end()
                setTimeout(() => {
                    resolve()
                }, this._timeout)
            }
        })
    }
    /**
     * Run function that starts the match loading process
     * @returns {promise}
     * @memberof PubgMatch
     */
    isNew () {
        return new Promise(async (resolve, reject) => {
            try {
                const query = `SELECT match_id from PUBG.match where match_id = '${this._matchId}'`
                const res = await this._client.query(query)
                let [match] = res.rows
                this._isNew = (!match) ? true : false
            } catch (error) {
                reject(error)
            } finally {
                resolve() 
            }
        })
    }
    /**
     * Retrieves match data from pubg api
     * @returns {promise}
     * @memberof PubgMatch
     */
    loadMatchData () {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    headers: {
                        Accept: 'application/vnd.api+json',
                        Authorization: process.env.PUBG_KEY
                    },
                    json: true,
                    method: 'GET',
                    uri: `https://api.playbattlegrounds.com/shards/pc-na/matches/${this._matchId}`
                }
                const response = await Request(options)
                if (response) {
                    this.processMatchData(response)
                    resolve()
                } else {
                    reject(`Error: Error loading match data ${this._matchId}`)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Searchs match data for player and asset records
     * Used items in data object - type, id and links
     * @param {object} response - Response from pubg api
     * @memberof PubgMatch
     */
    processMatchData (response) {
        const {data, included} = response
        const {attributes, relationships} = data
        const {assets} = relationships
        this._matchQueryData = [];
        included.forEach(item => {
            if (
                item.type === 'participant' && 
                this._playerIDs.indexOf(item.attributes.stats.playerId) !== -1
            ) {
                this._matchQueryData.push(this.buildPlayerQuery(item))
            } else if (
                item.type === 'asset' &&
                item.id === assets.data[0].id
            ) {
                this._matchQueryData.push(this.buildMatchQuery({ item, match: attributes}))
            }
        });
    }
    /**
     * 
     * 
     * @param {any} data 
     * @returns 
     * @memberof PubgMatch
     */
    buildPlayerQuery (data) {
        let stats = data.attributes.stats
        let keys = [
            'DBNOs','assists','boosts','damageDealt','deathType','headshotKills','heals','killPlace','killPoints',
            'killPointsDelta','killStreaks','kills','lastKillPoints','lastWinPoints','longestKill','mostDamage',
            'name','playerId','revives','rideDistance','roadKills','teamKills','timeSurvived','vehicleDestroys',
            'walkDistance','weaponsAcquired','winPlace','winPoints','winPointsDelta'
        ]
        let values = keys.map(key => {
            return stats[key]
        })
        values.push(this._matchId)
        return {
            query: `INSERT INTO pubg.match_record (
                dbnos, assists, boosts, damage_dealt, death_type, head_shot_kills,
                heals, kill_place, kill_points, kill_points_delta, kill_streaks, 
                kills,last_kill_points, last_win_points,longest_kill,most_damage,
                name,player_id,revives,ride_distance,road_kills,team_kills,time_survived,vehicle_destroys,
                walk_distance,weapons_acquired,win_place,win_points,win_points_delta, match_id
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
                $16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30
            )`,
            values
        }
    }
    /**
     * 
     * 
     * @param {any} data 
     * @returns {object} PG query for match data
     * @memberof PubgMatch
     */
    buildMatchQuery (data) {
        let {match, item} = data
        let keys = [
            'createdAt','duration','gameMode','patchVersion','shardId','stats','tags','titleId'
        ]
        let values = keys.map(key => {
            return match[key]
        })
        values.push(this._matchId, item.attributes.URL)
        return {
            query: `INSERT INTO pubg.match (
                created_at,duration,game_mode,patch_version,shard_id,stats,tags,title_id,match_id,telemetry_url
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
            )`,
            values
        }
    }
    /**
     * 
     * 
     * @returns 
     * @memberof PubgMatch
     */
    saveMatchData () {
        return new Promise(async (resolve, reject) => {
            try {
                await this._client.query('BEGIN')
                this._matchQueryData.forEach(async queryObject => {
                    await this._client.query(queryObject.query, queryObject.values)
                })
                await this._client.query('COMMIT')
            } catch (e) {
                await this._client.query('ROLLBACK')
                reject(e)
            } finally {
                resolve ()
            }
        })
    }
}

exports.PubgMatch = PubgMatch