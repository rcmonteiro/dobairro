# Project Overview

This project demonstrates the implementation of Clean Architecture within a monorepo setup, utilizing modern web technologies. The goal is to build a scalable, maintainable, and testable application by organizing the codebase into well-defined layers.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js/Fastify
- **Authorization**: CASL
- **Database**: Postgres with Prisma ORM
- **Monorepo Tooling**: Turborepo

## Project Structure

The project is organized into five layers, following the principles of Clean Architecture:

1. **Domain Layer**: Contains the core business logic, including entities, value objects, and aggregates.
2. **Application Layer**: Implements use cases and defines repository interfaces.
3. **Controller Layer**: Handles user interface requests and orchestrates interactions between the UI and application layers.
4. **Infrastructure Layer**: Provides concrete implementations of repository interfaces and integrates with external systems like databases.
5. **User Interface Layer**: Built with Next.js, it organizes UI components and pages, consuming external APIs to present data.

## Packages and Workspaces

- **./config/**: Configuration files for ESLint, TypeScript, and Prettier.
- **./packages/**: Shared resources and core functionality, including environment configurations, authentication, and the core business logic
- **./apps/**: Application implementations for the API and web interface.

## Key Features

- **Modularity**: Clear separation of concerns with distinct layers and packages.
- **Scalability**: Easily extendable architecture to accommodate new features.
- **Maintainability**: Organized codebase facilitating easier updates and debugging.
- **Testability**: Each layer and package can be independently tested, ensuring robust code.

## Learn More

To learn more about the architecture and design principles behind this project, check out my [blog post](https://rcmonteiro.com/post/structuring-your-code-with-clean-architecture-a-5-layer-approach) where I dive deeper into each layer and provide code examples.
