Ext.define('PubgTeamPage.view.main.matches.MatchesModel', {
    alias: 'viewmodel.matches',
    extend: 'Ext.app.ViewModel',
    stores: {
        matches: {
            autoLoad: true,
            pageSize: 30,
            proxy: {
                idParam: 'match_id',
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/matches'
            },
            storeId: 'matches',
            type: 'store'
        }
    }
});
