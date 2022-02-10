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
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states', 'TILED': true},
                serverType: 'geoserver', 
                transition: 0
            })
        })        
    ],
    view: new View({
        center: [0, 0],
        zoom: 0
    })
});