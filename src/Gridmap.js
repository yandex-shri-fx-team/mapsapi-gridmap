import 'ymaps-polygonmap';
import hexagonGrid from './utils/hexagonGrid';
import squareGrid from './utils/squareGrid';
import get from 'lodash/get';
/**
 * Gridmap module.
 *
 * @module Gridmap
 * @requires Polygonmap
 * @requires util.bounds
 */
ymaps.modules.define('Gridmap', [
    'Polygonmap',
    'util.bounds'
], (provide, Polygonmap, bounds) => {
    function getRequiredOption(options, path) {
        const value = get(options, path);
        if (!value) {
            throw new Error(`options.${path} is required parameter`);
        }
        return value;
    }

    /**
     * @typedef {Object} GridBounds
     * @property {number[]} leftBotom geographical coordinate of the left bottom point.
     * @property {number[]} rigthTop geographical coordinate of the right top point.
     */

    /**
     * @typedef {Object} GridOptions
     * @property {string} type type of grid
     * @property {GridBounds=} bounds bounds for grid
     * @property {HexagonGripParams|SquareGripParams} params params of grid
     */

    /**
     * @typedef {Object} HexagonGripParams
     * @property {number} bigRadius length of the big radius of a hexagon in pixels
     */

    /**
     * @typedef {Object} SquareGripParams
     * @property {number} sideLenght length of a side of square in pixels
     */

    /**
     *
     * @param {Object} [data]  Points, GeoJSON FeatureCollections.
     * @param {Object} [options] Options for customization.
     * @param {number|array} options.colorRanges count of ranges or array of custom ranges
     * @param {string|array} options.colorScheme preset for colorize or array of custom colors
     * @param {number} options.colorOpacity opacity of polygon
     * @param {string} options.colorEmptyPolygon color of polygon where points count equal 0
     * @param {string} options.strokeColor color for polygon stroke
     * @param {number} options.strokeWidth width for polygon stroke
     * @param {boolean} options.showLegend flag to show color legend
     * @param {function} options.legendTemplate receives object {color: value} returns html legend template
     * @param {object} options.legendPosition position of legend,
     * you can only change the top or bottom and right or left
     * @param {number} [options.zoom] zoom which will be used for the grid calculation
     * @param {GridOptions} [options.grid] options which will be used in a grid calculation
     * @alias module:Gridmap
     */
    class Gridmap {
        constructor(data, options) {
            this._data = data;
            this.options = options;
        }

        /**
         * Set Map instance to render Polygonmap object.
         *
         * @public
         * @param {Map} map Map instance.
         * @returns {Polygonmap} Self-reference.
         */
        setMap(map) {
            if (this._map !== map) {
                this._map = map;

                if (map && this._data) {
                    this._render();
                }
            }

            return this;
        }

        /**
         * Get the Map instance.
         *
         * @public
         * @returns {Map} Reference to Map instance.
         */
        getMap() {
            return this._map;
        }

        /**
         * Render Polygonmap.
         *
         * @private
         */
        _render() {
            const points = this._data;
            const zoom = getRequiredOption(this.options, 'zoom');
            const projection = this._map.options.get('projection');

            let leftBottom;
            let rightTop;

            if (get(this.options, 'grid.bounds')) {
                leftBottom = getRequiredOption(this.options, 'grid.bounds.leftBottom');
                rightTop = getRequiredOption(this.options, 'grid.bounds.rightTop');
            } else {
                const coords = points.features.map(({geometry: {coordinates}}) => (coordinates));
                [leftBottom, rightTop] = bounds.fromPoints(coords, projection);
            }

            const [left, bottom] = projection.toGlobalPixels(leftBottom, zoom);
            const [right, top] = projection.toGlobalPixels(rightTop, zoom);
            const width = right - left;
            const height = bottom - top;
            const gripType = getRequiredOption(this.options, 'grid.type');

            let polygons;

            switch (gripType) {
                case 'hexagon': {
                    const bigRadius = getRequiredOption(this.options, 'grid.params.bigRadius');
                    polygons = hexagonGrid(projection, zoom, bigRadius, left, top, width, height);
                    break;
                }
                case 'square': {
                    const sideWidth = getRequiredOption(this.options, 'grid.params.sideLength');
                    polygons = squareGrid(projection, zoom, sideWidth, left, top, width, height);
                    break;
                }
                default: {
                    throw new Error(`Unsupported grid's type ${gripType}`);
                }
            }

            const polygonmap = new Polygonmap({polygons, points}, this.options);

            polygonmap.setMap(this._map);
        }
    }

    provide(Gridmap);
});
