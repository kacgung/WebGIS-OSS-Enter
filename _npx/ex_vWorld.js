import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

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
    center: [14139375, 4507391],
    zoom: 13
})
});
