Select 
    mr.name as most_assists_name, 
    mr.assists
from 
    pubg.match_record mr
join 
    pubg.match m
on
    mr.match_id = m.match_id
where 
    mr.assists = (
        select 
            Max(assists) as assists 
        from 
            pubg.match_record
    )
And 
    m.game_mode = $1
group by 
    mr.name,
    mr.assists