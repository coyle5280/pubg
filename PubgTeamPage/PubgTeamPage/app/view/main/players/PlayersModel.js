Ext.define('PubgTeamPage.view.main.players.PlayersModel', {
    alias: 'viewmodel.players',
    extend: 'Ext.app.ViewModel',
    stores: {
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
