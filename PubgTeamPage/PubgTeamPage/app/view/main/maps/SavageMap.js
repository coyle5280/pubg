Ext.define('PubgTeamPage.view.main.maps.SavageMap', {
    extend: 'Ext.panel.Panel',
    items: [{
        cls: 'mapbk',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        mapName: 'savage',
        reference: 'savageMainMap',
        xtype: 'basemapclass'
    },{
        cls: 'mapToolsToolbar',
        floating: true,
        items: [],
        layout: 'vbox',
        reference: 'savageToolBar',
        shadow: false,
        xtype: 'toolbar'
    }],
    layout: 'fit',
    listeners: {
        afterlayout: {
            fn: 'onRendersavage'
        }
    },
    mapName: 'savage',
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    xtype: 'savagemap'
})