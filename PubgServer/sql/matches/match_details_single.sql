SELECT num_alive_teams AS totalTeams,
         num_start_players AS totalPlayers
FROM pubg.match_game_state
WHERE match_id = $1
Limit 1