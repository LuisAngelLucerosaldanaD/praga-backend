create table config.tickets
(
    id            uuid                    not null primary key,
    user_id       uuid                    not null,
    place_id      uuid                    not null,
    transaction   uuid                    not null,
    amount        money                   not null,
    status        int                     not null,
    promoter_code varchar(50)             not null,
    created_at    timestamp default now() not null,
    updated_at    timestamp default now() not null,
    is_delete     boolean   default false not null,
    user_creator  uuid                    not null,
    deleted_at    timestamp,
    user_deleter  uuid
);