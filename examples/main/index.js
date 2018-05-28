import '../../src/Gridmap';
import data from '../data/bikeparking-moscow.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl']
    });

    ymaps.modules.require(['Gridmap', 'ObjectManager'], (Gridmap, ObjectManager) => {
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
            },
            strokeColor: '#666',
            // showLegend: false,
            colorScheme: 'viridis',
            // colorScheme: [
            //     'rgb(250, 0, 0)',
            //     'rgb(240, 60, 0)',
            //     'rgb(230, 80, 0)',
            //     'rgb(220, 100, 0)',
            //     'rgb(210, 120, 10)',
            //     'rgb(200, 140, 20)',
            //     'rgb(190, 160, 30)',
            //     'rgb(180, 180, 40)',
            //     'rgb(160, 160, 50)',
            //     'rgb(80, 200, 90)'
            // ],
            colorRanges: 12,
            filterEmptyPolygons: true,
            onMouseEnter: function (e) {
                const objId = e.get('objectId');

                if (this._prevObjectId !== objId) {
                    this.objectManager.objects.setObjectOptions(objId, {
                        strokeColor: '#ff0000',
                        strokeWidth: 8,
                        zIndex: 1000,
                        zIndexHover: 1001,
                        zIndexActive: 1002
                    });
                }
            },
            onMouseLeave: function (e) {
                const objId = e.get('objectId');

                if (this._prevObjectId !== objId) {
                    this.objectManager.objects.setObjectOptions(objId, {
                        strokeColor: this.options.get('strokeColor'),
                        strokeWidth: this.options.get('strokeWidth'),
                        zIndex: 1
                    });
                }
            },
            onClick: function (e) {
                const objId = e.get('objectId');
                const object = this.objectManager.objects.getById(objId);
                const balloonContent = this.options.get('balloonContent');

                this.balloon.setData({
                    content: balloonContent(object)
                });

                this.balloon.open(e.get('coords'));

                if (this._prevObjectId) {
                    this.objectManager.objects.setObjectOptions(this._prevObjectId, {
                        strokeColor: this.options.get('strokeColor'),
                        fillOpacity: this.options.get('fillOpacity'),
                        strokeWidth: this.options.get('strokeWidth')
                    });
                }

                this.objectManager.objects.setObjectOptions(objId, {
                    strokeColor: '#ff0000',
                    fillOpacity: this.options.get('fillOpacityActive'),
                    strokeWidth: 8,
                    zIndex: 1000,
                    zIndexHover: 1001,
                    zIndexActive: 1002
                });

                this._prevObjectId = objId;

                this.balloon.events.add('close', () => {
                    this.objectManager.objects.setObjectOptions(this._prevObjectId, {
                        strokeColor: this.options.get('strokeColor'),
                        fillOpacity: this.options.get('fillOpacity'),
                        strokeWidth: this.options.get('strokeWidth'),
                        zIndex: 1
                    });

                    this._prevObjectId = null;
                });
            }
        });

        polygonmap.setMap(myMap);

        // const objectManager = new ObjectManager();

        // data.features = data.features.map((feature, i) => {
        //     feature.id = `d${i}`;

        //     return feature;
        // });

        // objectManager.add(data);
        // objectManager.objects.options.set('preset', 'islands#redCircleDotIcon');
        // myMap.geoObjects.add(objectManager);
    });
});
