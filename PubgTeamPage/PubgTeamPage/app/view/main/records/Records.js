Ext.define('PubgTeamPage.view.main.records.Records', {
    bind: {
        store: '{records}'
    },
    controller: 'records',
    extend: 'Ext.view.View',
    itemSelector: 'div',
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
            <div class="records">'
                <h4 class="record-header">Most Kills Duo:</h4>
                    <ul>
                        <tpl for="kills">
                            <li>{most_kill_name} @ {kills}</li>
                        </tpl>
                    </ul>
                <h4 class="record-header">Most Kills Any Mode:</h4>
                    <ul>
                        <tpl for="kills_all">
                            <li>{most_kill_name} @ {kills}</li>
                        </tpl>
                    </ul>
                <h4 class="record-header">Most Assists Duo:</h4>
                    <ul>
                        <tpl for="query_assists_duo">
                            <li>{name} @ {assists}</li>
                        </tpl>
                    </ul>
                <h4 class="record-header">Total Kills Leader:</h4>
                    <ul>
                        <tpl for="total_kills">
                            <li>{name} @ {total}</li>
                        </tpl>
                    </ul>
                <h4 class="record-header">Total Head Shots Leader:</h4>
                    <ul>
                        <tpl for="head_shot_kills">
                            <li>{name} @ {total}</li>
                        </tpl>
                    </ul>
            </div>
        </tpl>
    `),
    viewModel: 'records',
    xtype: 'records'
});
