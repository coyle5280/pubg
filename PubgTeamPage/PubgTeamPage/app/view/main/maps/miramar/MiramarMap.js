Ext.define('PubgTeamPage.view.main.maps.miramar.MiramarMap', {
    controller: 'miramarmap',
    extend: 'Ext.panel.Panel',
    items: [{
        cls: 'mapbk',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        mapName: 'miramar',
        reference: 'miramarMainMap',
        xtype: 'basemapclass'
    },{
        reference: 'miramarToolBar',
        xtype: 'mapstoolbar'
    },{
        reference: 'playerOptions',
        xtype: 'playeroptions'
    }],
    layout: 'fit',
    listeners: {
        afterlayout: {
            fn: 'onRendermiramar'
        }
    },
    mapName: 'miramar',
    requires: [
        'PubgTeamPage.view.main.maps.miramar.MiramarMapController',
        'PubgTeamPage.view.main.maps.playerOptions',
        'PubgTeamPage.view.main.maps.MapsToolBar',
        'PubgTeamPage.components.MapBase'
    ],
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    viewModel: {
        type: 'miramarmap'
    },
    xtype: 'miramarmap'
})