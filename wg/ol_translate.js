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

const vector = new VectorLayer({
    background: 'white',
    source: new VectorSource({
      url: 'https://openlayers.org/data/vector/us-states.json',
      format: new GeoJSON(),
    }),
});

const select = new Select();

const translate = new Translate({
  features: select.getFeatures(),
});

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
    zoom: 3
  })
});
