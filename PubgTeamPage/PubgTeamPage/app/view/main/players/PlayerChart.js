Ext.define('PubgTeamPage.view.main.players.PlayerChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'playerstatschart',
    interactions: {
        type: 'panzoom',
        zoomOnPanGesture: true
    },
    insetPadding: 40,
    innerPadding: {
        left: 40,
        right: 40
    },
    sprites: [{
        type: 'text',
        text: 'Kills by month',
        fontSize: 22,
        width: 100,
        height: 30,
        x: 40, // the sprite x position
        y: 20  // the sprite y position
    }],
    axes: [{
        type: 'numeric',
        position: 'left',
        grid: true,
        minimum: 0,
        renderer: 'onAxisLabelRender'
    }, {
        type: 'category',
        position: 'bottom',
        grid: true,
        label: {
            rotate: {
                degrees: -45
            }
        },
        renderer: 'onXAxisLabelRender'
    }],
    series: [{
        type: 'bar',
        xField: 'month1',
        yField: 'data1',
        style: {
            lineWidth: 4
        },
        marker: {
            radius: 4
        },
        label: {
            field: 'data1',
            display: 'over'
        },
        highlight: {
            fillStyle: '#000',
            radius: 5,
            lineWidth: 2,
            strokeStyle: '#fff'
        },
        tooltip: {
            trackMouse: true,
            showDelay: 0,
            dismissDelay: 0,
            hideDelay: 0,
            renderer: 'onSeriesTooltipRender'
        }
    }],
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.ItemHighlight'
    ]
})