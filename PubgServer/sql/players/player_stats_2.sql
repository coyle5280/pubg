SELECT COUNT(*) as win_count
FROM pubg.match_record
WHERE player_id = $1
        AND win_place = 1