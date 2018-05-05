Ext.define('PubgTeamPage.store.MatchPlayerRecord', {
    alias: 'store.matchplayerrecord',
    baseUrl: Ext.manifest.envSettings.url + '/matches/{match_id}/player/{player_id}',
    extend: 'Ext.data.Store',
    proxy: {
        idParam: 'match_id',
        reader: {
            rootProperty: 'rows',
            type: 'json'
        },
        type: 'rest',
        url: ''
    }
});