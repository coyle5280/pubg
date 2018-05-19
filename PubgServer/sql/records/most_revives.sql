Select 
    mr.name as most_revives_name,
    mr.revives
from 
    pubg.match_record mr
join 
    pubg.match m
on
    mr.match_id = m.match_id
where 
    mr.revives = (
        select 
            Max(revives) as revives 
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
    mr.revives