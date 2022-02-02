# 웹 GIS 서비스 구현 (OpenLayers)

<br/>

- [Quick Start](#Quick-Start)
- [WMS](#WMS)
- [GWC](#GWC)
- [WFS](#WFS)
- [Interaction](#Interaction)
- [Truesize](#Truesize)

<br/>
<br/>

## Quick Start

<br/>

`OpenLayers`는 간단히 말해 웹 페이지에 지도를 붙여주는 라이브러리입니다. `OpenLayers`가 자체적으로 지도를 제공하는 것은 아니고, `OSM(Open Street Map), Google Map, Naver Map, Kakao Map, Vworld, GeoServer` 등에서 제공하는 지도데이터를 받아 이를 웹에서 자유롭게 이동, 확대 등이 가능하도록 기능을 제공합니다.

<br/>

먼저 다음을 참고하여 무작정 지도를 띄워 보세요.   
http://openlayers.org/en/latest/doc/quickstart.html

<br/>

소스코드를 [VSCode(Visual Studio Code)](https://code.visualstudio.com) 와 같은 편집기로 복붙(복사하고 붙여넣기)해서 `quickstart.html`라는 파일명으로 저장하세요. `quickstart.html`를 실행하면 지도가 보입니다. 여러분이 처음으로 만든 `WebGIS` 어플리케이션을 확인하세요.

<br/>

웹 페이지에 지도를 붙이기 위해서 다음 세 가지가 필요함을 확인하세요.

> 1. Include OpenLayers 
> 2. Create map container
> 3. JavaScript to create a simple map

<br/>

OpenLayers는 JavaScript 모듈을 사용하여 작성하는 것을 더 권장합니다. 다음과 같이 Node.js 기반의 개발환경을 구성하세요.   
[Building an OpenLayers Application tutorial](https://openlayers.org/en/latest/doc/tutorials/bundle.html)

<br/>

`Code Editor` 가 없다면 [VSCode(Visual Studio Code)](https://code.visualstudio.com)를 설치하세요.   
[Git](https://gitforwindows.org)이 없다면 설치하세요.

<br/>

새 프로젝트 폴더를 만드세요.
```
mkdir 'new-project' && cd 'new-project'
```
OpenLayers 프로젝트로 초기화 하세요.
```
npx create-ol-app
```
새 프로젝트 서버를 실행하세요.
```
npm start
```

<br/>

다음에 접속하여 결과물(Quick Start)을 확인하세요.   
http://localhost:3000

<br/>

다음 과제에 도전해 보세요.

>시작 위치가 우리나라가 되게 수정해보세요.   
우리나라가 더 잘 보이게 확대해서 시작되게 해보세요.   
지도(map) 영역도 변경해 보세요.   

<br/>

`main.js`
```javascript
  view: new View({
    center: [14135193, 4512192],
    zoom: 6
  })
```

<br/>

`style.css`
```css
#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 90%;
}
```

<br/>
<br/>

## WMS

<br/>

다음 예제를 참고하여 우리 WebGIS 어플리케이션(Quick Start)에 WMS 레이어를 하나 더 추가해보세요.   
https://openlayers.org/en/latest/examples/wms-tiled.html <br/><br/>

TileWMS Source 생성을 위해서 TileWMS 클래스를 Import 하세요.

```javascript
import TileWMS from 'ol/source/TileWMS';
```
<br/>

TileWMS Source와 TileLayer를 생성하고, Map에 등록하세요.

```javascript
  new TileLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: {'LAYERS': 'topp:states', 'TILED': true},
      serverType: 'geoserver',
      transition: 0,
    }),
  }),
```
<br/>

Javascript 문법에 맞도록 그리고 오탈자가 없도록 유의하세요. 예를 들어, `","` 에 유의하세요.<br/><br/>   

WMS 레이어(`topp:states`)가 우리 WebGIS(http://localhost:3000)에 추가된 것을 웹브라우저([Chrome](https://www.google.co.kr/intl/ko/chrome/))에서 확인하세요. 개발자 도구(`F12`) 네트워크 분석을 통해서 응답과 요청 등을 확인해보세요.

<br/>
<br/>

## GWC

<br/>

다음을 참고해서 우리가 추가한 WMS 레이어를 GWC([GeoWebCache](https://docs.geoserver.org/stable/en/user/geowebcache/index.html))로 구현해보세요.
https://docs.geoserver.org/latest/en/user/geowebcache/using.html

<br/>

```javascript
  new TileLayer({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url: 'https://ahocevar.com/geoserver/gwc/service/wms',
      params: {
        LAYERS: 'topp:states', 
        TILED: true,
        SRS: 'EPSG:3857',
      },
      serverType: 'geoserver',
      transition: 0,
    }),
  }),    
```

GWC 적용에 대해서 요청 URI(`/gwc/service`)와 그리드셋(`SRS: 'EPSG:3857'`) 정의를 이해하세요.   
개발자도구 네트워크분석을 통해서 요청과 응답 등을 살펴보세요.

<br/>
<br/>

## WFS

<br/>

다음을 참고해서 WFS 레이어를 우리 WebGIS에 추가해보세요.   
https://openlayers.org/en/latest/examples/vector-wfs.html

<br/>

WFS 레이어 생성에 필요한 클래스를 Import하세요.   

```javascript
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
```
<br/>

우리 WebGIS에 추가할 WFS 레이어를 생성하세요.

```javascript
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
```

<br/>

`Map`에 WFS 레이어를 추가하세요.

```javascript
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vector //WFS 레이어 추가
  ],
```

<br/>

WFS 레이어가 추가된 것을 확인해보세요. 네트워크 분석을 통해서 요청과 응답 등을 확인해보세요. 네트워크 분석을 통해서 GeoJSON 데이터를 확인해보세요.

<br/>

WFS 레이어를 변경해보세요.

```javascript
const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'https://ahocevar.com/geoserver/wfs?service=WFS&' +
      // 'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
      'version=1.1.0&request=GetFeature&typename=topp:states&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
});
```

<br/>
<br/>

## Interaction

<br/>

다음을 참고해서 `Interaction` 을 추가하고, `'Translate Features'` 를 구현하세요.   
https://openlayers.org/en/latest/examples/translate-features.html

<br/>

필요한 `Interationt` 클래스를 Import 하고, 생성하세요.

```javascript
import {Select, Translate, defaults as defaultInteractions} from 'ol/interaction';

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
```

<br/>

`Map` 에 `Interation` 을 추가하세요.

```javascript
const map = new Map({
  interactions: defaultInteractions().extend([select, translate]),
  target: 'map',
  
```
<br/>

WFS 레이어를 변경해보세요.

<br/>
<br/>

## Truesize

<br/>

다음을 참고해서 `The True Size of` 를 구현해보세요.   
https://openlayers.org/en/latest/examples/tissot.html

<br/>

피쳐 이동 시 위도 변화 비율 계산해서 피쳐 지오메트리 스케일을 변경하도록 구현하세요.

```javascript
import {getCenter} from 'ol/extent';
import {transform} from 'ol/proj';

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
```


<br/><br/>

The End