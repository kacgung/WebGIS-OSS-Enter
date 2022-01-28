# 오픈소스 GIS 서비스 개발자 (입문)
> (출처) '오픈소스 GIS 서비스 개발자 입문' 과정, `공간정보아카데미` (http://lxsiedu.or.kr), `OSGeo한국어지부` (https://www.osgeo.kr/)<br/>
> 본 자료는 모두 Creative Commons License CC-BY-NC을 따릅니다.<br/>
> 본 교재에서 사용하는 샘플 데이터 셋은 실제 정보와 다르므로 교육용 이외에는 사용할 수 없습니다.

본 교육은 `The True Size of… `(https://thetruesize.com)와 유사한 사이트를 처음부터 끝까지 `오픈소스 GIS`로 만들어 보는 것입니다.

- [오픈소스 GIS](#오픈소스-GIS)
- [공간데이터 다루기 (QGIS)](#공간데이터-다루기-QGIS)
- [공간 DBMS 구축 (PostGIS)](#공간-DBMS-구축-PostGIS)
- [공간데이터 배포 (GeoServer)](#공간데이터-배포-GeoServer)
- [웹 GIS 서비스 구현 (OpenLayers)](#웹-GIS-서비스-구현-OpenLayers)

이렇게 데이터부터 웹까지, 공간정보 웹 서비스에 필요한 내용을 사례중심으로 전부 훑어 보는 것이 본 과정의 목표입니다. 더 자세한 기술적인 정보가 필요하신 분은 심화과정을 들어주세요.

<br/>

## 오픈소스 GIS

<br/>

## 공간데이터 다루기 (QGIS)

<br/>

## 공간 DBMS 구축 (PostGIS)

<br/>

## 공간데이터 배포 (GeoServer)

<br/>

## 웹 GIS 서비스 구현 (OpenLayers)

<br/>

- [Quick Start](#Quick-Start)
- [WMS, GWC](#WMS-GWC)
- [WFS, CORS](#WFS-CORS)
- [Interaction](#Interaction)
- [Truesize](#Truesize)

<br/>

### Quick Start
`OpenLayers`는 간단히 말해 웹에 지도를 붙여주는 라이브러리입니다.
`OpenLayers`가 자체적으로 지도를 제공하는 것은 아니고, `OSM(Open Street Map), Google Map, 네이버지도, Vworld` 등에서 제공하는 지도데이터를 받아 이를 웹에서 자유롭게 이동, 확대 등이 가능하도록 기능을 제공합니다.<br/><br/>
먼저 다음을 참고하여 무작정 지도를 띄워 보세요.<br/>
http://openlayers.org/en/latest/doc/quickstart.html<br/><br/>

소스코드를 Notedpad++와 같은 편집기로 복붙해서 `quickstart.html`라는 파일명으로 저장하세요. `quickstart.html`를 실행하면 지도가 보입니다.</br></br>

OpenLayers는 JavaScript 모듈을 사용하여 작성하는 것을 더 권장합니다. 다음과 같이 Node.js 기반의 개발환경을 구성하세요. [Building an OpenLayers Application tutorial](https://openlayers.org/en/latest/doc/tutorials/bundle.html) </br></br>

Git이 없다면 설치하세요. https://gitforwindows.org</br>
새 프로젝트 폴더를 만드세요. `mkdir new-project && cd new-project`</br>
OpenLayers 프로젝트로 초기화 하세요. </br>
```
npx create-ol-app
```
새 프로젝트 서버를 실행하세요. </br>
```
npm start
```
다음(http://localhost:3000)에 접속하여 결과물을 확인하세요.</br></br>

다음 미션에 도전해 보세요.

>시작 위치가 우리나라가 되게 수정해보세요. </br>
우리나라가 더 잘 보이게 확대해서 시작되게 해보세요. </br>
지도 영역도 변경해 보세요. </br>

</br>

`main.js`
```javascript
  view: new View({
    center: [14135193, 4512192],
    zoom: 6
  })
```
</br>

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

### WMS, GWC

<br/>

### WFS, CORS

<br/>

### Interaction

<br/>

### Truesize
