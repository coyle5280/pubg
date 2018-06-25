Ext.define('PubgTeamPage.components.MapBase', {
    add: function (layer) {
        var map = this.getMap();
        if (map) {
            map.addLayer(layer);
        }
        return layer;
    },
    extend: 'Ext.Component',
    xtype: 'basemapclass',
    config: {
        baseLayer: null,
        bounds: null,
        center: [0,0],
        currentBaseLayer: null,
        currentLocation: null,
        layers: {},
        layersQueue: [],
        map: null,
        pin: null,
        pinImgUrl: null,
        zoom: 1
    },

    listeners: {
        resize: function (w, h, oW, oH) {
            var map = this.getMap();
            map.invalidateSize();
        }
    },

    applyBounds: function (bounds) {
        if (bounds && !(bounds instanceof L.LatLngBounds)) {
            bounds = L.latLngBounds(bounds);
        }
        return bounds;
    },

    updateBounds: function (bounds) {
        var map = this.getMap();
        if (map && bounds.isValid()) {
            var fitBoundsOptions = {
                maxZoom: 17
            };
            map.fitBounds(bounds, fitBoundsOptions);
        }
    },

    swapBasemap: function () {
        let url
        this.baseLayer.remove()
        url = (this.baseLayerType === 'contour') ? `${Ext.manifest.envSettings.url}/tiles/256/${this.mapName}/{z}/{x}/{y}` : `${Ext.manifest.envSettings.url}/tiles/256/elevation-${this.mapName}/{z}/{x}/{y}`
        this.baseLayerType = (this.baseLayerType === 'contour') ? 'regular' : 'contour'
        this.baseLayer = L.tileLayer(url, {
            attribution: '',
            maxZoom: 5,
            minZoom: 2,
            id: 'pubg.satellite',
            noWrap: true
        });
        this.baseLayer.addTo(this.getMap());
    },

    createMap: function () {
        var bounds = this.getBounds(),
            queue = this.queue,
            map,
            i, len;
        if (!this.getMap()) {
            map = L.map(this.getId(), {
                zoom: this.getZoom(),
                zoomControl: true,
                crs: L.CRS.Simple,
                center: [-128, 128],
                attributionControl: false
            });
            this.baseLayerType = 'regular' 
            this.setMap(map);
            this.baseLayer = L.tileLayer(`${Ext.manifest.envSettings.url}/tiles/256/${this.mapName}/{z}/{x}/{y}`, {
                attribution: '',
                maxZoom: 5,
                maxBounds: [[-256,0],[0, 256]],
                minZoom: 2,
                id: 'pubg.satellite',
                noWrap: true
            });
            this.baseLayer.addTo(map);
            map.on('moveend', this.moveend, this);


            if (bounds && bounds.isValid()) {
                map.fitBounds(bounds);
            }
            this.fireEvent('mapInit');
        }
    },

    moveend: function () {
        return;
    },

    setView: function (center, zoom) {
        var map = this.getMap();
        if (map) {
            map.setView(center, zoom);
        }
    },

    

    mapClick: function (e) {
        this.fireEvent('mapclick', this, e.latlng, e);
    },

    onResize: function(w, h, oW, oH){
        var map = this.getMap();
        if (map){
            map.invalidateSize();
        }
    }
});
