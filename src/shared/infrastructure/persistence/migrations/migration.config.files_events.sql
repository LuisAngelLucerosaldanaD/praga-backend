create table if not exists config.files_events
(
    id           uuid primary key        not null,
    type_id      int4                    not null,
    event_id     uuid                    not null,
    file_id      uuid                    not null,
    created_at   timestamp default now() not null,
    updated_at   timestamp default now() not null,
    deleted_at   timestamp               null,
    is_delete    boolean   default false not null,
    user_creator uuid                    not null,
    user_deleter uuid
);