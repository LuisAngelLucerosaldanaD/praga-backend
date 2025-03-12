create table if not exists auth.logged_users
(
    id           bigserial primary key   not null,
    user_id      uuid                    not null,
    ip_request   inet                    not null,
    coordinates  point                   not null,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    deleted_at   timestamp               null,
    is_delete    boolean   default false not null,
    user_creator uuid                    not null,
    user_deleter uuid
);