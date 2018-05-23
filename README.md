# Yandex Maps API Gridmap Module

Yandex.Maps API module for data visualization.

## Usage

```bash
npm i
npm run build
```

For development:

```bash
npm run dev
```

For linting:

```bash
npm run lint
```

For testing:

```bash
npm test
```

> ymaps-gridmap@0.0.1 generate-docs /home/kirill/learn/ymaps-gridmap
> jsdoc2md src/Gridmap/Gridmap.js

## Classes

<dl>
<dt><a href="#Gridmap">Gridmap</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GridBounds">GridBounds</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GridOptions">GridOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#HexagonGripParams">HexagonGripParams</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SquareGripParams">SquareGripParams</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Gridmap"></a>

## Gridmap
**Kind**: global class  
<a name="new_Gridmap_new"></a>

### new Gridmap([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options |
| [options.points] | <code>Array.&lt;IGeoObject&gt;</code> | Array of points to visualize |
| [options.zoom] | <code>number</code> | zoom which will be used for the grid calculation |
| [options.map] | <code>IMap</code> | map |
| [options.grid] | [<code>GridOptions</code>](#GridOptions) | options which will be used in a grid calculation |

<a name="GridBounds"></a>

## GridBounds : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| leftBotom | <code>Array.&lt;number&gt;</code> | geographical coordinate of the left bottom point. |
| rigthTop | <code>Array.&lt;number&gt;</code> | geographical coordinate of the right top point. |

<a name="GridOptions"></a>

## GridOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | type of grid |
| [bounds] | [<code>GridBounds</code>](#GridBounds) | bounds for grid |
| params | [<code>HexagonGripParams</code>](#HexagonGripParams) \| [<code>SquareGripParams</code>](#SquareGripParams) | params of grid |

<a name="HexagonGripParams"></a>

## HexagonGripParams : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bigRadius | <code>number</code> | length of the big radius of a hexagon in pixels |

<a name="SquareGripParams"></a>

## SquareGripParams : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sideLenght | <code>number</code> | length of a side of square in pixels |

