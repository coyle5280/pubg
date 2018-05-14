Select 
    mr.name as longest_kill_name, 
    mr.longest_kill
from 
    pubg.match_record mr
join 
    pubg.match m
on
    mr.match_id = m.match_id
where 
    mr.longest_kill = (
        select 
			Max(longest_kill) as longest_kill 
		from 
			pubg.match_record mr
		Join
			pubg.match m
		On
			m.match_id = mr.match_id
		Where
			m.game_mode = $1
    	)
And 
    m.game_mode = $1
group by 
    mr.name,
    mr.longest_kill