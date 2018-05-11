Ext.define('PubgTeamPage.view.main.maps.Maps', {
    controller: 'map',
    extend: 'Ext.tab.Panel',
    items: [{
        iconCls: 'x-fa fa-user',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        title: 'Miramar',
        xtype: 'miramarmap'
    }, {
        iconCls: 'x-fa fa-map',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        title: 'Erangel',
        xtype: 'erangelmap'
        
    }],
    requires: [
        'PubgTeamPage.view.main.maps.MapController',
        'PubgTeamPage.view.main.maps.MapModel',
        'PubgTeamPage.view.main.maps.MiramarMap'
    ],
    scrollable: true,
    viewModel: 'leaderboard',
    xtype: 'maps'
});