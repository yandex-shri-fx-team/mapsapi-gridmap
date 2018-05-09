import './../Gridmap/Gridmap';
import data from './data-latlong.geojson';

ymaps.ready(() => {
    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        const hexagonMap = new ymaps.Map(
            document.getElementById('hexagonMap'),
            {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
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
                }
            }
        });

        const squareMap = new ymaps.Map(
            document.getElementById('squareMap'),
            {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
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
                    leftBottom: [55.58709262753493, 37.33818169628907],
                    rightTop: [55.89311385727207, 37.848359308593736]
                }
            }
        });
    });
});
