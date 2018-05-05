Ext.define('PubgTeamPage.view.main.matches.MatchWindowModel', {
    alias: 'viewmodel.matchwindow',
    data: {

    },
    extend: 'Ext.app.ViewModel',
    stores: {
        matchStats: {
            autoLoad: true,
            pageSize: 30,
            proxy: {
                idParam: 'match_id',
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/matches/{matchId}'
            },
            storeId: 'matchstats',
            type: 'store'
        },
        playerMatchStats: {
            pageSize: 30,
            proxy: {
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/matches/{matchId}/players/{playerId}'
            },
            storeId: 'playermatchstats',
            type: 'store'
        }
    }
});