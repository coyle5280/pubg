Ext.define('PubgTeamPage.view.main.players.Players', {
    controller: 'player',
    extend: 'Ext.panel.Panel',
    items: [{
        bind: {
            store: '{players}'
        },
        height: '35%',
        itemSelector: 'div',
        listeners: {
            itemclick: 'playerSelect'
        },
        tpl: new Ext.XTemplate(`
            <tpl for=".">
                <div class="players">'
                    <h3 class="player-name">{name}</h3>
                    <img class="player-img" src="./resources/pubg.jpg"/>
                </div>
            </tpl>
        `),
        width: '100%',
        xtype: 'dataview'
    },{
        xtype: 'playerstats'
    }],
    layout: 'vbox',
    requires: [
        'PubgTeamPage.view.main.players.Players',
        'PubgTeamPage.view.main.players.PlayersController',
        'PubgTeamPage.view.main.players.PlayersModel',
        'PubgTeamPage.view.main.players.Players',
        'PubgTeamPage.view.main.players.PlayerStats',
        'Ext.chart.axis.Category'
    ],
    viewModel: 'players',
    xtype: 'players'
});
