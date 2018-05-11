Select
 Count(*) as total_shots
From pubg.match_attack_damage
Where
	attacker_account_id = $1