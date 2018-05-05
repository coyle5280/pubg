SELECT 
    victim_id,
	victim_name, 
	MODE() WITHIN GROUP (ORDER BY damage_causer_name) as attacker_weapon_mo,
	array_agg(DISTINCT attacker_name) as attackers,
	array_agg(DISTINCT damage_causer_name) as attacker_weapons,
	array_agg(DISTINCT damage_reason) as attack_spots,
	MODE() WITHIN GROUP (ORDER BY damage_reason) as attack_spots_mo,
	count(*) as round_hits
FROM  
    pubg.match_attack_damage mad
Join
	pubg.player p
On
	mad.victim_id = p.player_id
where
	match_id = $1
And
	damage_type_category != 'Damage_BlueZone'
And
	victim_id = $2
GROUP BY victim_id, victim_name