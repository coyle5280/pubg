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
    onXAxisLabelRender: function (axis, label) {
        let months = {
            1: 'January',
            2: 'Feburary',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }
        return months[label]
    },
    playerSelect: function (view, record, item) {
        if (this.selected) {
            this.selected.removeCls('playerSelected')
        }
        this.selected = Ext.get(item).addCls('playerSelected')
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
    },
    statSelect: function (dataView, record, button) {
        if (this[button.getAttribute('data')]) {
            this[button.getAttribute('data')]()
        }
    }
});
