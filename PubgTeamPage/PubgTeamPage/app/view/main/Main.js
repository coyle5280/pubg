Ext.define('PubgTeamPage.view.main.Main', {
    controller: 'main',
    extend: 'Ext.tab.Panel',
    items: [{
        iconCls: 'x-fa fa-user',
        title: 'Players',
        xtype: 'players'
    }, {
        iconCls: 'x-fa fa-keyboard',
        title: 'Matches',
        xtype: 'matches'
    }, {
        iconCls: 'x-fa fa-trophy',
        title: 'Records',
        xtype: 'records'
    }, {
        iconCls: 'x-fa fa-map',
        reference: 'maps',
        title: 'Maps',
        xtype: 'maps'
    }],
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.view.View',
        'PubgTeamPage.view.main.players.Players',
        'PubgTeamPage.view.main.MainController',
        'PubgTeamPage.view.main.MainModel',

        'PubgTeamPage.view.main.matches.Matches'
    ],
    viewModel: 'main',
    xtype: 'app-main'
});
