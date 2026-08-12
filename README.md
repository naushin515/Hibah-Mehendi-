# Hibah Mehendi Store

Premium Chemical-Free Henna Products — Frontend + Backend Integrated E-Commerce Application.

## Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, React Router v7, Framer Motion, Axios.
- **Backend:** Node.js, Express, Mongoose (MongoDB Atlas), JWT, BcryptJS, Helmet, CORS, Express-Rate-Limit, Cloudinary (for image upload).

---

## Getting Started

### 1. Installation
Install root dependencies and backend dependencies:
```bash
npm install
npm install --prefix backend
```

### 2. Environment Configuration
Create a `.env` file in the `/backend` folder. You can use the template from `backend/.env.example`:
```bash
cp backend/.env.example backend/.env
```
Fill in your MongoDB URI, JWT Secret, and Cloudinary keys:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JSON Web Tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary integration keys

### 3. Seeding Sample Data
Run the database seed script to populate categories, products, and default user accounts:
```bash
npm run seed --prefix backend
```

### 4. Running the Application
Launch both the backend API server (port 5000) and Vite development frontend (port 5173) simultaneously:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the frontend.

---

## API Documentation (Swagger)

A Swagger interface is served by the backend when it is running. Access it at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Pre-seeded Accounts
*   **Admin User:** `admin@hibah.com` (Password: `admin123`)
*   **Customer User:** `customer@hibah.com` (Password: `customer123`)

---

## Project Structure

```
├── backend/
│   ├── config/          # Configurations
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, role check, validation, multer
│   ├── models/          # Mongoose database models
│   ├── routes/          # Express route bindings
│   ├── scripts/         # DB Seed script
│   ├── utils/           # Cloudinary service helper
│   ├── server.js        # API Bootstrapper
│   └── swagger.yaml     # Swagger documentation
└── src/                 # React frontend
```
