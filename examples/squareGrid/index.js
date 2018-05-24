import '../../src/Gridmap';
import data from '../data/bikeparking-moscow.geojson';

ymaps.ready(() => {
    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        // eslint-disable-next-line no-unused-vars
        const myMap = new ymaps.Map('map', {
            center: [37.64, 55.76],
            zoom: 10,
            controls: ['zoomControl', 'typeSelector']
        });

        const squareGridmap = new Gridmap(data, {
            zoom: 10,
            grid: {
                type: 'square',
                params: {
                    sideLength: 20
                },
                bounds: {
                    leftBottom: myMap.getBounds()[0],
                    rightTop: myMap.getBounds()[1]
                }
            },
            colorScheme: 'summer',
            colorRanges: 10,
            colorOpacity: 0.8,
            strokeColor: '#fff',
            strokeWidth: 1.5,
            filterEmptyPolygons: true
        });

        squareGridmap.setMap(myMap);
    });
});
