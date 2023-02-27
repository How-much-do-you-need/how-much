drop table how_button;

drop table how_product;

drop table how_category;

drop table how_member;

create table how_category
(
    cat_no   int auto_increment
        primary key,
    cat_name varchar(50) null
);

create table how_member
(
    ID     varchar(100)                         not null comment '아이디'
        primary key,
    PWD    varchar(100)                         not null comment '비밀번호',
    NNAME  varchar(50)                          not null comment '닉네임',
    SIDATE datetime default current_timestamp() not null comment '생성일',
    NAME   varchar(40)                          not null comment '이름',
    PNUM   varchar(30)                          not null comment '휴대폰 번호',
    BIRTH  date                                 null comment '생년월일',
    GENDER char     default '0'                 not null comment '성별',
    constraint key_name
        unique (PNUM)
);

create table how_product
(
    prod_no   int auto_increment
        primary key,
    prod_name varchar(50)  not null,
    price     int          not null,
    cont      varchar(255) not null,
    id        varchar(50)  not null,
    cat_no    int          not null,
    path      varchar(500) not null,
    constraint product_category
        foreign key (cat_no) references how_category (cat_no),
    constraint product_member
        foreign key (id) references how_member (ID)
);

create table how_button
(
    push_check tinyint(1) default 0 not null,
    prod_no    int                  not null,
    id         varchar(100)         not null,
    primary key (id, prod_no),
    constraint button_member
        foreign key (id) references how_member (ID),
    constraint button_product
        foreign key (prod_no) references how_product (prod_no)
);

