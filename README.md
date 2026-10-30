# 🛍️ Cypress Mini Shop — Modular E-2-E Test Suite

[![CI Status](https://img.shields.io/github/actions/workflow/status/RishitKapoorIT/cypress-mini-shop/e2e-tests.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=CI)](https://github.com/RishitKapoorIT/cypress-mini-shop/actions)
[![Cypress](https://img.shields.io/badge/Cypress-14.5.4-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21.2-404D59?style=for-the-badge&logo=express&logoColor=61DAFB)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An advanced, scalable End-to-End (E2E) test automation suite built with **Cypress**, designed for modern web applications and e-commerce shopping workflows.

---

## Key Features & Implementation

* **Modular Architecture:** Clean separation of concerns with structured `auth/` and `dashboard/` spec files.
* **Custom Commands (`commands.js`):** Encapsulated reusable workflows for login, session persistence, and product creation to follow the DRY (Don't Repeat Yourself) principle.
* **Fixtures & Environment Variables:** Dynamic test data management using JSON fixtures (`user.json`) and runtime configuration via `Cypress.env()`.
* **API Interception & Stubbing:** Used `cy.intercept()` to mock backend responses and isolate frontend components from network instability.
* **Session Caching (`cy.session()`):** Optimized test execution speed by preserving authenticated states across multiple specs.
* **Flakiness Mitigation:** Resolved asynchronous timing and race conditions using network aliases (`cy.wait()`) and retry-enabled assertions (`.should()`).
* **Advanced Reporting:** Integrated **Mochawesome** to automatically generate merged, professional HTML test reports with execution timestamps and failure logs.
* **Parallel Execution:** Configured concurrent spec runner scripts using `concurrently`.

---

## 📁 Project Directory Structure

```plaintext
cypress-mini-shop/
├── .github/
│   └── workflows/
│       └── e2e-tests.yml            # Automated GitHub Actions CI workflow
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

## 🚀 Getting Started & Local Setup

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** (v9.x or higher)
* **Git**

### Installation
Clone the repository and install all project dependencies:
```bash
git clone https://github.com/RishitKapoorIT/cypress-mini-shop.git
cd cypress-mini-shop
npm install
```

### Launching the Application
Start the built-in Express server:
```bash
npm start
```
The application will be live at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Execution Scripts

The repository includes a comprehensive set of npm scripts for development, headless CI runs, parallel execution, and automated report compilation:

| Command | Description |
| :--- | :--- |
| `npm start` | Launches the local Express shopping application on `http://localhost:3000`. |
| `npm run cy:open` | Opens the interactive Cypress Test Runner GUI for live debugging. |
| `npm run cy:run` | Runs all Cypress test specs headlessly in sequence. |
| `npm run cy:parallel` | Runs all specs concurrently across multiple worker processes via `concurrently`. |
| `npm run report:merge` | Merges individual JSON test results from `cypress/results/*.json` into a single report payload. |
| `npm run report:generate` | Compiles the merged JSON into a standalone Mochawesome HTML report. |
| `npm run test:all` | **Recommended:** Executes parallel tests, merges report data, and generates the final HTML report. |

---

## 📊 Mochawesome HTML Test Reporting

When running `npm run test:all`, test execution telemetry is captured across every spec and compiled into an interactive standalone report:

1. **JSON Collection:** Individual test runs output results to `cypress/results/*.json`.
2. **Report Merging:** `mochawesome-merge` combines spec results into `cypress/reports/output.json`.
3. **HTML Compilation:** `marge` builds `cypress/reports/mochawesome-report.html`.

To view the report locally after running tests:
```bash
# Open in default browser (Windows)
start cypress/reports/mochawesome-report.html

# Open in default browser (macOS)
open cypress/reports/mochawesome-report.html
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

This project features an automated continuous integration pipeline configured in [`.github/workflows/e2e-tests.yml`](.github/workflows/e2e-tests.yml):

* **Triggers:** Every `push` and `pull_request` targeting the `main` branch.
* **Environment:** `ubuntu-latest` running Node.js.
* **Lifecycle:**
  1. Checks out repository and installs cached dependencies.
  2. Launches background application server on port 3000 with liveness health check.
  3. Executes the full Cypress parallel test suite (`npm run test:all`).
  4. Uploads Mochawesome HTML reports and failure screenshots as workflow artifacts.

---

## 👥 Test Credentials & Data Matrix

| Role | Email | Password | Validated Behavior |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@minishop.com` | `AdminSecurePassword2026!` | Validates `Cypress.env()` loading, URL `/dashboard`, and `.welcome-header`. |
| **Customer** | `customer@minishop.com` | `CustomerPassword123!` | Validates `user.json` fixture injection and `.user-profile` containing `"Jane Doe"`. |
| **Session User** | Configured dynamically | Cached credentials | Validates instant authentication via `cy.session()` and `[data-cy="dashboard-stats"]`. |

---

## 📝 QA Reflection & Best Practices

Building a modular Cypress test suite for the **Cypress Mini Shop** application highlighted the critical balance between test realism, speed, and maintainability:
- **DRY Workflows:** Encapsulating repetitive flows into custom commands (`cy.login`, `cy.addProduct`) drastically reduced test bloat.
- **Session Caching:** Implementing `cy.session()` eliminated repeated HTTP round-trips for authentication across suites, cutting execution time significantly.
- **Isolated Mocking:** Employing `cy.intercept()` protected frontend tests from backend latency and simulated edge conditions like delayed responses and loading spinner lifecycles.
- **Deterministic Assertions:** Replacing static waits with explicit network aliases (`cy.wait()`) and retryable DOM assertions eliminated flakiness.
