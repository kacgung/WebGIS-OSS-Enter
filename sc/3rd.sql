select st.*
from subway_station as st,
(
 select st_buffer(st_union(geom), 500) as geom
 from road_link2 where lanes >=8
) as  buf
where st_within(st.geom, buf.geom);


select * from subway_station
where gid in
(
select distinct st.gid
from subway_station as st, road_link2 as road
where road.lanes >= 8
  and ST_Distance(st.geom, road.geom) <= 500
);


select * from subway_station
where gid in
(
select distinct st.gid
from subway_station as st, road_link2 as road
where road.lanes >= 8
  and ST_DWithin(st.geom, road.geom, 500)
);