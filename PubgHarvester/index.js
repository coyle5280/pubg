require('dotenv').config()

const { PubgMatch } = require('./src/PubgMatch')
const { PubgMatches } = require('./src/PubgMatches')
const { PubgPlayers } = require('./src/PubgPlayers')
const { Logger } = require('../Logger/Logger')
/**
 * 
 * 
 */
async function Handler () {
    const logger = new Logger()
    try {
        const playerIds = await new PubgPlayers()
        const pubgMatches = new PubgMatches(playerIds)
        const matches = await pubgMatches.run()
        
        const matchPromises = matches.map(matchId => {
            return new PubgMatch({matchId, playerIds})
        })

        for (let i = 0; i < matchPromises.length; i++) {
            await matchPromises[i].run()
        }
        logger.log('Program Finished')
    } catch(e) {
        logger.error('Pubg Harvest Error: ', e)
    }
}

Handler()