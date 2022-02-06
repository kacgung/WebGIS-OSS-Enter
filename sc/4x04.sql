SELECT *
FROM stores;

SELECT *
FROM stores
WHERE brand='이마트';

SELECT COUNT(nam)
FROM stores
WHERE addr like '%영등포구%';

SELECT brand, COUNT(nam) as "점포수"
FROM stores
GROUP BY brand;

SELECT brand, AVG(char_length(nam)), STDDEV(char_length(nam))
FROM stores GROUP BY brand;

SELECT ST_AsText(geom)
FROM firestation;

SELECT link_id, ST_Length (geom)
FROM road_link_geographic;

SELECT link_id, ST_Length(ST_Transform(geom,5179))
FROM road_link_geographic;

SELECT ufid, ST_Area(ST_Transform(geom,5179))
FROM building
LIMIT 100;

SELECT ufid, ST_Area(geom)
FROM building
LIMIT 100;

ALTER TABLE stores
 ADD Column buffer geometry(Polygon,4326);

UPDATE stores
SET buffer=ST_Transform(ST_Buffer(geom, 30), 4326);

SELECT ST_AsGeoJSON(ST_Transform(geom, 4326))
FROM stores;

SELECT ST_AsGML(geom) FROM stores;

SELECT ST_NPoints(geom) as num_point
FROM road_link2
ORDER BY num_point DESC
limit 100;

SELECT shop.nam as "매장명", metro.nam as "인근역"
FROM stores as shop, subway_station as metro
WHERE ST_Intersects(ST_Buffer(shop.geom, 500), metro.geom);

SELECT shop.nam as "매장명", metro.nam as "인근역"
FROM stores as shop, subway_station as metro
WHERE shop.addr LIKE '%영등포%'
 AND ST_Intersects(ST_Buffer(shop.geom, 500), metro.geom);
