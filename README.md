# Cypress Mini Shop - Modular Test Suite

A comprehensive, production-grade test suite and web application built to demonstrate modular End-to-End (E2E) testing patterns with **Cypress**, **cy.session()**, **cy.intercept()**, parallel execution, and **Mochawesome** standalone HTML reporting.

---

## 1. Project Overview & Folder Structure

```
cypress-mini-shop/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.js          # Authentication & session tests
│   │   └── dashboard/
│   │       ├── products.cy.js       # Product management, fixtures & intercepts
│   │       └── flakiness.cy.js      # Timing debug & retry strategy tests
│   ├── fixtures/
│   │   └── user.json                # Static test user data & product payloads
│   └── support/
│       ├── commands.js              # Reusable custom commands (cy.login, cy.addProduct)
│       └── e2e.js                   # Global configuration and support imports
├── app/                             # Web application (Node.js/Express)
│   ├── public/                      # UI static assets
│   │   ├── login.html               # Login page
│   │   ├── dashboard.html           # Dashboard with stats, products & modals
│   │   └── style.css                # Application styles
│   └── server.js                    # Express server (Port 3000)
├── cypress.config.js                # Base URL, environment variables, reporter config
├── package.json                     # Dependencies, parallel scripts, Mochawesome setup
└── README.md
```

---

## 2. Key Architecture & Features

- **Custom Commands (`cypress/support/commands.js`)**: Encapsulates common user workflows (`cy.login`, `cy.addProduct`, `cy.loginWithSession`) adhering to DRY principles.
- **Session Caching (`cy.session()`)**: Caches authentication state across specs to eliminate redundant login overhead.
- **API Mocking & Stubbing (`cy.intercept()`)**: Spies on and stubs `/api/products` endpoints using JSON fixtures (`user.json`).
- **Flakiness Prevention**: Eliminates asynchronous race conditions and timing issues through retryable assertions and explicit network wait aliases (`cy.wait()`).
- **Parallel Execution (`concurrently`)**: Executes test suites across multiple specs concurrently.
- **Mochawesome HTML Reporting**: Merges individual spec run results into a unified, interactive HTML report (`cypress/reports/mochawesome-report.html`).

---

## 3. Installation & Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
cd cypress-mini-shop
npm install
```

---

## 4. Running the Application & Tests

### Start the Web Application
```bash
npm start
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

### Run Cypress Headless
```bash
npm run cy:run
```

### Run Cypress Interactive Runner
```bash
npm run cy:open
```

### Run Tests in Parallel
```bash
npm run cy:parallel
```

### Full Test Pipeline with Mochawesome Report
```bash
npm run test:all
```
This runs parallel test execution, merges spec JSON results via `mochawesome-merge`, and generates a standalone HTML report in `cypress/reports/mochawesome-report.html`.

---

## 5. Test Credentials & Environment

Defined in `cypress.config.js` and `cypress/fixtures/user.json`:
- **Admin**: `admin@minishop.com` / `AdminSecurePassword2026!`
- **Customer**: `customer@minishop.com` / `CustomerPassword123!` (Jane Doe)
