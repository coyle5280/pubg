Ext.define('PubgTeamPage.view.main.maps.savage.SavageMap', {
    controller: 'savagemap',
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
    requires: [
        'PubgTeamPage.view.main.maps.playerOptions',
        'PubgTeamPage.view.main.maps.MapsToolBar',
        'PubgTeamPage.components.MapBase'
    ],
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    viewModel: {
        type: 'savagemap'
    },
    xtype: 'savagemap'
})