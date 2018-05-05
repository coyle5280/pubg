SELECT SUM (kills) AS total_kills,
         SUM(dbnos) AS total_dbnpos,
         SUM(assists) AS total_Assists,
         SUM(revives) AS total_Revives,
         SUM(heals) AS total_Heals,
         round(SUM(ride_distance)) AS totalRideDistance,
         round(SUM(walk_distance)) AS total_Walk_Distance,
         SUM(weapons_acquired) AS total_Weapons_Acquired,
         SUM(road_kills) AS total_Road_Kills,
         MAX(damage_dealt) AS max_Damage_Dealt_In_Game,
         MAX(longest_kill) AS longest_Kill,
         Max(kills) AS most_Kills_In_Game,
         Count(*) AS total_Matches
FROM pubg.match_record
WHERE player_id = $1