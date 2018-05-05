import 'mapsapi-polygonmap';
import hexagonGrid from './utils/hexagonGrid';

ymaps.modules.define('Gridmap', ['Polygonmap'], (provide, Polygonmap) => {
    class Gridmap {
        constructor(el, map, points) {
            const R = 20;
            const zoom = map.getZoom();
            const rect = el.getBoundingClientRect();
            const center = map.getGlobalPixelCenter();
            const offsetLeft = center[0] - (rect.width / 2);
            const offsetTop = center[1] - (rect.height / 2);
            const polygons = hexagonGrid(map, zoom, R, offsetLeft, offsetTop, rect.width, rect.height);
            const polygonmap = new Polygonmap({polygons, points});
            polygonmap.setMap(map);
        }
    }

    provide(Gridmap);
});
