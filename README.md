# A End-to-End Customer complaints Forum

This app allows customers to create complaints, which can be addressed by agents.

## Important Instruction for running the application

1. Please install all prerequisites mentioned under **Prerequisites** section
2. Please perform deployment steps for Db, server, and client mentioned under **Deployment** section
3. Add multiple agents mentioned under **Add Agents** section
4. Open browser -> http:/localhost:4200 and this should have your application running.

## Prerequisites

* Mongo Db
* Node.js

## Features

* Registeration of new Customers
* Signing in of existing customers & agents
* Create New Complaint
* View existing complaints
* Add comments to existing complaints
* Json Web Token - API Security
* Auth Guard, whereever applicable
* Sorted records
* Ability to change status by agent
* Validation, wherever applicable
* Password encryption

## Deployment

1. git clone https://github.com/kushalarora92/customer-complaint-forum
2. cd customer-complaint-forum
3. Setup Database on local
    1. Defaiut Install mongo db on windows machine [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition]
    2. make directory c:/mongo_data/db
    3. double click **start_mongo_db.bat** present in base folder
4. Setup Backend on default node port 3000
    1. cd customer-complaint-forum-backend
    2. npm install
    3. npm start
5. Setup Frontend on default angular port 4200
    1. cd customer-complaint-forum-frontend
    2. npm install
    3. ng serve

## Add Agents

While customers can be registered through app itself, Agents can be added using below API [can be performed using POSTMAN, or any equivalent rest client]
```
POST
http://localhost:3000/api/user/register
{"email":"<email>","password":"<password>","phone":"<phone>","acc_type":"agent"}

Sample Body:
{"email":"agent@gmail.com","password":"test@1234","phone":"123456789","acc_type":"agent"}
```

## Build With MEAN Stack

* Angular 6 - Front-end Web Application Platform
* NodeJS with Express - Backend Web Applcaiton Framework
* Mongo DB with Mongoose - Database with ODM

## Author

* Kushal Arora - kushalarora92@gmail.com