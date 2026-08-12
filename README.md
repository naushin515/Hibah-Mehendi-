<<<<<<< HEAD
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
=======
# Hibah Mehendi Store API Documentation

## Authentication & Users

### POST `/api/auth/register`
Register a new user.
- **Body**: `{ "name", "email", "password", "mobile" }`
- **Response**: User object & JWT Token

### POST `/api/auth/login`
Authenticate user.
- **Body**: `{ "email", "password" }`
- **Response**: User object & JWT Token

### POST `/api/auth/google`
Authenticate using Google OAuth.
- **Body**: `{ "tokenId" }` (Google ID Token from frontend)
- **Response**: User object & JWT Token

### GET `/api/users/profile`
Get logged-in user profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object

### PUT `/api/users/profile`
Update logged-in user profile/address.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name", "mobile", "address", "city", "state", "pincode", "password" }`
- **Response**: Updated User object

## Products & Categories

### GET `/api/products`
Get all products. Supports search, filter, sorting.
- **Query Params**: `search`, `category`, `sort`
- **Response**: Array of Product objects

### GET `/api/products/categories`
Get all product categories.
- **Response**: Array of Category objects

### GET `/api/products/:identifier`
Get a single product by ID or Slug.
- **Response**: Product object

### POST `/api/products` (Admin Only)
Create a new product.
- **Headers**: `Authorization: Bearer <token>`

## Orders

### POST `/api/orders`
Create a new order.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "orderItems", "shippingAddress", "paymentMethod", "itemsPrice", "shippingPrice", "totalPrice" }`
- **Response**: Order object

### GET `/api/orders/myorders`
Get all orders for the logged-in user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of Order objects

### GET `/api/orders/:id`
Get order by ID.
- **Headers**: `Authorization: Bearer <token>`

## Uploads

### POST `/api/upload` (Admin Only)
Upload an image to Cloudinary.
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body**: FormData with `image` file
- **Response**: `{ "url", "publicId" }`
>>>>>>> 81245da0a07d8f960513ccd3b62293ef53092741
