SELECT m.map_name,
         m.match_id,
         m.created_at AS created_at,
         m.duration AS duration,
         m.game_mode AS game_mode,
         Max(mr.win_place) AS finish,
		 Max(mgs.num_alive_teams) AS totalTeams,
		 mgs.num_start_players AS totalPlayers
FROM pubg.match m
JOIN pubg.match_record mr
    ON m.match_id = mr.match_id
JOIN pubg.match_game_state mgs
	ON mgs.match_id = mr.match_id
GROUP BY  m.match_id, mgs.num_start_players
ORDER BY  created_at desc