create table if not exists auth.password_history
(
    id           bigserial primary key   not null,
    user_id      uuid                    not null,
    password     varchar(255)            not null,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    deleted_at   timestamp               null,
    is_delete    boolean   default false not null,
    user_creator uuid                    not null,
    user_deleter uuid
);