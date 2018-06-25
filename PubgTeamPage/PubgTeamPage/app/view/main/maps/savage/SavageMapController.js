Ext.define('PubgTeamPage.view.main.maps.savage.SavageMapController', {
    alias: 'controller.savagemap',
    extend: 'Ext.app.ViewController',
    onRendersavage: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('savageToolBar').showAt([x,y])
    }
});