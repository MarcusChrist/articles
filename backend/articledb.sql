create schema articledb;
#drop table articledb.users;
create table articledb.users (id INT AUTO_INCREMENT PRIMARY KEY,
						firstName varchar(50) NOT NULL,
						lastName varchar(50) NOT NULL,
						email varchar(50) NOT NULL unique,
						password varchar(255) NOT NULL,
						role varchar(20) NOT NULL,
						createdt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);

#drop table articledb.articles;
create table articledb.articles (id INT AUTO_INCREMENT PRIMARY KEY,
						name varchar(50) NOT NULL,
						url varchar(255) NOT NULL,
						type varchar(12),
						description varchar(255),
						createdt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);
						
select * from articledb.users;
select * from articledb.articles;
