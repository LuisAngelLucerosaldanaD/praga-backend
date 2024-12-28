create table auth.roles
(
    id              uuid not null primary key,
    name            varchar(50) not null,
    description     varchar(100),
    created_at      timestamp default now() not null,
    updated_at      timestamp default now() not null,
    deleted_at      timestamp null,
    is_delete       boolean default false not null,
    user_creator    uuid not null,
    user_deleter    uuid
);