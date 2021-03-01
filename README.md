# Getting Started with articles

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## How to start

Go to project directory.
Open up 2 terminals.


#### In terminal 1, run:

```js

cd  frontend

npm  install  // First time only

npm  start

```
Client now runs on localhost:8080


#### In terminal 2, run:
  
```js

cd  backend

npm  install  // First time only

npm  run  server

```
Server now runs on localhost:9000



#### .env

Create a .env file in backend directory and configure it as below for localhost.
Dont forget to change username, password and secret.

```js

ACCESS_TOKEN_SECRET=secret
HOST=localhost
USER=username
PASSWORD=password
DB=articledb
ORIGIN=http://localhost:8080
SERVER=http://localhost:9000/api/v1/

```

#### Database

login to mysql workbench or something else with same credentials from .env and run:

```js

create schema articledb;

create table articledb.users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstName varchar(50) NOT NULL,
	lastName varchar(50) NOT NULL,
	email varchar(50) NOT NULL unique,
	password varchar(255) NOT NULL,
	role varchar(20) NOT NULL,
	createdt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);

create table articledb.articles (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NOT NULL,
	url varchar(255) NOT NULL,
	type varchar(12),
	description varchar(255),
	createdt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP);

```



#### First Login

Use the button "First user to login?" for tests.
Since we need atleast one admin in this application and we use this function to setup the first admin.


#### Enjoy