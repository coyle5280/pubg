Ext.define('PubgTeamPage.view.main.maps.ErangelMap', {
    cls: 'mapbk',
    extend: 'Ext.panel.Panel',
    items: [{
        cls: 'mapbk',
        listeners: {
            afterrender: {
                fn: 'createMap',
                scope: 'this'
            }
        },
        mapName: 'erangel',
        reference: 'erangelMainMap',
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
        reference: 'erangelToolBar',
        shadow: false,
        xtype: 'toolbar'
    }],
    layout: 'fit',
    listeners: {
        afterlayout: {
            fn: 'onRenderreangel'
        }
    },
    mapName: 'erangel',
    swapMap: function () {
        this.down('component').swapBasemap()
    },
    xtype: 'erangelmap'
})