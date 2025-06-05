<h1 align="center">🛒 Electronics E-Commerce API</h1>
<p align="center">
  A backend service for a full-featured online electronics store with secure payment integration.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"/>
</p>

---

## 📌 Overview

**Electronics E-Commerce API** powers an online store specializing in electronic products like passive/active components, electromechanical parts, sensors, and display devices. It features secure payment integration with **Stripe** and sandboxed APIs to simulate transactions safely.

---

## ⚙️ Features

- 📦 Manage product catalog: components, sensors, devices  
- 🛒 Shopping cart and order handling  
- 🔐 User authentication & authorization  
- 💳 Secure payments via **Stripe**  
- 📁 File uploads for product images  
- 🔒 Security best practices (helmet, rate limiting)  
- 📊 Structured business logic separated from controllers  

---

## 🛠️ Tech Stack

### 🚀 Backend

- **Node.js** & **Express.js (v5)**  
- **TypeScript** (ES2022, NodeNext modules)  
- **PostgreSQL** (via Prisma ORM)  
- **Stripe** SDK for payment processing  

### 📦 Highlighted Packages

- `bcryptjs` — password hashing  
- `cors` — Cross-Origin Resource Sharing  
- `helmet` — security headers  
- `express-rate-limit` — rate limiting  
- `multer` — file upload handling  
- `nodemailer` — email notifications  
- `winston` — logging  
- `dotenv` — environment variables
- `stripe` — online payment sandbox
- `JsonWebtoken` - token session authentication paired with cookies

---

## 📂 Project Structure

```bash
Backend/
│
├─ dist/                    # Compiled JS output from TypeScript
├─ node_modules/            # Installed dependencies
├─ prisma/
│   └─ migrations/          # Prisma migration files
│
├─ src/
│   ├─ controllers/         # HTTP request handlers
│   │   ├─ accountController/
│   │   ├─ productController/
│   │   ├─ orderController/
│   │   ├─ cartController/
│   │   ├─ SignInController.ts
│   │   └─ SignUpController.ts
│   │
│   ├─ generated/           # Prisma client auto-generated files
│   │   └─ prisma/
│   │       └─ runtime/
│   │
│   ├─ middleware/          # Express middlewares (auth, error handling, etc)
│   ├─ routers/             # API route definitions
│   ├─ services/            # Business logic layer (separate from controllers)
│   │   ├─ accountServices/
│   │   ├─ productServices/
│   │   ├─ orderServices/
│   │   └─ cartServices/
│   │
│   ├─ uploads/             # File uploads (consider placing outside src)
│   │   ├─ products/
│   │   ├─ users/
│   │   ├─ admins/
│   │   └─ others/
│   │
│   ├─ utils/               # Helper and utility functions
│   └─ app.ts               # Main app entry point
│
├─ env                      # Environment variables (consider renaming to .env)
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ tsconfig.json
