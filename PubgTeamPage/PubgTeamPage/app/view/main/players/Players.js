Ext.define('PubgTeamPage.view.main.players.Players', {
    bind: {
        store: '{players}'
    },
    controller: 'player',
    extend: 'Ext.view.View',
    itemSelector: 'div',
    listeners: {
        select: 'playerSelect'
    },
    requires: [
        'PubgTeamPage.view.main.players.Players',
        'PubgTeamPage.view.main.players.PlayersController',
        'PubgTeamPage.view.main.players.PlayersModel'
    ],
    tpl: new Ext.XTemplate(`
        <tpl for=".">
            <div class="players">'
                <h3 class="player-name">{name}</h3>
                <img class="player-img" src="./resources/pubg.jpg"/>
            </div>
        </tpl>
    `),
    viewModel: 'players',
    xtype: 'players'
});
