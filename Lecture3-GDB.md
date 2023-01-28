# 공간 DBMS 구축 (PostGIS)

<br>

> 이제 공간정보를 DBMS에 넣어 효과적으로 관리하는 방법을 배워보도록 하겠습니다.

- [세계지도 데이터 받기](#세계지도-데이터-받기)

<br>

## 세계지도 데이터 받기

<br>

샘플데이터 정도는 ESRI Shape 파일로도 잘 서비스할 수 있지만, 
상업적인 규모의 서비스를 하기 위해서는 공간정보를 지원하는 DBMS를 이용하는 것이 좋습니다.
공간 DBMS로 오늘 배우는 것은 PostGIS 이지만, 이 외에도 Oracle Spatial, MS SQL Server, MySQL, SpatialLite 등 
여러가지 주요 DBMS가 공간정보를 다룰 수 있습니다.

![](img/2023-01-29-01-25-32.png)

출처: https://www.slideshare.net/gis_todd/postgis-and-spatial-sql 

<br>

먼저 PostGIS의 기반 DBMS인 PostgreSQL에 확장 기능인 PostGIS가 적용되도록 하겠습니다.

PostgreSQL을 관리하는 편리한 도구인 pgAdmin를 사용하겠습니다.
[윈도우] 버튼을 누르고 pgadmin을 입력하면 쉽게 찾을 수 있습니다.
pgAdmin 버튼을 눌러 시작하십시오.

실습 암호는 'postgres' 입니다. 현업에서는 철저하게 보안 암호를 적용 바랍니다.

![](img/2023-01-29-01-48-50.png)

<br>

공간 DBMS를 만들어 보겠습니다. 'Databases' 항목을 오른쪽 클릭하고 'Create > Database...' 메뉴를 선택합니다.

![](img/2023-01-29-01-50-55.png)

<br>

새로 만들 Database의 이름을 osgeo라 하겠습니다.
Properties 탭의 Name 항목에 osgeo를 입력해 주세요.
그리고 Definition 탭으로 가셔서 Encoding: UTF-8, Template: template0, Collation: C, Character type: C 를 선택하시고 [OK]를 눌러 주세요.
만약 Collation, Character type에 C가 아닌 다른 값을 선택하면 한글의 정렬과 검색에서 문제가 생길 수도 있으니 주의하세요.

![](img/2023-01-29-01-55-01.png)

![](img/2023-01-29-01-56-28.png)

<br>

이렇게 만들어진 Database가 바로 공간자료를 다룰 수 있는 것은 아니고 한 단계를 더 거쳐야 합니다.
Databases 아래의 방금 만든 osgeo를 선택하고, [SQL] 버튼을 눌러 Query 창을 엽니다.

SQL Editor에 ```create extension postgis;```  라 입력하고 Run 버튼을 누르거나 [F5] 펑션키를 눌러 실행합니다.
이제 이 osgeo Database는 공간정보를 다룰 수 있게 되었습니다.

```
create extension postgis;
```

![](img/2023-01-29-02-01-23.png)

'Extensions'에 'postgis'가 들어가 있고, 'Schemas / public / Functions' 에 펑션수가 700개가 넘게 되고, Tables에 spatial_ref_sys 라는 테이블이 생겨 있음을 보면, 아~ 공간정보를 담을 준비가 되었구나 하시면 됩니다.

<br>

spatial_ref_sys 테이블은 좌표계 정보를 담고 있는 매우 중요한 테이블입니다.
내용을 잠깐 살펴보겠습니다.
spatial_ref_sys 테이블을 선택 후 툴바에서 표 모양 아이콘을 누르면 내용을 볼 수 있습니다.
 
srid 컬럼에 숫자들이 보이고, auth_name에 EPSG라는 글자들이 보입니다. proj4text라는 컬럼에도 어디서 본 듯한 내용들이 들어있네요.
앞 시간에 배운 좌표계 정보가 들어 있다는 것을 느끼실 수 있지요?

QGIS에서 문제가 되었던 EPSG:5174 좌표계 정보를 조회해 보겠습니다.
Query 창에 SQL을 입력해 조회할 수 있습니다.
다음 SQL을 입력하고 실행해 봅시다.

```
select proj4text from spatial_ref_sys where srid = 5174;  
```

결과를 보면 여기서도 +towgs84 인자가 누락되어 있음을 확인할 수 있습니다.

![](img/2023-01-29-02-15-44.png)

<br>

이를 바로잡기 위한 SQL이 미리 만들어져 있어 어렵지 않게 바로잡을 수 있습니다.
다음 링크로 가 보십시오.
http://www.osgeo.kr/205 


이 페이지에서 postgis_korea_epsg_towgs84.sql을 다운로드 받습니다.
Query 창에서 열기 버튼을 눌러 이 SQL 파일을 열고 [F5]눌러 실행하시면 됩니다.

![](img/2023-01-29-02-20-45.png)

<br>

이제 PostGIS에서는 한국 좌표계들이 정상적으로 좌표계 변환이 됩니다.
이렇게 PostGIS를 활성화시키고 한국 좌표계를 정정하는 작업은 새로운 Database를 만들때만 하면 됩니다.


<br>

The End