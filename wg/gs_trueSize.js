import './style.css';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {
  Select,
  Translate,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {fromLonLat} from 'ol/proj';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';

const vector = new VectorLayer({
    background: 'white',
    source: new VectorSource({
      url: function (extent) {
        return (
          '/geoserver/wfs?service=WFS&' +
          'version=1.1.0&request=GetFeature&typename=worldmap:ne_110m_admin_0_countries&' +
          'outputFormat=application/json&srsname=EPSG:3857&' +
          'bbox=' + extent.join(',') + ',EPSG:3857'
        );
      },
      format: new GeoJSON(),
      strategy: bboxStrategy,
    }),
});

import {getCenter} from 'ol/extent';
import {transform} from 'ol/proj';


// Select, Interaction
const select = new Select();

const translate = new Translate({
  features: select.getFeatures(),
});


var cur_lat = null;
translate.on('translatestart', function(evt){
  // 현재위도
  var selected_feature = evt.features.getArray()[0];
  cur_lat = getLatFromFeatureCenter(selected_feature);
  console.log(cur_lat);
});
 
translate.on('translating', function(evt){
  // 이전위도
  var old_lat = cur_lat;
     
  // 현재위도
  var selected_feature = evt.features.getArray()[0];
  cur_lat = getLatFromFeatureCenter(selected_feature);
     
  // scale 적용
  var crr_scale = 1/(cur_lat/old_lat);
  selected_feature.getGeometry().scale(crr_scale);
});

function getLatFromFeatureCenter(feature) {
  var feature_extent = feature.getGeometry().getExtent();
  var center_3857 = getCenter(feature_extent);
  var center_4326 = transform(center_3857, 'EPSG:3857', 'EPSG:4326');
  return Math.cos(center_4326[1] * Math.PI / 180.0); // radian -> degree
}

// Map
const map = new Map({
  interactions: defaultInteractions().extend([select, translate]),
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vector
  ],
  view: new View({
    center: fromLonLat([-100, 38.5]),
    zoom: 2
  })
});
