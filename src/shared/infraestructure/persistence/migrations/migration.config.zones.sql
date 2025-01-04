create table config.zones
(
    id           uuid                    not null primary key,
    name         varchar(50)             not null,
    description  varchar(255)            not null,
    type         int                     not null,
    location_id  uuid                    not null,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    is_delete    boolean   default false not null,
    deleted_at   timestamp,
    user_creator uuid                    not null,
    user_deleter uuid
);