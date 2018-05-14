
Ext.define('PubgTeamPage.view.main.maps.MapController', {
    alias: 'controller.map',
    extend: 'Ext.app.ViewController',
    onRendermiramar: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('miramarToolBar').showAt([x,y])
    },

    onRenderreangel: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('erangelToolBar').showAt([x,y])
    },

    onRendersavage: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('savageToolBar').showAt([x,y])
    },

    swapMap: function () {
        this.getView().getActiveTab().swapMap()
    }

});
