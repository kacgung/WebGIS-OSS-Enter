# 캔버스 초기화
QgsProject.instance().removeAllMapLayers()
iface.mapCanvas().refresh()

# 타이머 준비
import timeit
start = timeit.default_timer()
pre = start

# 도로 읽기
roadLayer = iface.addVectorLayer("/Data/road_link2.shp", "", "ogr")

crr = timeit.default_timer()
print (u"도로 읽기 : {}ms".format(int((crr - pre)*1000)))
pre = crr

# 8차선 이상 선택
roadLayer.selectByExpression('"LANES" >= 8', QgsVectorLayer.SetSelection)
count = roadLayer.selectedFeatureCount()
print("selected features = " + str(count))

crr = timeit.default_timer()
print (u"8차선 이상 선택 : {}ms".format(int((crr - pre)*1000)))
pre = crr

# 500미터 버퍼 분석
bufferLayer = QgsVectorLayer("Polygon?crs=epsg:5186&index=yes", "buffer500", "memory")
provider = bufferLayer.dataProvider()
bufferLayer.startEditing()
bufferFeature = QgsFeature(provider.fields())

features = roadLayer.selectedFeatures()
for feature in features:
    bufferFeature.setGeometry(feature.geometry().buffer(500, 8))
    provider.addFeatures([bufferFeature])

bufferLayer.commitChanges()
QgsProject.instance().addMapLayer(bufferLayer)
iface.mapCanvas().refresh()

crr = timeit.default_timer()
print (u"500미터 버퍼 분석 : {}ms".format(int((crr - pre)*1000)))
pre = crr

# 지하철역 읽기
stationLayer = iface.addVectorLayer("/Data/subway_station.shp", "", "ogr")

crr = timeit.default_timer()
print (u"지하철역 읽기 : {}ms".format(int((crr - pre)*1000)))
pre = crr

# 버퍼 안 지하철역 선택
for iFeature in bufferLayer.getFeatures():
    for sfeature in stationLayer.getFeatures():
        if sfeature.geometry().within(iFeature.geometry()):
            stationLayer.select(sfeature.id())

crr = timeit.default_timer()
print (u"버퍼 안 지하철역 선택 : {}ms".format(int((crr - pre)*1000)))
pre = crr

# 결과 파일 저장
QgsVectorFileWriter.writeAsVectorFormat( stationLayer, "/Data/Result.shp", "cp949", stationLayer.crs(), "ESRI Shapefile", 1)
iface.addVectorLayer("/Data/Result.shp", "result", "ogr")

crr = timeit.default_timer()
print (u"결과 파일 저장 : {}ms".format(int((crr - pre)*1000)))

print (u"========================")
print (u"전체 수행시간 : {}ms".format(int((crr - start)*1000)))