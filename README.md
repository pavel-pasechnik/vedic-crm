# Vedic CRM

Vedic CRM is a full-featured CRM system built on a modern technology stack with a monolithic architecture of Ruby on Rails, React, and Vite.

---

## 📊 Badges Summary

[![CI](https://github.com/pavel-pasechnik/vedic-crm/actions/workflows/ci.yml/badge.svg?branch=main&style=flat-square)](https://github.com/pavel-pasechnik/vedic-crm/actions)
[![Coverage Status](https://coveralls.io/repos/github/pavel-pasechnik/vedic-crm/badge.svg?branch=main&style=flat-square)](https://coveralls.io/github/pavel-pasechnik/vedic-crm)
[![Security Audit](https://img.shields.io/badge/Security-Audit-green?style=flat-square)](https://github.com/pavel-pasechnik/vedic-crm/actions/workflows/ci.yml)
[![Lint Status](https://img.shields.io/badge/Lint-Pass-brightgreen?style=flat-square)](https://github.com/pavel-pasechnik/vedic-crm/actions/workflows/ci.yml)
[![RubyCritic](https://img.shields.io/badge/RubyCritic-Enabled-blueviolet?style=flat-square)](https://github.com/pavel-pasechnik/vedic-crm/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/ab46818dc16b1f934d2c/maintainability?style=flat-square)](https://codeclimate.com/github/pavel-pasechnik/vedic-crm/maintainability)
[![Last Commit](https://img.shields.io/github/last-commit/pavel-pasechnik/vedic-crm?style=flat-square)](https://github.com/pavel-pasechnik/vedic-crm/commits)
[![Snyk](https://img.shields.io/snyk/vulnerabilities/github/pavel-pasechnik/vedic-crm?style=flat-square)](https://snyk.io/test/github/pavel-pasechnik/vedic-crm)

---

## 📑 Table of Contents

- [🛠 Project Technologies](#-project-technologies)
- [🔍 Code Quality](#-code-quality)
- [📦 Requirements](#-requirements)
- [⚙ Installation](#-installation-and-configuration)
- [🗄 Database Initialization](#-database-initialization)
- [🧪 Running Tests](#-running-tests)
- [🚀 Deployment](#-deployment)
- [⚙ Additional Services](#-additional-services)

---

## 🛠 Project Technologies

![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Devise](https://img.shields.io/badge/Devise-800000?style=for-the-badge&logo=rubygems&logoColor=white)
![HAML](https://img.shields.io/badge/HAML-29BEB0?style=for-the-badge&logo=haml&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Rails](https://img.shields.io/badge/Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Sidekiq](https://img.shields.io/badge/Sidekiq-CC0000?style=for-the-badge&logo=ruby&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🔍 Code Quality

![Rubocop](https://img.shields.io/badge/Rubocop-enabled-brightgreen?style=for-the-badge&logo=rubyonrails)
![ERB Lint](https://img.shields.io/badge/ERBLint-enabled-brightgreen?style=for-the-badge&logo=ruby)
![HAML Lint](https://img.shields.io/badge/HAMLLint-enabled-brightgreen?style=for-the-badge&logo=ruby)
![ESLint](https://img.shields.io/badge/ESLint-enabled-brightgreen?style=for-the-badge&logo=eslint)
![Stylelint](https://img.shields.io/badge/Stylelint-enabled-brightgreen?style=for-the-badge&logo=stylelint)
![Sentry](https://img.shields.io/badge/Sentry-error--monitoring-362D59?style=for-the-badge&logo=sentry&logoColor=white)

---

## 📦 Requirements

![Ruby](https://img.shields.io/badge/Ruby-3.3.x-red?style=for-the-badge&logo=ruby&logoColor=white)
![Rails](https://img.shields.io/badge/Rails-7.1.x-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-required-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## ⚙ Installation and Configuration

### Project Cloning

```bash
git clone https://github.com/pavel-pasechnik/vedic-crm.git
cd vedic-crm
```

### Building Docker Containers

```bash
docker-compose build
docker-compose up
```

### Dependency Installation

#### Ruby

```bash
bundle install
```

#### Node.js

```bash
npm install
```

### Configuration

Create configuration files based on the examples:

```bash
cp config/database.yml.example config/database.yml
cp config/credentials.yml.example config/credentials.yml
cp .env.example .env
# Don't forget to create .env from .env.example for proper environment variables configuration.
```

---

## 🗄 Database Initialization

```bash
bin/rails db:create db:migrate db:seed
```

---

## 🧪 Running Tests

Running a full set of tests:

```bash
bin/rails test
bin/rails test:system
```

---

## 🚀 Deployment

The project is deployed via Docker containers. Deployment via CI/CD is recommended.

---

## ⚙ Additional Services

![Sidekiq](https://img.shields.io/badge/Sidekiq-background--jobs-CC0000?style=for-the-badge&logo=ruby&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-recommended-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![ActionCable](https://img.shields.io/badge/ActionCable-websockets-800000?style=for-the-badge&logo=rubyonrails&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---
