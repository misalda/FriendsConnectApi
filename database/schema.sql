CREATE TABLE IF NOT EXISTS userProfile
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    maxContactsPerMeeting int NOT NULL,
    createdAtUtc timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    CONSTRAINT user_profile_pkey PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS userAvailability
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    dayOftheWek int NOT NULL,
    startTime timestamp NOT NULL,
    endtime timestamp NOT NULL,
    userProfileId bigint,
    CONSTRAINT userProfileId_fk FOREIGN KEY (userProfileId)
        REFERENCES userProfile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
CREATE TABLE IF NOT EXISTS friendRequest
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    fromUserProfileId bigint not NULL,
    toUserProfileId bigint not NULL,
    requestStatus int not NULL,
    createdAtUtc timestamp without time zone default (now() at time zone 'utc') NOT NULL,
    CONSTRAINT fromUserProfileId_fk FOREIGN KEY (fromUserProfileId)
        REFERENCES userProfile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
    CONSTRAINT toUserProfileId_fk FOREIGN KEY (toUserProfileId)
        REFERENCES userProfile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
CREATE TABLE IF NOT EXISTS friendsEvent
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    startDateTime timestamp NOT NULL,
    endDateTime timestamp NOT NULL,
    createdAtUtc timestamp without time zone default (now() at time zone 'utc') NOT NULL
);
CREATE TABLE IF NOT EXISTS friendsEventGuests
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    userProfileId bigint not NULL,
    friendsEventId timestamp NOT NULL,
    CONSTRAINT userProfileId_fk FOREIGN KEY (userProfileId)
        REFERENCES userProfile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
    CONSTRAINT friendsEventId_fk FOREIGN KEY (friendsEventId)
        REFERENCES friendsEvent (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
