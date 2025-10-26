# 🌐 [**Live Site → gshop-pied.vercel.app/demo-mode**](https://gshop-pied.vercel.app/demo-mode)

---

# E-Commerce Platform with Full Admin Dashboard (MVP)

A modern, full-stack e-commerce web application featuring a complete admin dashboard and dynamic storefront. Built as a fully functional MVP to demonstrate scalable, maintainable full-stack development.

---

## 🚀 Project Overview

This project is a **fully functional e-commerce MVP**, including both a **dynamic storefront** and a **comprehensive administrator dashboard**. Key features include:

- Add, manage, and organize **products, categories, and collections**
- Support **product variants** (size, color, etc.)
- **Stock updates** occur automatically when orders are placed
- Manage **orders**, generate **shipping labels**, and verify addresses
- Fully **customizable site settings**: banners, icons, site name, theme colors, tax rules, shipping limits
- **Basic user accounts**: sign up, log in, and authentication
- Responsive design for **desktop and mobile devices**
- Smooth UI interactions and animations with **Framer Motion**

This MVP demonstrates the ability to implement **complex full-stack functionality** with clean architecture and maintainable code.

---

## 🏗️ Tech Stack

**Frontend:**

- TypeScript, React, Vite
- React Router for SPA navigation
- Tailwind CSS + Shadcn UI for custom components
- Framer Motion for animations
- React Hook Form + Zod for form validation
- Redux for global state
- TanStack Query for caching and optimized data fetching

**Backend:**

- Express.js with CORS and cookie-parser
- Axios for API communication
- JWT + Argon2 for authentication
- Prisma ORM with PostgreSQL (via Supabase)
- Stripe for payments
- EasyPost for shipping and address verification

**Infrastructure & Deployment:**

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Image storage using **ImgBB** and **Supabase**
- Environment variables managed via `.env`

**Code Quality:**

- ESLint for static analysis
- Prettier for consistent formatting

---

## 🤖 AI Assistance

Parts of the **initial scaffolding and setup** of this project were assisted by AI tools. However, all **core implementation, integration, debugging, and final functionality** were completed manually. Every feature was **fully implemented, tested, and connected**, ensuring a production-ready MVP. This highlights the ability to **leverage modern tools while demonstrating strong full-stack skills**.

---

## 🔥 Key Highlights

- **Full-stack functionality:** Frontend and backend fully integrated with persistent data
- **E-commerce logic:** Product variants, stock updates upon order placement, dynamic site settings, shipping, and payment integration
- **Performance optimizations:** Efficient caching, lazy loading, and optimized React rendering
- **Scalable architecture:** Clear separation of `frontend`, `backend`, and `shared` types/utilities
- **Professional UI/UX:** Fully responsive, interactive dashboards
- **Secure authentication:** Basic user accounts with JWT authentication and Argon2 password hashing

---

## 🗂️ Project Structure

This is a **monorepo** with three main folders:

- **`/backend`** - Express.js API server that handles all database operations, authentication, payments, and shipping
- **`/frontend`** - React storefront and admin dashboard where users shop and admins manage everything
- **`/shared`** - TypeScript types and utilities used by both frontend and backend

### How It Works

**For Customers:**

- Browse products on the storefront (`/frontend/src/pages/HomePage.tsx`)
- Add items to cart, checkout with Stripe payments
- Create accounts and view order history

**For Admins:**

- Access admin dashboard at `/admin` route
- Manage products, orders, users, and site settings
- All admin functionality is in `/frontend/src/features/admin-dash/`

**For Developers:**

- Backend API routes are in `/backend/src/routes/`
- Frontend components are organized by feature in `/frontend/src/features/`
- Database schema is in `/backend/prisma/schema.prisma`
- Shared types ensure frontend and backend stay in sync
