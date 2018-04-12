require('dotenv').config()

const { PubgMatch } = require('./src/PubgMatch')
const { PubgPlayer } = require('./src/PubgPlayer')
const { Logger } = require('./src/Logger')

/**
 * 
 * 
 */
async function Handler () {
    const logger = new Logger()
    try {
        const playerIds = ['account.b528e5b410294a45821dd8678d2acb9c', 'account.4c6f9196c2324007b3b25c330b75fc76']

        // const playersPromiseArray = playerIds.map(async player_id => {
        //     const player = new PubgPlayer(player_id)
        //     return await player.run()
        // })
        const players = new PubgPlayer(playerIds)
        const matches = await players.run()
        
        const matches = flattenArrayMatches(await Promise.all(playersPromiseArray))
        // console.log('matches', matches)
        // const matchesPromiseArray = matches.map(matchId => {
        //     return new PubgMatch({matchId, playerIds})
        // })
        let match = new PubgMatch({matchId: matches[0], playerIds})
        // let matchesPromiseArray = [].push(new PubgMatch({matchId: matches[0], playerIds}))
        // console.log('matchesPromiseArray', matchesPromiseArray)
        // await Promise.all(matchesPromiseArray)
        await match.run()
        console.log('Program Finished')
    } catch(e) {
        logger.error('Pubg Harvest Error: ', e)
    }
}



Handler()