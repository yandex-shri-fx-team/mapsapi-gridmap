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

**Requires**: <code>module:Polygonmap</code>, <code>module:util.bounds</code>  

* [Gridmap](#module_Gridmap)
    * [Gridmap](#exp_module_Gridmap--Gridmap) ⏏
        * [new Gridmap([data], [options])](#new_module_Gridmap--Gridmap_new)
        * _instance_
            * [.setMap(map)](#module_Gridmap--Gridmap+setMap) ⇒ <code>Polygonmap</code>
            * [.getMap()](#module_Gridmap--Gridmap+getMap) ⇒ <code>Map</code>
        * _inner_
            * [~GridBounds](#module_Gridmap--Gridmap..GridBounds) : <code>Object</code>
            * [~GridOptions](#module_Gridmap--Gridmap..GridOptions) : <code>Object</code>
            * [~HexagonGripParams](#module_Gridmap--Gridmap..HexagonGripParams) : <code>Object</code>
            * [~SquareGripParams](#module_Gridmap--Gridmap..SquareGripParams) : <code>Object</code>

<a name="exp_module_Gridmap--Gridmap"></a>

### Gridmap ⏏
**Kind**: Exported class  
<a name="new_module_Gridmap--Gridmap_new"></a>

#### new Gridmap([data], [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>Object</code> |  | Points, GeoJSON FeatureCollections. |
| data.polygons | <code>Object</code> |  | GeoJSON FeatureCollections. |
| data.points | <code>Object</code> |  | GeoJSON FeatureCollections. |
| [options] | <code>Object</code> |  | Options for customization. |
| [options.zoom] | <code>number</code> |  | Zoom which will be used for the grid calculation. |
| [options.grid] | <code>GridOptions</code> |  | Options which will be used in a grid calculation. |
| [options.grid.type] | <code>GridOptions</code> |  | Type of grid. Can be "hexagon" | "square". |
| [options.grid.params] | <code>GridParamsOptions</code> |  | Options which will be used in a grid render |
| [options.grid.params.bigRadius] | <code>number</code> |  | Radius of hexagon. |
| [options.grid.params.sideLength] | <code>number</code> |  | Side length of square. |
| [options.grid.bouds] | <code>GridBoundsOptions</code> |  | Options of bound for render grid. |
| [options.grid.bouds] | <code>number</code> |  | Options of bound for render grid. |
| [options.grid.bouds.leftBottom] | <code>Array</code> |  | Coordinates of left bottom point of bound. |
| [options.grid.bouds.topRight] | <code>Array</code> |  | Coordinates of right top point of bound. |
| options.mapper | <code>function</code> |  | Function of iterative transformation of features. |
| [options.fillBy] | <code>string</code> | <code>&quot;points&quot;</code> | Calculate the color by points | weight. |
| [options.fillByWeightProp] | <code>string</code> | <code>&quot;weight&quot;</code> | Prop name in data object, for weight value. If fillBy is "weight". |
| [options.fillByWeightType] | <code>string</code> | <code>&quot;middle&quot;</code> | Type of calculate color by weight. Can be middle | maximum |
| [options.colorRanges] | <code>number</code> \| <code>array</code> | <code>3</code> | Count of ranges or array of custom ranges. |
| [options.colorScheme] | <code>string</code> \| <code>array</code> | <code>&quot;[rgb(255, 90, 76), rgb(224, 194, 91), rgb(108, 206, 92)]&quot;</code> | Preset for colorize or array of custom colors. |
| [options.fillOpacity] | <code>number</code> | <code>1</code> | Opacity of polygon. |
| [options.fillColorEmptyPolygon] | <code>string</code> | <code>&quot;rgba(255, 255, 255, 0)&quot;</code> | Color of polygon where points count equal 0. |
| [options.strokeColor] | <code>string</code> | <code>&quot;#fff&quot;</code> | Color of polygon stroke. |
| [options.strokeWidth] | <code>number</code> | <code>2</code> | Width of polygon stroke. |
| [options.showLegend] | <code>boolean</code> | <code>true</code> | Flag to show color legend. |
| options.legendTemplate | <code>function</code> |  | Receives object {color: value} returns html legend template. |
| [options.legendPosition] | <code>object</code> | <code>top: 10, right: 10</code> | Position of legend, you can only change the top or bottom and right or left. |
| [options.filter] | <code>function</code> |  | Function for custom filter polygons with points. |
| [options.filterEmptyPolygons] | <code>boolean</code> | <code>false</code> | Flag for show polygon with count of points equal 0. |
| options.onMouseEnter | <code>function</code> |  | Handler for mouseEnter event. |
| options.onMouseLeave | <code>function</code> |  | Handler for mouseLeave event. |
| options.onClick | <code>function</code> |  | Handler for click event. |
| options.balloonContent | <code>function</code> |  | Function for render content of baloon. Recieves object with properties of polygon. |
| [options.fillOpacityHover] | <code>number</code> | <code>0.9</code> | Number of opacity on polygon hover. |
| [options.strokeWidthHover] | <code>number</code> | <code>2</code> | Number of stroke width on polygon hover. |
| [options.fillOpacityActive] | <code>number</code> | <code>1</code> | Number of opacity on polygon active. |
| [options.strokeWidthActive] | <code>number</code> | <code>3</code> | Number of stroke width on polygon active. |
| [options.interactivity] | <code>boolean</code> | <code>true</code> | Flag for enable interactivity. |

<a name="module_Gridmap--Gridmap+setMap"></a>

#### gridmap.setMap(map) ⇒ <code>Polygonmap</code>
Set Map instance to render Polygonmap object.

**Kind**: instance method of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Returns**: <code>Polygonmap</code> - Self-reference.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | Map instance. |

<a name="module_Gridmap--Gridmap+getMap"></a>

#### gridmap.getMap() ⇒ <code>Map</code>
Get the Map instance.

**Kind**: instance method of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Returns**: <code>Map</code> - Reference to Map instance.  
**Access**: public  
<a name="module_Gridmap--Gridmap..GridBounds"></a>

#### Gridmap~GridBounds : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| leftBotom | <code>Array.&lt;number&gt;</code> | Geographical coordinate of the left bottom point. |
| rigthTop | <code>Array.&lt;number&gt;</code> | Geographical coordinate of the right top point. |

<a name="module_Gridmap--Gridmap..GridOptions"></a>

#### Gridmap~GridOptions : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Type of grid. |
| [bounds] | <code>GridBounds</code> | Bounds for grid. |
| params | <code>HexagonGripParams</code> \| <code>SquareGripParams</code> | Params of grid. |

<a name="module_Gridmap--Gridmap..HexagonGripParams"></a>

#### Gridmap~HexagonGripParams : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bigRadius | <code>number</code> | Length of the big radius of a hexagon in pixels. |

<a name="module_Gridmap--Gridmap..SquareGripParams"></a>

#### Gridmap~SquareGripParams : <code>Object</code>
**Kind**: inner typedef of [<code>Gridmap</code>](#exp_module_Gridmap--Gridmap)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sideLenght | <code>number</code> | Length of a side of square in pixels. |


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
    const gridmap = new Gridmap(dataPoints);

    gridmap.setMap(myMap);
});
```

## Demo

- https://yandex-shri-fx-team.github.io/ymaps-gridmap
