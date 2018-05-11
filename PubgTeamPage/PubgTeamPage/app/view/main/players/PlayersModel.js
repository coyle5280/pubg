Ext.define('PubgTeamPage.view.main.players.PlayersModel', {
    alias: 'viewmodel.players',
    data:{
        playersId: null
    },
    extend: 'Ext.app.ViewModel',
    stores: {
        playerChart: {
            fields: [
                
            ],
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: ''
            },
            storeId: 'playerChart',
            type: 'store'
        },
        playerStats: {
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/players/{playerId}'
            },
            storeId: 'players',
            type: 'store'
        },
        players: {
            autoLoad: true,
            proxy: {
                idParam: 'player_id',
                reader: {
                    rootProperty: 'rows',
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/players'
            },
            storeId: 'players',
            type: 'store'
        }
    }
});
