create table if not exists config.places
(
    id             uuid primary key,
    name           varchar(50)  not null,
    description    varchar(100) not null,
    event_id       uuid         not null,
    price          money        not null,
    slots          int          not null,
    stock          int          not null,
    pre_sale_price money        not null,
    created_at     timestamp    not null default now(),
    updated_at     timestamp    not null default now(),
    deleted_at     timestamp,
    is_deleted     boolean      not null default false,
    user_creator   uuid         not null,
    user_deleter   uuid
);

create index if not exists places_event_id_index
    on config.places (event_id);

alter table config.places
    add constraint fk_places_event_id
        foreign key (event_id) references config.events (id);

alter table config.places
    add constraint fk_places_user_creator
        foreign key (user_creator) references auth.users (id);

alter table config.places
    add constraint fk_places_user_deleter
        foreign key (user_deleter) references auth.users (id);