Ext.define('PubgTeamPage.view.main.maps.erangel.ErangelMap', {
    cls: 'mapbk',
    controller: 'erangelmap',
    extend: 'Ext.panel.Panel',
    items: [{
        cls: 'mapbk',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        mapName: 'erangel',
        reference: 'erangelMainMap',
        xtype: 'basemapclass'
    },{
        xtype: 'mapstoolbar'
    },{
        reference: 'playerOptions',
        xtype: 'playeroptions'
    }],
    layout: 'fit',
    listeners: {
        afterlayout: {
            fn: 'onRenderreangel'
        }
    },
    mapName: 'erangel',
    requires: [
        'PubgTeamPage.view.main.maps.erangel.ErangelMapController',
        'PubgTeamPage.view.main.maps.erangel.ErangelModel',
        'PubgTeamPage.view.main.maps.playerOptions',
        'PubgTeamPage.view.main.maps.MapsToolBar',
        'PubgTeamPage.components.MapBase'
    ],
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    viewModel: {
        type: 'erangelmap'
    },
    xtype: 'erangelmap'
})