Ext.define('PubgTeamPage.view.main.leaderboards.Leaderboard', {
    controller: 'leaderboard',
    extend: 'Ext.view.View',
    requires: [
        'PubgTeamPage.view.main.leaderboards.LeaderboardController',
        'PubgTeamPage.view.main.leaderboards.LeaderboardModel'
    ],
    scrollable: true,
    viewModel: 'leaderboard',
    xtype: 'leaderboard'
});
