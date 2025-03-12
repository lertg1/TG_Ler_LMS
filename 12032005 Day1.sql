create database lms_db;
use lms_db;
create table tbl_books(
	book_id int primary key,
    book_title varchar(100) not null,
    author varchar(100),
    ISBN varchar(13),
    category varchar(50)
);
insert into tbl_books values(1, 'Life, Loss, and Love', 'Katie Nicholl', '9781602865266','non fiction');
select * from tbl_books;
insert into tbl_books values(2, 'Marketing in the New Asia', 'Siew Meng Leong, Swee Hoon Ang, Chin Tiong Tan', '9780071184670','business');

create table tbl_users(
	user_id int primary key,
    user_name varchar(100) not null,
	user_password varchar(100) not null,
    user_email varchar(100) not null,
    user_status varchar(10) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

insert into tbl_users (user_id, user_name, user_password, user_email, user_status) values(1, 'lertg','123456','lertg1@gmail.com','active');
select * from tbl_users;
insert into tbl_users (user_id, user_name, user_password, user_email, user_status) values(2, 'john','123456','john@gmail.com','active');
