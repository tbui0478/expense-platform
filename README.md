# Expense Platform
 
A full-stack personal finance and expense management platform built to go beyond basic expense tracking. This project focuses on real-world financial workflows, including transaction import, automatic categorization, budgeting insights, and subscription detection.
 
> Status: In active development. This README will be updated as features are completed.
 
---
 
## Overview
 
Expense Platform is designed to simulate the core experience of a modern personal finance tool. Instead of manual data entry alone, the platform supports importing transaction data, automatically organizing it, and surfacing insights that help users understand their spending habits.
 
---
 
## Planned Features
 
### Core
- User authentication and account management (JWT-based)
- Add, edit, and delete transactions
- Custom expense categories
- Dashboard with spending summaries and visualizations
- Budget creation and tracking per category
### Advanced
- CSV transaction import with automatic categorization
- Recurring subscription detection based on transaction patterns
- Overspending alerts and monthly trend insights
- Shared/multi-user budgets
- Background processing for imports and categorization
---
 
## Tech Stack
 
### Backend
- Java 17
- Spring Boot
- Spring Security (JWT authentication)
- Spring Data JPA
- PostgreSQL
### Frontend
- React (Vite)
- Tailwind CSS
- Recharts
### Infrastructure
- Docker and Docker Compose
- GitHub Actions (CI/CD)
---
 
## Project Structure
 
```
expense-platform/
├── backend/            Spring Boot application (REST API)
├── frontend/           React application (UI)
├── docker-compose.yml  Local multi-service environment
├── .github/workflows/  CI/CD pipeline configuration
└── README.md
```
 
---
 
## Getting Started
 
### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- Docker (optional, for containerized setup)
### Backend Setup
```
cd backend
./mvnw spring-boot:run
```
 
### Frontend Setup
```
cd frontend
npm install
npm run dev
```
 
### Running with Docker
```
docker-compose up
```
 
---
 
## Roadmap
 
- Authentication and user accounts
- Transaction CRUD and categories
- Dashboard with charts
- CSV import and auto-categorization
- Budgeting and overspend alerts
- Subscription detection
- Shared budgets
- Deployment
---
 
## License
 
This project is licensed under the MIT License.

---

## Author
 
**Trinh Bui**
