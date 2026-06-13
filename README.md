# EMS
Employee Management System (EMS)

A full-stack Employee Management System built using Node.js, Express.js, MongoDB, and JWT Authentication.

Features

Admin

- Login with JWT Authentication
- Create Employees
- Update Employees
- Delete Employees
- Assign Tasks
- Assign Task to All Employees
- Approve / Reject Leave Requests
- Approve / Reject WFH Requests
- Search Employees
- Filter Employees by Department
- Dashboard Analytics

Employee

- Login
- View Profile
- View Assigned Tasks
- Update Task Status
- Apply for Leave
- View Leave History
- Apply for Work From Home (WFH)
- View WFH History

Work From Home (WFH) Rules

- Only one active WFH request per employee
- Only one employee can work from home at a time across the company
- WFH duration is fixed to 30 days
- Automatic expiry after 30 days

---

Tech Stack

Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

Database

- MongoDB Atlas

Deployment

- Backend: Render

---

Project Structure

backend
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── cron
├── app.js
└── server.js


---

API Endpoints

Authentication

POST /api/auth/login

GET /api/auth/profile

Employees

GET /api/employees

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id

Tasks

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

Leaves

POST /api/leaves

GET /api/leaves

PUT /api/leaves/approve/:id

PUT /api/leaves/reject/:id

WFH

POST /api/wfh/apply

GET /api/wfh

PUT /api/wfh/approve/:id

PUT /api/wfh/reject/:id

---

Installation

Clone Repository

git clone <repository-url>

Backend

cd backend

npm install

npm run dev


---

Environment Variables

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

---


Author

Anish Bag (Backend)

Full Stack Web Developer