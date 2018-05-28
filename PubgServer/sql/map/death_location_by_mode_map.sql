Select 
	mad.vimtim_x as x,
	mad.victim_y as y,
	mad.damage_type_category,
	mad.damage_reason,
	mad.damage,
	mad.damage_causer_name
from 
	pubg.match_attack_damage mad
JOIN 
	pubg.match m
ON
	m.match_id = mad.match_id
where 
	mad.victim_health = mad.damage
And
	mad.victim_id = $1
And 
	mad.damage != 0
And
	m.game_mode = $2
And
	m.map_name = $3