Ext.define('PubgTeamPage.view.main.records.Records', {
    bind: {
        store: '{records}'
    },
    controller: 'records',
    extend: 'Ext.view.View',
    itemSelector: 'div.main',
    listeners: {
        select: 'recordSelect'
    },
    requires: [
        'PubgTeamPage.view.main.records.RecordsModel',
        'PubgTeamPage.view.main.records.RecordsController',
        'PubgTeamPage.view.main.records.RecordsModel'
    ],
    tpl: new Ext.XTemplate(`
        <tpl for=".">
            <div class="main">'
                <div class="column">'
                    <h3 class="record-header">Solo Stats</h3>
                    <h4 class="record-header">Most Kills:</h4>
                        <ul>
                            <tpl for="most_kills_solo">
                                <li>{most_kill_name} @ {kills}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Most Assists:</h4>
                        <ul>
                            <tpl for="most_assists_solo">
                                <li>{most_assists_name} @ {assists}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Longest Kill:</h4>
                        <ul>
                            <tpl for="longest_kill_solo">
                                <li>{longest_kill_name} @ {longest_kill}</li>
                            </tpl>
                        </ul>
                </div>
                <div class="column">'
                    <h3 class="record-header">Duo Stats</h3>
                    <h4 class="record-header">Kills in a single game: </h4>
                        <ul>
                            <tpl for="most_kills_duo">
                                <li>{most_kill_name} @ {kills}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Longest Kill:</h4>
                        <ul>
                            <tpl for="longest_kill_duo">
                                <li>{longest_kill_name} @ {longest_kill}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Most Assists Duo:</h4>
                        <ul>
                            <tpl for="most_assists_duo">
                                <li>{most_assists_name} @ {assists}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Most Revives:</h4>
                        <ul>
                            <tpl for="most_revives_duo">
                                <li>{most_revives_name} @ {revives}</li>
                            </tpl>
                        </ul>
                </div>
                <div class="column">'
                    <h3 class="record-header">Squad Stats</h3>
                    <h4 class="record-header">Kills in a single game: </h4>
                        <ul>
                            <tpl for="most_kills_squad">
                                <li>{most_kill_name} @ {kills}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Longest Kill:</h4>
                        <ul>
                            <tpl for="longest_kill_squad">
                                <li>{longest_kill_name} @ {longest_kill}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Most Assists:</h4>
                        <ul>
                            <tpl for="most_assists_squad">
                                <li>{most_assists_name} @ {assists}</li>
                            </tpl>
                        </ul>
                    <h4 class="record-header">Most Revives:</h4>
                        <ul>
                            <tpl for="most_revives_squad">
                                <li>{most_revives_name} @ {revives}</li>
                            </tpl>
                        </ul>
                </div>
            </div>
        </tpl>
    `),
    viewModel: 'records',
    xtype: 'records'
});
