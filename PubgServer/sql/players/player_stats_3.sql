Select
 Count(*) as total_hits
From pubg.match_attack_damage
where
	victim_id != 'na'
And
	attacker_account_id = $1