Ext.define('PubgTeamPage.view.main.maps.playerOptions', {
    closeAction: 'hide',
    extend: 'Ext.window.Window',
    height: 300,
    width: 650,
    layout:'vbox',
    listeners: {
        close: 'playerOptionsClose'
    },
    items: [{
        xtype: 'form',
        reference: 'playerOptionForms',
        layout: 'hbox',
        padding: '4 4 4 4',
        items: [{
            xtype: 'fieldcontainer',
            items: [{
                bind: {
                    store: '{players}'
                },
                fieldLabel: 'Player',
                required: true,
                allowBlank: false,
                labelWidth: 45,
                name: 'player',
                editable: false,
                reference: 'playerName',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'player_id',
                xtype: 'combobox'
            },{
                bind: {
                    store: '{modes}'
                },
                fieldLabel: 'Mode',
                required: true,
                allowBlank: false,
                labelWidth: 45,
                name: 'mode',
                editable: false,
                queryMode: 'local',
                reference: 'gameMode',
                displayField: 'mode',
                valueField: 'mode',
                xtype: 'combobox'
            },{
                bind: {
                    store: '{matchesMap}'
                },
                fieldLabel: 'Match',
                labelWidth: 45,
                name: 'mode',
                editable: false,
                queryMode: 'local',
                reference: 'gameMode',
                displayField: 'mode',
                valueField: 'mode',
                xtype: 'combobox'
            }]
        },{
            xtype: 'fieldcontainer',
            margin: '0 0 0 10px',
            fieldLabel: 'Layer',
            required: true,
            labelWidth: 40,
            defaultType: 'radiofield',
            items: [
                {
                    boxLabel: 'Kills',
                    checked: true,
                    name: 'layer',
                    inputValue: 'kills'
                }, {
                    boxLabel: 'Deaths',
                    name: 'layer',
                    inputValue: 'deaths'
                }
            ]
        },{
            xtype: 'fieldcontainer',
            margin: '0 0 0 10px',
            fieldLabel: 'Type',
            labelWidth: 40,
            defaultType: 'radiofield',
            items: [
                {
                    boxLabel: 'Point',
                    checked: true,
                    name: 'layertype',
                    inputValue: 'point'
                }, {
                    boxLabel: 'Heat',
                    name: 'layertype',
                    inputValue: 'heat'
                }
            ]
        },{
            xtype: 'button',
            handler: 'onAddLayer',
            text: 'Add Layer',
            width: 100,
            margin: '0 0 0 10px'
        }]
    },{
        xtype: 'grid',
        reference: 'layersGrid',
        width: '100%',
        store: {
            type: 'maplayers'
        },
        border: false,
        columns: [{
            width: 200,
            dataIndex: 'name',
            header: 'Name'
        }, {
            width: 100,
            dataIndex: 'mode',
            header: 'Mode'
        }, {
            header: 'Layer',
            dataIndex: 'layer',
            flex: 0.75
        }, {
            header: 'Type',
            dataIndex: 'type',
            flex: .5
        }, {
            xtype: 'actioncolumn',
            items: [{
                iconCls: 'x-fa fa-eye',
                handler: 'toggleLayer'
            }],
            menuDisabled: true,
            width: 35
        }, {
            xtype: 'actioncolumn',
            items: [{
                iconCls: 'x-fa fa-remove',
                handler: 'removeLayer'
            }],
            menuDisabled: true,
            width: 35
        }]
    }],
    requires: [
        'Ext.slider.Single',
        'PubgTeamPage.store.MapLayers'
    ],
    xtype: 'playeroptions'
})