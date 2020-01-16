--schemas are like different discrete sections of our database
--when we work in a schema, it allows table to have the same name as tables in other schemas
--now every table is accessed by schemaName.tableName
--e.g. garden_book.garden
drop schema if exists ers_project cascade; --Nukes the entire schema. cascade says get rid of everything in the schema
create schema ers_project; --Then recreating it
set schema 'ers_project'; --for rest of script work in this schema


create table users (
	user_id serial primary key,  
	username text, 
	"password" text, --Double quotes is used for DDL not for string data, means "read this exactly as is". If you want to access in the future must use double quotes
	first_name text, 
	last_name text,
	email text
);
insert into users(username, "password", "first_name", "last_name", email)
	values('msbeeman', 'password', 'matthew', 'beeman', 'msbeeman@vcu.edu'),
		  ('andrewqc', 'password', 'andrew', 'qc', 'cantWaitToRoastSomeTrainees@gmail.com'),
		  ('jsmith', 'password', 'john', 'smith', 'jsmith@gmail.com');



create table roles (
	role_id serial primary key,
	role_title text
);
insert into roles(role_title)
	values('trainee'),
	      ('QC'),
	      ('finance-manager');
	    

	     
--Junction/join for users table and roles table
create table user_roles (
	user_id int4 references users (user_id), 
	role_id int4 references roles (role_id), 
	constraint user_roles_PK primary key (user_id, role_id)
);
insert into user_roles
	values(1, 1),
	      (2, 2),
	      (3, 3);



create table reimbursement_type (
	typeId serial primary key,
	type_name text
);
insert into reimbursement_type(type_name)
	values('Loding'),
	      ('Travel'),
	      ('Food'),
	      ('Other');

	
create table reimbursement_status (
	statusID serial primary key,
	status text
);
insert into reimbursement_status(status)
	values('Pending'),
	      ('Approved'),
	      ('Denied');

create table reimbursement (
	reimbursementId serial primary key,
	author int4 references users (user_id),
	amount numeric(10),
	dateSubmitted int4,
	dateResolved int4,
	description text,
	resolver int4 references users (user_id),
	status int4 references reimbursement_status (statusID),
	reimbursement_type int4 references reimbursement_type (typeId)
);


SELECT * FROM users natural join user_roles natural join roles WHERE username = 'msbeeman' AND "password" = 'password';
SELECT * FROM users natural join user_roles natural join roles
SELECT * FROM users natural join user_roles natural join roles where user_id = 1