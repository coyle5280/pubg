/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PubgTeamPage.view.main.players.PlayersController', {
    alias: 'controller.player',
    extend: 'Ext.app.ViewController',
    
    playerSelect: function (DataViewModel, record) {
        let vm = this.getViewModel()
        vm.set({
            playerId: record.getData().player_id
        })
        vm.notify()
        this.getStore('playerStats').load()
    }
});
