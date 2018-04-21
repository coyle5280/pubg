require('dotenv').config()

const { PubgMatch } = require('./src/PubgMatch')
const { PubgMatches } = require('./src/PubgMatches')
const { Logger } = require('../Logger/Logger')
/**
 * 
 * 
 */
async function Handler () {
    const logger = new Logger()
    try {
        const playerIds = [
            'account.b528e5b410294a45821dd8678d2acb9c', 
            'account.4c6f9196c2324007b3b25c330b75fc76', 
            'account.dabd3eddfda0462d9f881260b26d8eae',
            'account.d3a793b22577494b8ceb696c7e750ec0',
            'account.64e46c0605b940388f564660b65bf628'
        ]
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