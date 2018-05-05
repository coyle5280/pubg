Ext.define('PubgTeamPage.view.main.matches.MatchWindow', {
    controller:  'matchwindow',
    extend: 'Ext.window.Window',
    height: 500,
    items: [{
        border: false,
        columns: [{
            dataIndex: 'name',
            flex: 1,
            header: 'Player'
        }, {
            dataIndex: 'kills',
            header: 'Kills',
            width: 80
        },{
            dataIndex: 'damage_dealt',
            header: 'Damage Dealt'
        },{
            dataIndex: 'dbnos',
            header: 'Bbnos'
        },{
            dataIndex: 'assists',
            header: 'Assists'
        },{
            dataIndex: 'boosts',
            header: 'Boosts'
        },{
            dataIndex: 'revives',
            header: 'Revives'
        }],
        height: '37%',
        listeners: {
            select: 'gridSelect'
        },
        maxHeight: 160,
        reference: 'matchGrid',
        store: {
            type: 'matchrecord'
        },
        width: '100%',
        xtype: 'grid'
    },{
        height: '65%',
        items: [{
            bind: {
                store: '{matchStats}'
            },
            itemSelector: 'div',
            tpl: new Ext.XTemplate(`
                <tpl for=".">
                    <div clas="match-stats-panel">
                        <p><i class="fa fa-user" aria-hidden="true"></i>&nbsp;{totalplayers}&nbsp;&nbsp;&nbsp;<i class="fa fa-users" aria-hidden="true"></i>&nbsp;{totalteams} </p>
                    </div>
                </tpl>
            `),
            width: '20%',
            xtype: 'dataview'
        },{
            bind: {
                store: '{playerMatchStats}'
            },
            height: '100%',
            itemSelector: 'div',
            reference: 'playerStatsAttack',
            tpl:  new Ext.XTemplate(`
                <tpl for=".">
                    <tpl for="attackInfo">
                            <div class="match-player-attck-defense">
                                <p>Rounds On Target: {rounds_on_target}<p>
                                <p>Favorite Body Target: {favorite_hit_spot}</i></p>
                                <p>Favorite Target: {favorite_victim}</p>
                                <p>All victims: <tpl for="victims" between=", ">{.}</tpl></p>
                                <p>Most hits on victims with: {weapon}</p>
                                <p>Weapons Used : <tpl for="weapons_used" between=", ">{.}</tpl></p>
                            </div>
                    </tpl>
                </tpl>
            `),
            width: '40%',
            xtype: 'dataview'
        },{
            bind: {
                store: '{playerMatchStats}'
            },
            height: '100%',
            itemSelector: 'div',
            reference: 'playerStatsDefense',
            tpl:  new Ext.XTemplate(`
                <tpl for=".">
                    <tpl for="defenseInfo">
                        <div class="match-player-attck-defense">
                            <p>Total Hits Taken: {round_hits}
                            <p>Most Hits at: {attack_spots_mo}</i></p>
                            <p>All Body Parts Hit: <tpl for="attack_spots" between=", ">{.}</tpl>
                            <p>Most Hits From Weapon: {attacker_weapon_mo}</p>
                            <p>All Weapons Causing Damage: <tpl for="attacker_weapons" between=", ">{.}</tpl></p>
                            <p>All Attackers: <tpl for="attackers" between=", ">{.}</tpl></p>
                            <p>Attacker Weapons : <tpl for="attacker_weapons" between=", ">{.}</tpl></p>
                        </div>
                    </tpl>
                </tpl>
            `),
            width: '40%',
            xtype: 'dataview'
        }], 
        layout: 'hbox',
        width: '100%',
        xtype: 'panel'
    }],
    layout: 'vbox',
    listeners: {
        beforeShow: 'beforeShow'
    },
    requires: [
        'PubgTeamPage.view.main.matches.MatchWindowController',
        'PubgTeamPage.view.main.matches.MatchWindowModel'
    ],
    viewModel: {
        type: 'matchwindow'
    },
    width: 750,
    xtype: 'matchwindow'
})
    


