import './style.css';
import {Map, View} from 'ol';
import OSM from 'ol/source/OSM';

import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

const vectorSource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
      return (
        'https://ahocevar.com/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox=' +
        extent.join(',') +
        ',EPSG:3857'
      );
    },
    strategy: bboxStrategy,
  });
  
const vector = new VectorLayer({
    source: vectorSource,
    style: new Style({
        stroke: new Stroke({
            color: 'rgba(0, 0, 255, 0.5)',
            width: 2,
        }),
    }),
});  

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vector
  ],
  view: new View({
    center: [-8908887, 5381918],
    maxZoom: 19,
    zoom: 14
  })
});
