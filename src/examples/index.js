import './../Gridmap/Gridmap';
import data from './data.geojson';

ymaps.ready(() => {
    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        const el = document.getElementById('map');
        const myMap = new ymaps.Map(el, {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
        });
        // eslint-disable-next-line no-unused-vars
        const gridmap = new Gridmap(el, myMap, data);
    });
});
