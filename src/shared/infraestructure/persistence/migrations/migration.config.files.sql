create table if not exists config.files
(
    id           uuid primary key,
    name         varchar(150)  not null,
    path         varchar(500) not null,
    format       int          not null,
    hash         varchar(255) not null,
    size         int          not null,
    created_at   timestamp    not null default now(),
    updated_at   timestamp    not null default now(),
    deleted_at   timestamp,
    is_deleted   boolean      not null default false,
    user_creator uuid         not null,
    user_deleter uuid
);