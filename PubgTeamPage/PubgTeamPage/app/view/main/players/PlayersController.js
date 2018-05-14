/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PubgTeamPage.view.main.players.PlayersController', {
    alias: 'controller.player',
    extend: 'Ext.app.ViewController',
    onAxisLabelRender: function (axis, label, layoutContext) {
        return layoutContext.renderer(label)
    },

    onSeriesTooltipRender: function (tooltip, record) {
        tooltip.setHtml(record.get('month1') + ': ' + record.get('data1'));
    },
    
    playerSelect: function (DataViewModel, record) {
        let vm = this.getViewModel()
        vm.set({
            playerId: record.getData().player_id
        })
        vm.notify()
        this.getStore('playerStats').load()
        this.getStore('playerChartKills').load()
        this.getStore('playerChartDbnos').load()
        this.getStore('playerChartAssits').load()
        this.getStore('playerChartRevives').load()
        // this.setPlayerChart(record.getData().player_id)
    },

    // setPlayerChart: function (id) {
    //     this.getStore('playerChart').getProxy().setUrl(`${Ext.manifest.envSettings.url}/players/${id}/charts?type=kills`)
    //     this.getStore('playerChart').load()
    // },

    

    

    statSelect: function (dataView, record, button) {
        if (this[button.getAttribute('data')]) {
            this[button.getAttribute('data')]()
        }
    }
});
