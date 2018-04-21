CREATE ROLE pubg LOGIN password 'Charlie100!';
CREATE DATABASE pubg ENCODING 'UTF8' OWNER pubg;
CREATE TABLE pubg.match_record
(
    dbnos smallint,
    assists smallint,
    boosts smallint,
    damage_dealt double precision,
    death_type character varying(50),
    head_shot_kills smallint,
    heals smallint,
    kill_place smallint,
    kill_points smallint,
    kill_points_delta double precision,
    kill_streaks smallint,
    kills smallint,
    last_win_points smallint,
    longest_kill smallint,
    most_damage smallint,
    name character varying(50),
    player_id character varying(50),
    revives smallint,
    ride_distance smallint,
    road_kills smallint,
    team_kills smallint,
    time_survived smallint,
    vehicle_destroys smallint,
    walk_distance double precision,
    weapons_acquired smallint,
    win_place smallint,
    win_points smallint,
    win_points_delta double precision,
    match_id character varying(90)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE pubg.match_record
    OWNER to postgres;


CREATE TABLE pubg.match
(
    created_at timestamp without time zone,
    duration smallint,
    game_mode character varying(15),
    patch_version character varying(50),
    shard_id character varying(15),
    stats character varying(25),
    tags character varying(25),
    title_id character varying(20),
    match_id character varying(120),
    telemetry_url character varying(300)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE pubg.match
    OWNER to postgres;

    Alter table pubg.match_record
ALTER COLUMN ride_distance TYPE double precision;