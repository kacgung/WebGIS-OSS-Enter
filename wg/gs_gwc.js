import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import TileWMS from 'ol/source/TileWMS';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/geoserver/gwc/service/wms',
            params: {
                LAYERS: 'worldmap:ne_110m_admin_0_countries', 
                TILED: true,
                SRS: 'EPSG:3857',
            },
            serverType: 'geoserver',
            transition: 0,
        }),
    }),    
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
