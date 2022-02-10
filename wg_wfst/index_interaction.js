import './style.css';

import {Map, View} from 'ol';    
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { defaults as defaultInteractions } from 'ol/interaction.js';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';

const map = new Map({
    target: 'map',
    keyboardEventTarget: document,
    interactions: defaultInteractions().extend([
        new KeyboardPan(), new KeyboardZoom()
    ]),
    layers: [
        new TileLayer({
            source: new OSM()
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 0
    })
});