Ext.define('PubgTeamPage.view.main.players.PlayersModel', {
    alias: 'viewmodel.players',
    data:{
        playersId: null
    },
    extend: 'Ext.app.ViewModel',
    stores: {
        playerChartDbnos: {
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: `${Ext.manifest.envSettings.url}/players/{playerId}/charts?type=dbnos`
            },
            storeId: 'playerChart',
            type: 'store'
        },
        playerChartKills: {
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: `${Ext.manifest.envSettings.url}/players/{playerId}/charts?type=kills`
            },
            storeId: 'playerChart',
            type: 'store'
        },
        playerChartAssits: {
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: `${Ext.manifest.envSettings.url}/players/{playerId}/charts?type=assists`
            },
            storeId: 'playerChart',
            type: 'store'
        },
        playerChartRevives: {
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: `${Ext.manifest.envSettings.url}/players/{playerId}/charts?type=revives`
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
        }
    }
});
