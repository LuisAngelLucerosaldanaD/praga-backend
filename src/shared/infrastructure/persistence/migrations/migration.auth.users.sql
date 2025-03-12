create table auth.users
(
    id              uuid                    not null
        constraint pk_auth_users primary key,
    name            varchar(50)             not null,
    lastname        varchar(50)             not null,
    document        varchar(8)              not null,
    type_document   int                     not null,
    username        varchar(50)             not null
        constraint uq_user_username unique,
    password        varchar(255)            not null,
    email           varchar(100)            not null,
    cellphone       varchar(9)              not null,
    code            varchar(255)            not null,
    points          int                     not null,
    status          integer                 not null,
    role            uuid                    not null,
    failed_attempts integer   default 0     not null,
    birth_date      timestamp               not null,
    picture         uuid                    null,
    block_date      timestamp,
    is_block        boolean   default false not null,
    created_at      timestamp default now() not null,
    updated_at      timestamp default now() not null,
    is_delete       boolean   default false not null,
    user_creator    uuid                    not null,
    deleted_at      timestamp,
    user_deleter    uuid
);

alter table auth.users
    add constraint fk_auth_users_role
        foreign key (role) references auth.roles (id);