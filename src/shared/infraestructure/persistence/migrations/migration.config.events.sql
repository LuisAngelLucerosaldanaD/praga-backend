create table config.events
(
    id               uuid                    not null primary key,
    name             varchar(100)            not null,
    slogan           varchar(500)            not null,
    capacity         int                     not null,
    start_date       timestamp               not null,
    end_date         timestamp               not null,
    publication_date timestamp               not null,
    pre_sale_date    timestamp               not null,
    free_list_date   timestamp               not null,
    created_at       timestamp default now() not null,
    updated_at       timestamp default now() not null,
    is_delete        boolean   default false not null,
    user_creator     uuid                    not null,
    user_deleter     uuid,
    deleted_at       timestamp
);

alter table config.events
    add constraint fk_user_creator
        foreign key (user_creator) references auth.users (id),
    add constraint fk_user_deleter
        foreign key (user_deleter) references auth.users (id);