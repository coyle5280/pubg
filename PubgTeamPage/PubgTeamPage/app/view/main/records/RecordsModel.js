Ext.define('PubgTeamPage.view.main.records.RecordsModel', {
    alias: 'viewmodel.records',
    extend: 'Ext.app.ViewModel',
    stores: {
        records: {
            autoLoad: true,
            proxy: {
                idParam: 'player_id',
                reader: {
                    type: 'json'
                },
                type: 'rest',
                url: Ext.manifest.envSettings.url + '/records'
            },
            
            storeId: 'records',
            type: 'store'
        }
    }
});
