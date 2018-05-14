Select 
    mr.name as most_kill_name, 
    mr.kills
from 
    pubg.match_record mr
join 
    pubg.match m
on
    mr.match_id = m.match_id
where 
    mr.kills = (
        select 
            Max(kills) as kills 
        from 
            pubg.match_record
    )
And 
    m.game_mode = $1
group by 
    mr.name,
    mr.kills