CREATE TABLE IF NOT EXISTS airport_lounges
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    lounge_code uuid NOT NULL,
    name varchar NOT NULL,
    airport_code varchar(3) NOT NULL,
    CONSTRAINT airport_lounges_pkey PRIMARY KEY (id),
    CONSTRAINT lounge_code_uq UNIQUE (lounge_code)
);

CREATE TABLE IF NOT EXISTS lounge_guests
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    guest_id uuid NOT NULL,
    lounge_code uuid NOT NULL,
    salutation varchar,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    estimated_exit_time_utc timestamp without time zone NOT NULL,
    updated_at_utc timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    created_at_utc timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    CONSTRAINT lounge_guests_pkey PRIMARY KEY (id),
    CONSTRAINT lounge_code_fk FOREIGN KEY (lounge_code)
        REFERENCES airport_lounges (lounge_code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'ADL','Adelaide Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Adelaide Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'ASP','Alice Springs Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Alice Springs Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'BNE','Brisbane Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Brisbane Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'BNE','Brisbane Domestic Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Brisbane Domestic Business');


INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'BME','Broome Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Broome Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'CNS','Cairns Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Cairns Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name)
SELECT uuid_generate_v1(),'CBR','Canberra Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Canberra Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'CBR','Canberra Domestic Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Canberra Domestic Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'CFS','Coffs Harbour Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Coffs Harbour Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'DRW','Darwin Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Darwin Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'DPO','Devonport Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Devonport Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'EMD','Emerald Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Emerald Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'GLT','Gladstone Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Gladstone Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'OOL','Gold Coast Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Gold Coast Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'HBA','Hobart Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Hobart Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'KGI','Kalgoorlie Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Kalgoorlie Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'KTA','Karratha Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Karratha Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'LST','Launceston Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Launceston Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'MKY','Mackay Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Mackay Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'MEB','Melbourne Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Melbourne Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'MEB','Melbourne Domestic Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Melbourne Domestic Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PER','Perth Qantas Club (T4)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Perth Qantas Club (T4)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PER','Perth Domestic Business (T4)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Perth Domestic Business (T4)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PHE','Port Hedland Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Port Hedland Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'ROK','Rockhampton Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Rockhampton Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'SYD','Sydney Qantas Club (T3)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Sydney Qantas Club (T3)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'SYD','Sydney Domestic Business (T3)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Sydney Domestic Business (T3)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'TMW','Tamworth Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Tamworth Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'TSV','Townsville Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Townsville Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'ADL','Adelaide Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Adelaide Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'BNE','Brisbane International Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Brisbane International Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'DRW','Darwin Qantas Club'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Darwin Qantas Club');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'MEB','Melbourne International Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Melbourne International Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'MEB','Melbourne International First'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Melbourne International First');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PER','Perth International Business (T1)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Perth International Business (T1)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PER','Perth Business (T4)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Perth Business (T4)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'PER','Perth International Transit (T3)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Perth International Transit (T3)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'SYD','Sydney International Business (T1)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Sydney International Business (T1)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'SYD','Sydney International First (T1)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Sydney International First (T1)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'AKL','Auckland International Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Auckland International Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'AKL','Auckland First'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Auckland First');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'WLG','Wellington International Business'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Wellington International Business');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'CHC','Christchurch (partner)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Christchurch (partner)');

INSERT INTO airport_lounges (lounge_code,airport_code,name) 
SELECT uuid_generate_v1(),'ZQN','Queenstown (partner)'
WHERE NOT EXISTS (SELECT * FROM  airport_lounges WHERE name = 'Queenstown (partner)');