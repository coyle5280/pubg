Ext.define('PubgTeamPage.view.main.maps.Maps', {
    controller: 'map',
    extend: 'Ext.tab.Panel',
    items: [{
        iconCls: 'x-fa fa-map',
        title: 'Erangel',
        xtype: 'erangelmap'
    }, {
        iconCls: 'x-fa fa-map',
        title: 'Miramar',
        xtype: 'miramarmap'
    }, {
        iconCls: 'x-fa fa-map',
        title: 'Savage',
        xtype: 'savagemap'
        
    }],
    requires: [
        'PubgTeamPage.view.main.maps.MapController',
        'PubgTeamPage.view.main.maps.MapModel',
        'PubgTeamPage.view.main.maps.miramar.MiramarMap',
        'PubgTeamPage.view.main.maps.savage.SavageMap',
        'PubgTeamPage.view.main.maps.erangel.ErangelMap'
    ],
    scrollable: true,
    viewModel: 'map',
    xtype: 'maps'
});