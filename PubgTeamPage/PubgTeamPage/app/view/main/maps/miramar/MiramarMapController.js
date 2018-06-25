Ext.define('PubgTeamPage.view.main.maps.miramar.MiramarMapController', {
    alias: 'controller.miramarmap',
    extend: 'Ext.app.ViewController',
    mapName: 'Desert_Main',
    mapReference: 'miramarMainMap',
    mixins: [
        'PubgTeamPage.mixins.MapToolFunctions'
    ],
    onRendermiramar: function (panel) {
        let [x,y] = panel.getXY()
        this.lookup('miramarToolBar').showAt([x,y])
    }
});