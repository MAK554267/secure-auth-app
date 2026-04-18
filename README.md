# 🔐 Secure Auth App

A custom-built Node.js web application demonstrating secure authentication and protection against common OWASP Top 10 vulnerabilities. Built as part of the DevelopersHub Corporation (DHC) Cybersecurity Internship — Week 2.

---

## 📌 Overview

This project was built from scratch to practically demonstrate how common web vulnerabilities are **prevented** in a real application. Rather than patching a complex existing codebase, security controls were implemented from the ground up in a simple, beginner-friendly Node.js app.

**Reference target used for vulnerability study:** [OWASP Juice Shop](https://github.com/juice-shop/juice-shop)

---

## 🛡️ Security Features Implemented

| Security Control | Technology Used |
|---|---|
| Input validation & XSS prevention | `validator.js` |
| Secure password hashing | `bcryptjs` (12 salt rounds) |
| Stateless authentication | `jsonwebtoken` (JWT, HttpOnly cookie) |
| Role-based authorization | Custom Express middleware |
| SQL injection prevention | Parameterized queries (`better-sqlite3`) |
| HTTP security headers | `helmet.js` |
| Brute-force protection | `express-rate-limit` |
| Security event logging | `winston` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/MAK554267/secure-auth-app.git
cd secure-auth-app
npm install
```

### Setup environment variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your_strong_random_secret_here
PORT=3001
```

### Run the application

```bash
node app.js
```

Open your browser at `http://localhost:3001`

---

## 📁 Project Structure

```
secure-auth-app/
├── app.js                  # Main Express server
├── .env                    # Environment variables (not committed)
├── routes/
│   ├── auth.js             # Register, login, logout
│   └── dashboard.js        # Protected routes
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   └── roleMiddleware.js   # Role-based access control
├── models/
│   └── userModel.js        # SQLite schema and queries
├── views/                  # EJS templates
├── logs/                   # Winston security logs
└── package.json
```

---

## 🔍 Vulnerabilities Studied (OWASP Juice Shop)

| Vulnerability | OWASP Category | Fixed In Custom App |
|---|---|---|
| Cross-Site Scripting (XSS) | A03:2021 | ✅ validator.escape() |
| SQL Injection | A03:2021 | ✅ Parameterized queries |
| Weak Password Storage (MD5) | A02:2021 | ✅ bcrypt (12 rounds) |
| Missing Security Headers | A05:2021 | ✅ Helmet.js |
| Sensitive Data Exposure | A01:2021 | ✅ JWT + Authorization middleware |

---

## 🧪 Penetration Testing

- **Nmap** — port scan confirmed only port 3001 exposed
- **OWASP ZAP** — automated scan returned 0 High-risk alerts
- **XSS retest** — payload stored as escaped text, not executed
- **SQL injection retest** — login bypass blocked by parameterized queries

---

## 👤 Author

**Muhammad Azfar Waqas**
BS Cybersecurity — University of Wah
DevelopersHub Corporation Internship — April 2026

---

## ⚠️ Disclaimer

This project is built for **educational purposes only** as part of a cybersecurity internship. All vulnerability testing was performed in a safe, legal, local environment.
