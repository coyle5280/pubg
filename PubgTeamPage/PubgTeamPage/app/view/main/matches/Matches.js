Ext.define('PubgTeamPage.view.main.matches.Matches', {
    controller: 'matches',
    extend: 'Ext.panel.Panel',
    items: [{
        bind: {
            store: '{matches}'
        },
        itemSelector: 'div.matches',
        listeners: {
            select: 'matchSelect'
        },
        scrollable: true,
        tpl: new Ext.XTemplate(`
            <tpl for=".">
                <div class="matches">
                    <img class="match-map-img" src="./resources/{map_name}.jpg"/>
                    <div class="matchInfo">
                        <span class="spanInfo"><p class="modeFinish">{[this.formatGameMode(values.game_mode)]}</p></span>
                    </div>
                    <div clas="match-stats-panel">
                        <p><i class="fa fa-user" aria-hidden="true"></i>&nbsp;{totalplayers}&nbsp;&nbsp;&nbsp;<i class="fa fa-users" aria-hidden="true"></i>&nbsp;{totalteams} </p>
                    </div>
                    <p>{finish}</p>
                </div>
            </tpl>
        `, {
            formatDate: (date) => {
                return moment(date).tz(moment.tz.guess()).format('MMM Do YYYY <br>@ HH:mm A')
            },
            formatGameMode: (name) => {
                let prettyName
                switch (name) {
                    case 'squad-fpp':
                        prettyName = 'Squads'
                        break;
                    case 'duo-fpp':
                        prettyName = 'Duo'
                        break;
                    case 'solo-fpp':
                        prettyName = 'Solo'
                        break
                    default:
                        prettyName = 'Unknown'
                }
                return prettyName
            }
        }),
        xtype: 'dataview'
    }],
    layout: 'card',
    requires: [
        'PubgTeamPage.view.main.matches.MatchesController',
        'PubgTeamPage.view.main.matches.MatchesModel',
        'PubgTeamPage.view.main.matches.MatchWindow',
        'PubgTeamPage.store.MatchPlayerRecord'
    ],
    viewModel: 'matches',
    xtype: 'matches'
});