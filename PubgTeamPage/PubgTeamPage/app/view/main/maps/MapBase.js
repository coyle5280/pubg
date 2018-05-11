Ext.define('PubgTeamPage.view.main.maps.MapBase', {
    extend: 'Ext.Component',
    xtype: 'basemapclass',
    config: {
        map: null,
        currentLocation: null,
        baseLayer: null,
        layers: {},
        layersQueue: [],
        zoom: 1,
        currentBaseLayer: null,
        bounds: null,
        center: [0,0],
        pin: null,
        pinImgUrl: null
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
 
    initComponent: function () {
        this.callParent(arguments)
        // this.createMap()
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
                // maxBounds: [
                //     [-90, -180],
                //     [130, 270]
                // ],
                // maxBoundsViscosity: 0.9,
                center: this.getCenter() || [0, 0],
                attributionControl: false
            });

            this.setMap(map);
            this.baseLayer = L.tileLayer(`${Ext.manifest.envSettings.url}/tiles/256/${this.mapName}/{z}/{x}/{y}`, {
                attribution: '',
                maxZoom: 5,
                minZoom: 2,
                id: 'pubg.satellite',
                noWrap: true
            });
            this.baseLayer.addTo(map);

            // if (queue) {
            //     for (i = 0, len = queue.length; i < len; i++) {
            //         map.addLayer(queue[i]);
            //     }
            //     delete this.queue;
            // }
            // if (this.getPin()) {
            //     if (this.lookupViewModel().get('activeData.img_url')) {
            //         var smallIcon = L.icon({
            //             iconSize: [27, 27],
            //             popupAnchor: [1, -24],
            //             className: 'circle-icon',
            //             iconUrl: this.lookupViewModel().get('activeData.img_url')
            //         });
            //         this.getLayers()['personnel'] = L.marker(this.lookupViewModel().get('mapCenter'), {
            //             icon: smallIcon
            //         }).addTo(map);
            //     } else {
            //         if (this.lookupViewModel().get('mapCenter')) {
            //             this.getLayers()['personnel'] = L.marker(this.lookupViewModel().get('mapCenter')).addTo(map);
            //         }
            //     }
            // }
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

    add: function (layer) {
        var map = this.getMap();
        if (map) {
            map.addLayer(layer);
        }
        return layer;
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
