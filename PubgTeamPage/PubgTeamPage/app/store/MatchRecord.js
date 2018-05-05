Ext.define('PubgTeamPage.store.MatchRecord', {
    alias: 'store.matchrecord',
    extend: 'Ext.data.Store',
    proxy: {
        idParam: 'match_id',
        reader: {
            rootProperty: 'rows',
            type: 'json'
        },
        type: 'rest',
        url: ''
    },
    sorters: [{
        direction: 'desc',
        property: 'kills'
    },{
        direction: 'desc',
        property: 'damage_dealt'
    }]
});