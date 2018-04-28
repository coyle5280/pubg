const { Client } = require('pg')
const Request = require('request-promise')
const uuid = require('uuid/v4');

class PubgTelemetry {
    constructor (options) {
        this._Url = options.Url
        this._PlayerIDs = options.PlayerIDs
        this._MatchId = options.MatchId
        this._PlayerAttack = []
        this._PlayerTakeDamage = []
        this._PlayerPosition = []
        this._GameState = []
        this._PlayerPosition = []
        this._Queries = []
        this._client 
    }


    run () {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    json: true,
                    method: 'GET',
                    uri: this._Url
                }
                let response = await Request(options)
                if (response) {
                    this.processTelemetryData(response)
                    this.buildAttackDamageStatements(response)
                    this.buildOtherInsertStatements()
                    await this.processQueries()
                    resolve()
                } else {
                    reject(`Error: Error loading telemetry data ${this._matchId}`)
                }
            } catch (error) {
                reject(error)
            }
        })
        
    }

    buildAttackDamageInsert (attack, damage) {
        let query = `
            INSERT INTO pubg.match_attack_damage (
                attacker_name,
                attacker_account_id,
                attacker_team_id,
                attacker_health,
                attacker_x,
                attacker_y,
                attacker_z,
                attack_type,
                attack_weapon,
                attack_vehicle,
                attack_time,
                attack_version,
                victim_name,
                victim_id,
                victim_team_id,
                victim_health,
                vimtim_x,
                victim_y,
                victim_z,
                damage_type_category,
                damage_reason,
                damage,
                damage_causer_name,
                damage_time,
                damage_version,
                attack_id,
                attack_uuid
            ) VALUES (
                '${attack.attacker.name}',
                '${attack.attacker.accountId}',
                ${attack.attacker.teamId},
                ${attack.attacker.health},
                ${attack.attacker.location.x},
                ${attack.attacker.location.y},
                ${attack.attacker.location.z},
                '${attack.attackType}',
                '${JSON.stringify(attack.weapon)}',
                '${JSON.stringify(attack.vehicle)}',
                '${attack._D}',
                ${attack._V},
                '${damage.victim.name}',
                '${damage.victim.accountId}',
                ${damage.victim.teamId},
                ${damage.victim.health},
                ${damage.victim.location.x},
                ${damage.victim.location.y},
                ${damage.victim.location.z},
                '${damage.damageTypeCategory}',
                '${damage.damageReason}',
                ${damage.damage},
                '${damage.damageCauserName}',
                '${damage._D}',
                ${damage._V},
                ${attack.attackId},
                '${uuid()}'
            )
        `
        this._Queries.push(query)
    }

    buildAttackDamageStatements (response) {
        while (this._PlayerAttack.length > 0) {
            let found = false
            for(let i = 0; i < this._PlayerTakeDamage.length; i++) {
                if (this._PlayerAttack[0].attackId === this._PlayerTakeDamage[i].attackId) {
                    this.buildAttackDamageInsert(this._PlayerAttack[0], this._PlayerTakeDamage[i])
                    this._PlayerAttack.splice(0, 1)
                    found = true
                    break
                }
            }
            if (!found) {
                for (let c = 0; c < response.length; c++) {
                    if (
                        response[c]._T === 'LogPlayerTakeDamage' && 
                        response[c].attackId === this._PlayerAttack[0].attackId
                    ) {
                        this.buildAttackDamageInsert(this._PlayerAttack[0], response[c])
                        this._PlayerAttack.splice(0, 1)
                        found = true
                        break
                    }
                }
                if (!found) {
                    this.buildAttackDamageInsert(this._PlayerAttack[0], {
                        _D: this._PlayerAttack[0]._D,
                        _V: -1,
                        damage: 0,
                        damageCauserName: 'na',
                        damageReason: 'na',
                        damageTypeCategory: 'na',
                        victim: {
                            accountId: 'na',
                            health: -1,
                            location: {
                                x: -1,
                                y: -1,
                                z: -1
                            },
                            name: 'na',
                            teamId: -1
                        }
                    })
                    this._PlayerAttack.splice(0, 1)
                }
            }
        }

        while (this._PlayerTakeDamage.length > 0) {
            let found = false
            if (this._PlayerTakeDamage[0].attackId === -1) {
                this.buildAttackDamageInsert({
                    _D: this._PlayerTakeDamage[0]._D,
                    _V: -1,
                    attackId: -1,
                    attackType: 'na',
                    attacker: {
                        accountId: this._PlayerTakeDamage[0].attackId,
                        health: -1,
                        location: {
                            x: -1,
                            y: -1,
                            z: -1
                        },
                        name: 'na',
                        teamId: -1
                    },
                    vehicle: {},
                    weapon: {}
                }, this._PlayerTakeDamage[0])
                this._PlayerTakeDamage.splice(0, 1)
                continue
            }
            for(let i = 0; i < this._PlayerAttack.length; i++) {
                if (this._PlayerTakeDamage[0].attackId === this._PlayerAttack[i].attackId) {
                    this.buildAttackDamageInsert(this._PlayerAttack[i], this._PlayerTakeDamage[0])
                    this._PlayerTakeDamage.splice(0, 1)
                    found = true
                    break
                }
            }
            if (!found) {
                for (let c = 0; c < response.length; c++) {
                    if (
                        response[c]._T === 'LogPlayerAttack' && 
                        response[c].attackId === this._PlayerTakeDamage[0].attackId
                    ) {
                        this.buildAttackDamageInsert(response[c], this._PlayerTakeDamage[0])
                        this._PlayerTakeDamage.splice(0, 1)
                        found = true
                        break
                    }
                }
                if (!found) {
                    this.buildAttackDamageInsert({
                        _D: this._PlayerTakeDamage[0]._D,
                        _V: -1,
                        attackId: -1,
                        attackType: 'na',
                        attacker: {
                            accountId: this._PlayerTakeDamage[0].attackId,
                            health: -1,
                            location: {
                                x: -1,
                                y: -1,
                                z: -1
                            },
                            name: 'na',
                            teamId: -1
                        },
                        vehicle: {},
                        weapon: {}
                    }, this._PlayerTakeDamage[0])
                    this._PlayerTakeDamage.splice(0, 1)
                } 
            }
        }
    }

    processTelemetryData (response) {
        for(let i = 0; i < response.length; i++) {
            if (this[response[i]['_T']]) {
                this[response[i]['_T']](response[i])
            }
        }
    }

    buildOtherInsertStatements () {
        if (this._PlayerPosition.length > 0) {
            this._PlayerPosition.forEach(this.playerPositionInsert.bind(this))
        }
    }

    LogPlayerTakeDamage (record) {
        if (this._PlayerIDs.indexOf(record.victim.accountId) !== -1) {
            this._PlayerTakeDamage.push(record)
        }
    }

    LogPlayerAttack (record) {
        if (this._PlayerIDs.indexOf(record.attacker.accountId) !== -1) {
            this._PlayerAttack.push(record)
        }
    }

    LogPlayerPosition (record) {
        if (this._PlayerIDs.indexOf(record.character.accountId) !== -1) {
            this._PlayerPosition.push(record)
        }
    }

    playerPositionInsert (record) {
        const {character,elapsedTime,numAlivePlayers,_V,_D} = record
        this._Queries.push(`INSERT INTO pubg.match_player_position (
            match_id,
            player_id,
            player_x,
            player_y,
            player_z,
            player_rank,
            elapsed_time,
            number_players_alive,
            position_version,
            position_time_stamp,
            match_position_uuid
        ) VALUES (
            '${this._MatchId}',
            '${character.accountId}',
            ${character.location.x},
            ${character.location.y},
            ${character.location.z},
            ${character.ranking},
            ${elapsedTime},
            ${numAlivePlayers},
            ${_V},
            '${_D}',
            '${uuid()}'
        )`)
    }

    processQueries () {
        return new Promise(async (resolve, reject) => {
            let error
            try {
                this._client = new Client()
                await this._client.connect()
                await this._client.query('BEGIN')
                this._Queries.forEach(async query => {
                    await this._client.query(query, [])
                })
                await this._client.query('COMMIT')
            } catch (e) {
                await this._client.query('ROLLBACK')
                error = e
            } finally {
                await this._client.end()
                if (error) { resolve() } else { reject(error) }
            }
        })
    }
}

exports.PubgTelemetry = PubgTelemetry