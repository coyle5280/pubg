Ext.define('PubgTeamPage.view.main.maps.MiramarMap', {
    extend: 'Ext.panel.Panel',
    items: [{
        cls: 'mapbk',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        mapName: 'miramar',
        reference: 'miramarMainMap',
        xtype: 'basemapclass'
    },{
        cls: 'mapToolsToolbar',
        floating: true,
        items: [{
            height: 30,
            iconCls: 'x-fa fa-map',
            listeners: {
                click: {
                    fn: 'swapMap'
                }
            },
            width: 30
        }, {
            height: 30,
            iconCls: 'x-fa fa-car',
            width: 30
        }],
        layout: 'vbox',
        reference: 'miramarToolBar',
        shadow: false,
        xtype: 'toolbar'
    }],
    layout: 'fit',
    listeners: {
        afterlayout: {
            fn: 'onRendermiramar'
        }
    },
    mapName: 'miramar',
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    xtype: 'miramarmap'
})