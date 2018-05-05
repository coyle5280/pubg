SELECT 
    attacker_account_id,
	attacker_name, 
	MODE() WITHIN GROUP (ORDER BY damage_causer_name) as weapon,
	array_agg(DISTINCT victim_name) as victims,
    MODE() WITHIN GROUP (ORDER BY victim_name) as favorite_victim,
	array_agg(DISTINCT damage_causer_name) as weapons_used,
	array_agg(DISTINCT damage_reason) as hit_spots,
	MODE() WITHIN GROUP (ORDER BY damage_reason) as favorite_hit_spot,
	count(*) as rounds_on_target
FROM  
    pubg.match_attack_damage mad
Join
	pubg.player p
On
	mad.attacker_account_id = p.player_id
where
	match_id = $1
And
	damage_causer_name != 'na'
And
	attacker_account_id = $2
GROUP BY attacker_account_id, attacker_name