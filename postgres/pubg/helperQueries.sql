--SELECT * FROM pubg.match_record where player_id = 'account.b528e5b410294a45821dd8678d2acb9c' limit 1

--delete from pubg.match where match_id = '452f1cc3-e2af-48bf-9f5b-51fee645ba46'

-- delete from pubg.match_record where match_id = '452f1cc3-e2af-48bf-9f5b-51fee645ba46'

--delete from pubg.match where match_id = 'ba6b51f0-58f5-4702-929b-e7884f18cc10'

--delete from pubg.match_record where match_id = 'ba6b51f0-58f5-4702-929b-e7884f18cc10'


--delete from pubg.match_attack_damage where match_id = '452f1cc3-e2af-48bf-9f5b-51fee645ba46'

--delete from pubg.match_player_position where match_id = '452f1cc3-e2af-48bf-9f5b-51fee645ba46'

select Sum(damage) as total_damage, damage_causer_name from pubg.match_attack_damage where attacker_account_id in ('account.4c6f9196c2324007b3b25c330b75fc76', 'account.b528e5b410294a45821dd8678d2acb9c', 'account.d3a793b22577494b8ceb696c7e750ec0', 'account.dabd3eddfda0462d9f881260b26d8eae') group by damage_causer_name order by total_damage DESC

select Sum(damage) as total_damage, damage_causer_name from pubg.match_attack_damage where victim_id in ('account.4c6f9196c2324007b3b25c330b75fc76', 'account.b528e5b410294a45821dd8678d2acb9c', 'account.d3a793b22577494b8ceb696c7e750ec0', 'account.dabd3eddfda0462d9f881260b26d8eae') group by damage_causer_name order by total_damage DESC

Select 
	Avg(kills) as avg_kills, 
	Avg(dbnos) as avg_dbnos, 
	Avg(assists) as avg_assists,
	Avg(damage_dealt) as avg_damage_dealt,
	Avg(head_shot_kills) as avg_head_shot_kills,
	Avg(heals) as avg_heals,
	Avg(boosts) as avg_boosts,
	Max(longest_kill) as longest_kill,
	Max(kills) as most_kills_in_any_match,
	Max(kill_streaks) as highest_kill_streak,
	Max(revives) as most_revives_in_match,
	Max(heals) as most_heals_in_match,
	Max(boosts) as most_boosts,
	Max(ride_distance) as longest_ride,
	Sum(vehicle_destroys) as total_vehicles_destroyed
FROM
	pubg.match_record
Where
	player_id = 'account.b528e5b410294a45821dd8678d2acb9c'



SELECT 
    attacker_account_id, attacker_name, MODE() WITHIN GROUP (ORDER BY damage_causer_name) 
FROM  
    pubg.match_attack_damage mad
Join
	pubg.player p
On
	mad.attacker_account_id = p.player_id
where
	match_id = 'c4f9ccc2-4208-4c2e-9e54-b03269d65322'
And
	damage_causer_name != 'na'
And
	attacker_account_id = 'account.b528e5b410294a45821dd8678d2acb9c'
GROUP BY attacker_account_id, attacker_name


SELECT 
    attacker_account_id,
	attacker_name, 
	MODE() WITHIN GROUP (ORDER BY damage_causer_name) as weapon,
	array_agg(DISTINCT victim_name),
	array_agg(DISTINCT damage_causer_name),
	array_agg(DISTINCT damage_reason),
	MODE() WITHIN GROUP (ORDER BY damage_reason) as favorite_spot,
	count(*) as round_hits
FROM  
    pubg.match_attack_damage mad
Join
	pubg.player p
On
	mad.attacker_account_id = p.player_id
where
	match_id = 'c4f9ccc2-4208-4c2e-9e54-b03269d65322'
And
	damage_causer_name != 'na'
And
	attacker_account_id = 'account.b528e5b410294a45821dd8678d2acb9c'
GROUP BY attacker_account_id, attacker_name


SELECT 
 	*
FROM  
    pubg.match_attack_damage mad
Join
	pubg.player p
On
	mad.victim_id = p.player_id
where
	match_id = 'c4f9ccc2-4208-4c2e-9e54-b03269d65322'
And
	damage_causer_name != 'na'
And
	victim_id = 'account.b528e5b410294a45821dd8678d2acb9c'
order by attack_time