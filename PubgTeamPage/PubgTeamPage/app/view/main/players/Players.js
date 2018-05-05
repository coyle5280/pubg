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
            select: 'playerSelect'
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
        bind: {
            store: '{playerStats}'
        },
        height: '65%',
        itemSelector: 'div',
        tpl: new Ext.XTemplate(`
        <tpl for=".">
            <div class="players">'
                <p>total_kills {total_kills}<p> 
                <p>total_dbnpos {total_dbnpos}<p> 
                <p>total_assists {total_assists}<p> 
                <p>total_revives {total_revives}<p> 
                <p>totalridedistance {totalridedistance}<p> 
                <p>total_walk_distance {total_walk_distance}<p> 
                <p>total_road_kills {total_road_kills}<p> 
                <p>max_damage_dealt_in_game {max_damage_dealt_in_game}<p> 
                <p>longest_kill {longest_kill}<p> 
                <p>most_kills_in_game {most_kills_in_game}<p> 
                <p>total_matches {total_matches}<p> 
                <p>win_count {win_count}<p> 
            </div>
        </tpl>
        `),
        width: '100%',
        xtype: 'dataview'
    }],
    layout: 'vbox',
    requires: [
        'PubgTeamPage.view.main.players.Players',
        'PubgTeamPage.view.main.players.PlayersController',
        'PubgTeamPage.view.main.players.PlayersModel'
    ],
    viewModel: 'players',
    xtype: 'players'
});
