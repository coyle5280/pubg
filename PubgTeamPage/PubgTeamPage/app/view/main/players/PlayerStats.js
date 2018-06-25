Ext.define('PubgTeamPage.view.main.players.PlayerStats', {
    extend: 'Ext.panel.Panel',
    layout: 'hbox',
    xtype: 'playerstats',
    height: '65%',
    width: '100%',
    items: [{
        bind: {
            store: '{playerStats}'
        },
        itemSelector: 'div',
        tpl: new Ext.XTemplate(`
            <tpl for=".">
                <h3 class="playerStatsHeader">Career Stats</h3>
                <div class="playerStats">
                    <p>Total Kills {total_kills} </p> 
                    <p>Kills Per Round {[this.divide(values.total_matches, values.total_kills)]} </p> 
                    <p>Accuracy {[this.average(values.total_shots, values.total_hits)]} </p> 
                    <p>Dbnos {total_dbnpos} </p> 
                    <p>Assists {total_assists} </p> 
                    <p>Revives {total_revives} </p> 
                    <p>Ride Distance {[this.metersToKm(values.totalridedistance)]}</p> 
                    <p>Walk Distance {[this.metersToKm(values.total_walk_distance)]}</p> 
                    <p>Road Kills {total_road_kills} </p> 
                    <p>Max Damage {[this.round(values.max_damage_dealt_in_game)]}</p> 
                    <p>Longest Kill {[this.format(values.longest_kill)]}</p> 
                    <p>Most Kills In A Game {most_kills_in_game} </p> 
                    <p>Total Matches Played {total_matches} </p> 
                    <p>Chicken Dinners {win_count} </p> 
                </div>
            </tpl>
        `,{
            average: function(v1, v2) {
                return `${(v2/v1).toFixed(2).replace(/0\./,'')}%`
            },
            divide: function(v1, v2) {
                return `${(v2/v1).toFixed(2)}`
            },
            format: function(value) {
                return `${value}m`
            },
            metersToKm: function(value) {
                return `${(value/1000).toFixed(2)} Km`
            },
            round: function(value) {
                return value.toFixed(2)
            }
            
        }),
        listeners: {
            itemclick: 'statSelect'
        },
        width: '20%',
        height: '100%',
        xtype: 'dataview'
    },{
        xtype: 'container',
        width: '80%',
        height: '100%',
        layout: 'vbox',
        items: [{
            xtype: 'container',
            height: '50%',
            width: '100%',
            layout: 'hbox',
            items: [{
                bind: {
                    store: '{playerChartKills}'
                },
                height: '100%',
                width: '50%',
                xtype: 'playerstatschart',
                sprites: [{
                    type: 'text',
                    text: 'Kills',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }]
            },{
                bind: {
                    store: '{playerChartDbnos}'
                },
                height: '100%',
                width: '50%',
                xtype: 'playerstatschart',
                sprites: [{
                    type: 'text',
                    text: 'Dbnos',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }]
            }]
        },{
            xtype: 'container',
            height: '50%',
            width: '100%',
            layout: 'hbox',
            items: [{
                bind: {
                    store: '{playerChartAssits}'
                },
                height: '100%',
                width: '50%',
                xtype: 'playerstatschart',
                sprites: [{
                    type: 'text',
                    text: 'Assists',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }]
            },{
                bind: {
                    store: '{playerChartRevives}'
                },
                height: '100%',
                width: '50%',
                xtype: 'playerstatschart',
                sprites: [{
                    type: 'text',
                    text: 'Revives',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }]
            }]
        }]
    }]
})