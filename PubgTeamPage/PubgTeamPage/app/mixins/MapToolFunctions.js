Ext.define('PubgTeamPage.mixins.MapToolFunctions', {
    extend: 'Ext.Mixin',
    swapMap: function () {
        this.getView().swapMap()
    },
    usersOptionsToggle: function (button, pressed) {
        (pressed) ? this.lookup('playerOptions').show() : this.lookup('playerOptions').hide()
    },
    addLayer: function (layer, player, mode, layertype, response) {
        let leafletLayer
        let layerName = `${player}-${mode}-${layer}-${layertype}-${Date.now()}`
        let map = this.lookup(this.mapReference)
        switch (layertype) {
            case 'point':
                leafletLayer = L.geoJson(response)
                break;
            case 'heat':
                leafletLayer = L.heatLayer(response, {radius: 12.5})
                break;
            case 'bubble':
                leafletLayer = L.bubble(response)
                break;
        }
        map.layers[layerName] = {
            layer: leafletLayer,
            visibility: true
        }
        map.add(leafletLayer)
        this.lookup('layersGrid').getStore().add({layerName, layer, name: this.lookup('playerName').getRawValue(), mode, type: layertype})
    },
    
    onAddLayer: async function () {
        if (this.lookup('playerOptionForms').isValid()) {
            let {layer, layertype, mode, player} = this.lookup('playerOptionForms').getValues()
            let mapName = this.mapName
            let response = await this.getData(layer, player, mode, layertype, mapName)
            this.addLayer(layer, player, mode, layertype, response)
        }
    },
    
    playerOptionsClose: function () {
        this.lookup('playerOptionsButton').toggle()
    },
    removeLayer: function (grid, row) {
        let storeRecord = this.lookup('layersGrid').getStore().getAt(row).getData()
        let layer = this.lookup(this.mapReference).layers[storeRecord.layerName]
        if (layer) {
            layer.layer.remove()
            delete this.lookup(this.mapReference).layers[storeRecord.layerName]
            this.lookup('layersGrid').getStore().removeAt(row, 1)
        }
    },
    
    
    toggleLayer: function (grid, row) {
        let storeRecord = this.lookup('layersGrid').getStore().getAt(row).getData()
        let layer = this.lookup(this.mapReference).layers[storeRecord.layerName]
        if (layer) {
            if (layer.visibility) {
                layer.layer.remove()
                layer.visibility = false
            } else {
                this.lookup(this.mapReference).add(layer.layer)
                layer.visibility = true
            }
        }
    },
    getData: function (layer, player_id, mode, layertype, mapName) {
        return new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: `${Ext.manifest.envSettings.url}/map/${mapName}/${player_id}?type=${layer}&mode=${mode}&layertype=${layertype}`,
                scope: this,
                success: function (response, opts) {
                    resolve(JSON.parse(response.responseText))
                },
                failure: function (response, opts) {
                    reject()
                }
            })
        })
    }
});