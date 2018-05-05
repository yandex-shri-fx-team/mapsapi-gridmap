import 'mapsapi-polygonmap';
import hexagonGrid from './utils/hexagonGrid';

ymaps.modules.define('Gridmap', ['Polygonmap', 'util.bounds'], (provide, Polygonmap, bounds) => {
    class Gridmap {
        constructor(el, map, points) {
            const coords = points.features.map(({geometry: {coordinates}}) => (coordinates));
            const projection = map.options.get('projection');
            const zoom = map.getZoom();
            const [leftBottom, rightTop] = bounds.fromPoints(coords, projection);
            leftBottom.reverse();
            rightTop.reverse();
            const [left, bottom] = projection.toGlobalPixels(leftBottom, zoom);
            const [right, top] = projection.toGlobalPixels(rightTop, zoom);

            const R = 20;

            const polygons = hexagonGrid(map, zoom, R, left, top, right - left, bottom - top);
            const polygonmap = new Polygonmap({polygons, points});
            polygonmap.setMap(map);
        }
    }

    provide(Gridmap);
});
