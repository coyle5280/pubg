SELECT m.map_name,
         m.match_id,
         m.created_at AS created_at,
         m.duration AS duration,
         m.game_mode AS game_mode,
         Max(mr.win_place) AS finish
FROM pubg.match m
JOIN pubg.match_record mr
    ON m.match_id = mr.match_id
GROUP BY  m.match_id
ORDER BY  created_at desc