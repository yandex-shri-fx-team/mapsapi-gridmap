# Yandex Maps API Gridmap Module

Yandex.Maps API module for data visualization.

**Gridmap** is a graphical representation of some spatial data, where depending on the number of entered points cell of grid (hexogon or square) are painted in different colors.
`Gridmap` class allows to construct and display such representations over geographical maps.

## Loading

1. Put module source code ([gridmap.min.js](https://github.com/yandex-shri-fx-team/ymaps-gridmap/blob/master/umd/gridmap.min.js)) on your CDN.

2. Load both [Yandex Maps JS API 2.1](http://api.yandex.com/maps/doc/jsapi/) and module source code by adding following code into &lt;head&gt; section of your page:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/gridmap.min.js" type="text/javascript"></script>
   ```

   If you use [GeoJSON](http://geojson.org) data:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU&coordOrder=longlat" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/gridmap.min.js" type="text/javascript"></script>
   ```

   If you use [npm](https://www.npmjs.com):

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   ```

   ```bash
   npm i --save git+https://github.com/yandex-shri-fx-team/ymaps-gridmap.git
   ```

   ```js
   require('ymaps-gridmap');

   // Or with babel
   import 'ymaps-gridmap';
   ```

3. Get access to module functions by using [ymaps.modules.require](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/modules.require.xml) method:

   ```js
   ymaps.modules.require(['Gridmap'], function (Gridmap) {
        var gridmap = new Gridmap();
   });
   ```

<a name="module_Gridmap"></a>

## Gridmap
Gridmap module.

**Requires**: <code>module:util.bounds</code>

* [Gridmap](#module_Gridmap)
    * [Gridmap](#exp_module_Gridmap--Gridmap) ⏏
        * [new Gridmap([options])](#new_module_Gridmap--Gridmap_new)
        * [~GridBounds](#module_Gridmap--Gridmap..GridBounds) : <code>Object</code>
        * [~GridOptions](#module_Gridmap--Gridmap..GridOptions) : <code>Object</code>
        * [~HexagonGripParams](#module_Gridmap--Gridmap..HexagonGripParams) : <code>Object</code>
        * [~SquareGripParams](#module_Gridmap--Gridmap..SquareGripParams) : <code>Object</code>

<a name="exp_module_Gridmap--Gridmap"></a>

### Gridmap ⏏
**Kind**: Exported class
<a name="new_module_Gridmap--Gridmap_new"></a>

#### new Gridmap([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options |
| [options.points] | <code>Array.&lt;IGeoObject&gt;</code> | Array of points to visualize |
| [options.zoom] | <code>number</code> | zoom which will be used for the grid calculation |
| [options.map] | <code>IMap</code> | map |
| [options.grid] | <code>GridOptions</code> | options which will be used in a grid calculation |

<a name="module_Gridmap--Gridmap..GridBounds"></a>

#### Gridmap~GridBounds : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| leftBotom | <code>Array.&lt;number&gt;</code> | geographical coordinate of the left bottom point. |
| rigthTop | <code>Array.&lt;number&gt;</code> | geographical coordinate of the right top point. |

<a name="module_Gridmap--Gridmap..GridOptions"></a>

#### Gridmap~GridOptions : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type of grid |
| [bounds] | <code>GridBounds</code> | bounds for grid |
| params | <code>HexagonGripParams</code> \| <code>SquareGripParams</code> | params of grid |

<a name="module_Gridmap--Gridmap..HexagonGripParams"></a>

#### Gridmap~HexagonGripParams : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bigRadius | <code>number</code> | length of the big radius of a hexagon in pixels |

<a name="module_Gridmap--Gridmap..SquareGripParams"></a>

#### Gridmap~SquareGripParams : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sideLenght | <code>number</code> | length of a side of square in pixels |


## Examples

### Displaying gridmap over geographical map

```js
ymaps.modules.require(['Gridmap'], function (Gridmap) {
    const dataPoints = {
            type: 'FeatureCollection',
            features: [{
                id: 'id1',
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [37.782551, -122.445368]
                }
            }, {
                id: 'id2',
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [37.782745, -122.444586]
                }
            }]
        };
    const data = {points: dataPoints};
    const gridmap = new Gridmap(data);

    gridmap.setMap(myMap);
});
```

## Demo

- https://yandex-shri-fx-team.github.io/ymaps-gridmap
