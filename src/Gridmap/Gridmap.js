import 'mapsapi-polygonmap/src/Polygonmap/Polygonmap';
import hexagonGrid from './utils/hexagonGrid';
import squareGrid from './utils/squareGrid';
import get from 'lodash/get';

ymaps.modules.define('Gridmap', ['Polygonmap', 'util.bounds'], (provide, Polygonmap, bounds) => {
    function getRequiredOption(options, path) {
        const value = get(options, path);
        if (!value) {
            throw new Error(`options.${path} is required parameter`);
        }
        return value;
    }
    class Gridmap {
        constructor(options) {
            const map = getRequiredOption(options, 'map');
            const points = getRequiredOption(options, 'points');
            const zoom = getRequiredOption(options, 'zoom');
            const projection = map.options.get('projection');

            let leftBottom;
            let rightTop;

            if (get(options, 'grid.bounds')) {
                leftBottom = getRequiredOption(options, 'grid.bounds.leftBottom');
                rightTop = getRequiredOption(options, 'grid.bounds.rightTop');
            } else {
                const coords = points.features.map(({geometry: {coordinates}}) => (coordinates));
                [leftBottom, rightTop] = bounds.fromPoints(coords, projection);
            }

            const [left, bottom] = projection.toGlobalPixels(leftBottom, zoom);
            const [right, top] = projection.toGlobalPixels(rightTop, zoom);
            const width = right - left;
            const height = bottom - top;
            const gripType = getRequiredOption(options, 'grid.type');

            let polygons;

            switch (gripType) {
                case 'hexagon': {
                    const bigRadius = getRequiredOption(options, 'grid.params.bigRadius');
                    polygons = hexagonGrid(projection, zoom, bigRadius, left, top, width, height);
                    break;
                }
                case 'square': {
                    const sideWidth = getRequiredOption(options, 'grid.params.sideLength');
                    polygons = squareGrid(projection, zoom, sideWidth, left, top, width, height);
                    break;
                }
                default: {
                    throw new Error(`Unsupported grid's type ${gripType}`);
                }
            }

            const polygonmap = new Polygonmap({polygons, points});
            polygonmap.setMap(map);
        }
    }

    provide(Gridmap);
});
