Ext.define('PubgTeamPage.view.main.maps.MapsToolBar', {
    cls: 'mapbk',
    extend: 'Ext.toolbar.Toolbar',
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
        enableToggle: true,
        reference: 'playerOptionsButton',
        height: 30,
        iconCls: 'layerPng',
        listeners: {
            toggle: {
                fn: 'usersOptionsToggle'
            }
        },
        margin: '5px 0 0 0',
        width: 30
    }],
    layout: 'vbox',
    reference: 'erangelToolBar',
    shadow: false,
    xtype: 'mapstoolbar'
})