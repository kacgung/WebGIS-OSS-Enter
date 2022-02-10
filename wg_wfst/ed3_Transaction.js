import './style.css';

import { Map, View, Collection } from 'ol';    
import TileLayer from 'ol/layer/Tile';

import { XYZ, Vector, TileWMS } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { GeoJSON, GML, WFS } from 'ol/format';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';

import { Style, Stroke, Fill, Circle } from 'ol/style';
import { DragPan, MouseWheelZoom, Draw, Modify, Snap } from 'ol/interaction';

import $ from 'jquery';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'http://xdworld.vworld.kr:8080/2d/Base/201512/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
      center: [14139375.266574217, 4507391.386530381],
      zoom: 13
  }),
  interactions: [
    new DragPan(),    new MouseWheelZoom()
  ],
});

// Building WMS Layer
let buildingWMSSource = new TileWMS({
  url: '/geoserver/gwc/service/wms',
  params: {
      VERSION: '1.1.1',
      LAYERS: 'korea:building',
      WIDTH: 256,
      HEIGHT: 256,
      CRS: 'EPSG:3857',
      TILED: true
    }
});
let buildingWMSLayer = new TileLayer({
  source: buildingWMSSource,
  opacity: 0.3,
  visible: true

});
map.addLayer(buildingWMSLayer);

// Building Vector > mklink /D htdocs C:\???
let buildingVectorSource = new Vector({
  format: new GeoJSON(),
  url: extent => {
    return '/geoserver/ows?' +
      'service=WFS' +
      '&version=1.1.0' +
      '&request=GetFeature' +
      '&typeName=korea:building' +
      '&srsName=EPSG:3857' +
      '&outputFormat=application/json' +
      '&bbox=' + extent.join(',') + ',EPSG:3857';
  },
  strategy: bboxStrategy
});
let buildingVectorLayer = new VectorLayer({
  source: buildingVectorSource,
  visible: false
});
map.addLayer(buildingVectorLayer);

// Resoultion Changed Event 축척제어
map.getView().on('change:resolution', e => {
  if (map.getView().getZoom() > 16) {
    buildingVectorLayer.setVisible(true);
  } else {
    buildingVectorLayer.setVisible(false);
  }
});

// Draw Feature Vector Layer
let features = new Collection();
let featureOverlay = new VectorLayer({
  source: new Vector({ features: features }),
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.5)'
    }),
    stroke: new Stroke({
      color: 'rgba(55, 155, 55, 0.8)',
      width: 5
    }),
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});
map.addLayer(featureOverlay);

// Draw Interaction
let draw = new Draw({
    type: 'MultiPolygon',
    geometryName: 'geom',
    features: features,
});
map.addInteraction(draw);
draw.setActive(true);
draw.on('drawend', function (e) {
    draw.setActive(false);
    modify.setActive(true);
});
  
// Modify Interaction
let modify = new Modify({
    features: features
});
map.addInteraction(modify);
modify.setActive(false);
  
// Snap Interaction
let snap = new Snap({
    source: buildingVectorSource
});
map.addInteraction(snap);

// transaction
const formatWFS = new WFS();
const formatGML = new GML({
  featureNS: 'http://osgeo.kr/korea',
  featureType: 'korea:building',
  srsName: 'EPSG:3857'
});

const transactWFS = (tType, feature) => {
  let node = "";
  switch (tType) {
    case 'insert':
      node = formatWFS.writeTransaction([feature], null, null, formatGML);
      break;
    case 'update':
      node = formatWFS.writeTransaction(null, [feature], null, formatGML);
      break;
    case 'delete':
      node = formatWFS.writeTransaction(null, null, [feature], formatGML);
      break;
  }
  const dataStr = new XMLSerializer().serializeToString(node); 
  //console.log(dataStr);
  //alert(dataStr);
  $.ajax({
    type: 'POST',
    service: 'WFS',
    url: '/geoserver/ows',
    dataType: 'xml',
    contentType: 'text/xml',
    processData: false,
    data: dataStr
  }).done(() => {
    reset()
  });
};

const reset = () => {
  features.clear();
  buildingVectorSource.refresh();
  buildingWMSSource.updateParams({ '_t': Date.now() });
  modify.setActive(false);
  draw.setActive(true);
};

$('button[name=btnReset]').on('click', reset);

$('button[name=btnInsert]').on('click', e => {
  if (features.getArray().length > 0) {
    transactWFS('insert', features.getArray()[0]);
  } else {
    modify.setActive(false);
    draw.setActive(true);
  }
})