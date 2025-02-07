# 🚀 Multi-User Approval System

A **Node.js & PostgreSQL** application that enables users to **create tasks, approve tasks, and comment**, following a **multi-approval process** where a task requires 3 approvals to be marked as "approved."

The system includes **email notifications (Mailtrap/SendGrid)** and real-time task updates. The backend is built using **Node.js (Express.js) and PostgreSQL (Sequelize ORM)**, with **JWT-based authentication** for secure access.

---

## **Features**
- User Authentication (Signup, Login with JWT)
- Task Management (Create, Approve, and Comment on tasks)
- Multi-Approval System (3 approvals required for final approval)
- Notifications (Task creator gets notified when an approver signs off)
- Email Alerts (When a task is fully approved)
- PostgreSQL Integration with Sequelize ORM
- Dockerized PostgreSQL Database

---

## **Technologies Used**
- **Backend:** Node.js (Express.js)
- **Database:** PostgreSQL with Sequelize ORM (Running in Docker)
- **Authentication:** JWT-based authentication
- **Email Service:** Nodemailer (Mailtrap/SendGrid for testing)
- **Deployment:** Docker for database setup, NPM scripts for server execution

---

## **Setup & Installation**
### **Prerequisites**
- [Node.js](https://nodejs.org/) installed (Recommended: LTS version)
- [Docker](https://www.docker.com/) installed and running

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/MultiUserApprovalApp.git
cd MultiUserApprovalApp
```

### **2️⃣ Install Dependencies**
```sh
npm install
```
📌 **This step is required to install all necessary Node.js packages.**

### **3️⃣ Create and Configure the `.env` File**
To run the application properly, create a **`.env`** file inside the `/server` directory and add your credentials:

```ini
# Database Configuration
POSTGRES_DB=multitask_db
POSTGRES_USER=postgres
POSTRES_PASSWORD=TaskPostgres@123

DB_PORT=8016
DB_HOST=localhost



```
📌 **Ensure this file is correctly set up before running the server.**

### **4️⃣ Start the PostgreSQL Database (Using Docker)**
```sh
docker-compose up -d
```
📌 **This will start PostgreSQL inside a Docker container** using the `docker-compose.yml` configuration.

### **5️⃣ Run Database Migrations**
```sh
npm run migrate
```
📌 **This ensures all Sequelize models are synchronized with the database.**

### **6️⃣ Start the Server**
```sh
npm run start:dev
```
📌 **The server will be available at:**  
🔗 **Backend API:** [http://localhost:3000](http://localhost:3000)



## **License**
📚 This project is licensed under the **MIT License**.

---



