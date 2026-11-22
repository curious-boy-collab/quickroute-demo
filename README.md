# QuickRoute E-Commerce Demo Backend

A production-ready E-commerce REST API backend demonstrating the capabilities of the **QuickRoute** NPM package.

---

## Overview

This project implements full CRUD REST APIs for three core E-commerce entities using **QuickRoute**:
- **Users**: `/api/users`
- **Products**: `/api/products`
- **Orders**: `/api/orders`

All routes include automated pagination, search, safe sorting, mass assignment protection, required field validation, and standardized error responses without writing repetitive boilerplate controllers.

---

## Prerequisites

- Node.js >= 16.0.0
- MongoDB Atlas cluster URI or local MongoDB instance

---

## Setup & Local Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Set your `MONGODB_URI` in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Seed sample data**:
   ```bash
   npm run seed
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`.

---

## Available API Endpoints

### Health Check
- `GET /health` - Service health status & uptime check (used by Render).

### 1. Users API (`/api/users`)
- `POST /api/users` - Create user
- `GET /api/users?page=1&limit=10` - List users with pagination
- `GET /api/users?search=nitin` - Search by name or email
- `GET /api/users?sort=-createdAt` - Sort by newest
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Remove user

### 2. Products API (`/api/products`)
- `POST /api/products` - Create product
- `GET /api/products?page=1&limit=5&sort=price` - List products sorted by price
- `GET /api/products?search=keyboard` - Search product name/category/description
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Remove product

### 3. Orders API (`/api/orders`)
- `POST /api/orders` - Place new order
- `GET /api/orders?page=1&limit=10` - List orders
- `GET /api/orders?search=aarav` - Search orders by customer
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel/delete order

---

## Render Deployment Instructions

1. Push this repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New + > Web Service**.
3. Connect your `quickroute-demo` repository.
4. Set the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<Your MongoDB Atlas connection URI>`
6. Set Health Check path to `/health`.
7. Click **Deploy Web Service**.

---

## License

MIT
