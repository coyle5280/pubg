/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PubgTeamPage.view.main.matches.MatchWindowController', {
    alias: 'controller.matchwindow',
    beforeShow: function (window) {
        this.lookup('matchGrid').getStore().getProxy().setUrl(`${Ext.manifest.envSettings.url}/matches/${window.matchId}/players`)
        this.getViewModel().set({matchId: window.matchId})
        this.getViewModel().notify()
        this.lookup('matchGrid').getStore().load()
    },
    extend: 'Ext.app.ViewController',
    gridSelect: function (grid, record) {
        let playerId = record.getData().player_id
        this.getViewModel().set({
            playerId
        })
        this.getViewModel().notify()
        this.getStore('playerMatchStats').load()
    }
});
