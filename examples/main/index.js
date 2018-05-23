import '../../src/Gridmap';
import data from '../data/data-latlong.geojson';

ymaps.ready(() => {
    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        const hexagonMap = new ymaps.Map(
            document.getElementById('hexagonMap'),
            {
                center: [55.76, 37.64],
                zoom: 10,
                controls: []
            });
        // eslint-disable-next-line no-unused-vars
        const hexagonGridmap = new Gridmap({
            map: hexagonMap,
            points: data,
            zoom: 10,
            grid: {
                type: 'hexagon',
                params: {
                    bigRadius: 20
                },
                bounds: {
                    leftBottom: hexagonMap.getBounds()[0],
                    rightTop: hexagonMap.getBounds()[1]
                }
            },
            colorScheme: 'cdom',
            colorRanges: 10,
            colorOpacity: 0.8,
            strokeColor: '#666'
        });

        const squareMap = new ymaps.Map(
            document.getElementById('squareMap'),
            {
                center: [55.76, 37.64],
                zoom: 10,
                controls: []
            });
        
        // eslint-disable-next-line no-unused-vars
        const squareGridmap = new Gridmap({
            map: squareMap,
            points: data,
            zoom: 10,
            grid: {
                type: 'square',
                params: {
                    sideLength: 20
                },
                bounds: {
                    leftBottom: squareMap.getBounds()[0],
                    rightTop: squareMap.getBounds()[1]
                }
            },
            colorScheme: 'summer',
            colorRanges: 10,
            colorOpacity: 0.8,
            strokeColor: '#fff',
            strokeWidth: 1.5,
            filterEmptyPolygons: true
        });
    });
});
