import '../../src/Gridmap';
import data from '../data/bikeparking-moscow.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        const polygonmap = new Gridmap(data, {
            zoom: 10,
            grid: {
                type: 'hexagon',
                params: {
                    bigRadius: 20
                },
                bounds: {
                    leftBottom: myMap.getBounds()[0],
                    rightTop: myMap.getBounds()[1]
                }
            }
        });

        polygonmap.setMap(myMap);
    });
});
