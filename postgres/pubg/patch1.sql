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


CREATE TABLE pubg.match_attack_damage
(
    attacker_name character varying(50) NOT NULL,
    attacker_account_id character varying(90),
    attacker_team_id bigint,
    attacker_health double precision,
    attacker_x double precision,
    attacker_y double precision,
    attacker_z double precision,
    attack_type character varying(50),
    attack_weapon jsonb,
    attack_vehicle jsonb,
    attack_time timestamp(50) without time zone,
    attack_version bigint,
    victim_name character varying,
    victim_id character varying(90),
    victim_team_id bigint,
    victim_health double precision,
    vimtim_x double precision,
    victim_y double precision,
    victim_z double precision,
    damage_type_category character varying(50),
    damage_reason character varying(50),
    damage double precision,
    damage_causer_name character varying(50),
    damage_time timestamp(50) without time zone,
    damage_version bigint,
    attack_id double precision NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE pubg.match_attack_damage
    OWNER to postgres;


CREATE TABLE pubg.match_player_position
(
    player_id character varying(90) NOT NULL,
    player_x double precision,
    player_y double precision,
    player_z double precision,
    player_rank bigint,
    elapsed_time bigint,
    number_players_alive bigint,
    position_version bigint,
    position_time_stamp timestamp(10) without time zone,
    match_id character varying(90) NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE pubg.match_player_position
    OWNER to postgres;

ALTER TABLE pubg.match_attack_damage
    ADD COLUMN attack_uuid uuid NOT NULL;

ALTER TABLE pubg.match_attack_damage
    ADD PRIMARY KEY (attack_uuid);

ALTER TABLE pubg.match_player_position
    ADD COLUMN match_position_uuid uuid NOT NULL;

ALTER TABLE pubg.match_player_position
    ADD PRIMARY KEY (match_position_uuid);

ALTER TABLE pubg.match_attack_damage
    ADD COLUMN match_id character varying(90) NOT NULL;

CREATE TABLE pubg.match_game_state
(
    match_id character varying(90) COLLATE pg_catalog."default" NOT NULL,
    elapsed_time bigint NOT NULL,
    num_alive_teams bigint,
    num_join_players bigint,
    num_start_players bigint,
    num_alive_players bigint,
    safety_zone_position_x double precision,
    safety_zone_position_y double precision,
    safety_zone_position_z double precision,
    safety_zone_radius double precision,
    poison_gas_warning_position jsonb,
    poison_gas_warning_radius double precision,
    red_zone_position_x double precision,
    red_zone_position_y double precision,
    red_zone_position_z double precision,
    red_zone_radius double precision,
    game_state_time timestamp without time zone,
    game_state_version bigint,
    CONSTRAINT match_game_state_pkey PRIMARY KEY (match_id, elapsed_time)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE pubg.match_game_state
    OWNER to postgres;