# Expense Platform 💸

> A modern, full-stack personal finance and intelligent expense tracking application built with **Spring Boot** and **React (Vite)**.

[![Java 17](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4+-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646cff.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

**Expense Platform** is a full-stack financial dashboard designed to streamline personal finance management. Built with a sleek dark-mode glassmorphic interface, it equips users with real-time financial health scoring, category spending breakdowns, active budget monitoring, subscription detection, and intelligent savings projections.

---

## Key Features

- **User Authentication**: Built-in user registration and login workflows with session persistence.
- **Real-time KPI Dashboard**: Live tracking of Net Income, Total Expenses, Budget Utilization, and Financial Health Score.
- **Category Spending Analytics**: Visual interactive chart breakdowns powered by Chart.js.
- **Transaction Management**: Add and remove income/expense transactions with instant dashboard updates.
- **Budget Progress Tracker**: Visual progress indicators per category with overspending alerts.
- **Subscriptions Watchdog**: Automated tracking and toggling of recurring monthly subscriptions.
- **Savings & Investment Simulator**: Interactive compound growth calculator to model future net worth targets.
- **Multi-Currency Support**: On-the-fly currency conversion for USD ($), EUR (€), GBP (£), and JPY (¥).

---

## Tech Stack

### **Backend**
- **Java 17** & **Spring Boot 4**
- **Spring Data JPA** & **Hibernate**
- **Spring Security** (Authentication & API protection)
- **H2 Database** (Zero-config in-memory database for instant execution)
- **PostgreSQL** (Production database support via Docker)
- **Lombok** & **Maven**

### **Frontend**
- **React 19** with **Vite**
- **Chart.js** & **react-chartjs-2** (Data visualizers)
- **Lucide React** (Modern SVG iconography)
- **Vanilla CSS** (Custom dark glassmorphism design system)

### **Infrastructure**
- **Docker** & **Docker Compose**

---

## Project Structure

```
expense-platform/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/        # Controllers, Models, Repositories, Services
│   ├── src/main/resources/   # Application properties & configurations
│   └── mvnw / pom.xml        # Maven build configuration
├── frontend/                 # React SPA application
│   ├── src/components/       # Modular UI components (Dashboard, Charts, Modals)
│   ├── src/App.jsx           # Main application state & API integrations
│   └── package.json          # Node dependencies & Vite scripts
├── docker-compose.yml        # PostgreSQL service container definition
├── .env                      # Environment configuration
└── README.md                 # Project documentation
```

---

## Quick Start Guide

### **Prerequisites**
Make sure you have the following installed on your system:
- **Java JDK 17+**: `java -version`
- **Node.js 18+** & **npm**: `node -v` && `npm -v`

---

### Run Backend (Spring Boot)

Open a terminal window and execute:

```bash
# Navigate to backend directory
cd backend

# Run the Spring Boot application (using Maven Wrapper)
./mvnw spring-boot:run
```

- **Backend API URL**: `http://localhost:8080/api`
- **H2 Console**: `http://localhost:8080/h2-console` *(JDBC URL: `jdbc:h2:mem:expensedb`)*

---

### Run Frontend (React / Vite)

Open a **second terminal window** and execute:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (only required on first run)
npm install

# Start the Vite development server
npm run dev
```

- **Frontend App URL**: `http://localhost:5173`

---

### Optional: Docker Setup (PostgreSQL)

If you prefer to run PostgreSQL instead of the default in-memory H2 database:

```bash
docker-compose up -d
```

---

## API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & start session |
| `GET` | `/api/dashboard/summary` | Fetch complete dashboard analytics & summary |
| `POST` | `/api/transactions` | Create a new transaction |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction |
| `PATCH` | `/api/subscriptions/{id}/toggle` | Toggle active status of a subscription |

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Author

**Trinh Bui**
