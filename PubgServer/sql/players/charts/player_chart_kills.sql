select name,
		player_id,
       extract(month from created_at) as Month1,
       sum(kills) as data1
from pubg.match_record mr
join pubg.match m
on mr.match_id = m.match_id
where player_id = $1
group by 1,2,3
order by 3, data1