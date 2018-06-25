Ext.define('PubgTeamPage.store.MapLayers', {
    extend: 'Ext.data.Store',

    alias: 'store.maplayers',
    fields: [
        {name: 'layerName', type: 'string'},
        {name: 'layer',  type: 'string'},
        {name: 'type',  type: 'string'}
    ],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});