select name,
		player_id,
       extract(month from created_at) as month1,
       sum(kills) as data1
from pubg.match_record mr
join pubg.match m
on mr.match_id = m.match_id
group by 1,2,3
order by 3, data1