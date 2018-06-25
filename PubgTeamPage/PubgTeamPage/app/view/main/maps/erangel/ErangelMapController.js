Ext.define('PubgTeamPage.view.main.maps.erangel.ErangelMapController', {
    alias: 'controller.erangelmap',
    extend: 'Ext.app.ViewController',
    mapName: 'Erangel_Main',
    mapReference: 'erangelMainMap',
    mixins: [
        'PubgTeamPage.mixins.MapToolFunctions'
    ],
    onRenderreangel: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('erangelToolBar').showAt([x,y])
    }
});