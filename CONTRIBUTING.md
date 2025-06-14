# Contributing to Rently Pro

Thank you for your interest in contributing to **Rently Pro**!
We welcome contributions from the community to help make this enterprise-grade real estate application even better.
Please read the following guidelines carefully to ensure a smooth contribution process.

---

## Table of Contents

- [Contributing to Rently Pro](#contributing-to-rently-pro)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [How to Contribute](#how-to-contribute)
    - [Reporting Issues](#reporting-issues)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Submitting Pull Requests](#submitting-pull-requests)
  - [Development Guidelines](#development-guidelines)
    - [Project Structure](#project-structure)
    - [Setup Instructions](#setup-instructions)
    - [Coding Standards](#coding-standards)
    - [Commit Messages](#commit-messages)
    - [Branching Strategy](#branching-strategy)
      - [Example](#example)
    - [Testing](#testing)
  - [Style Guides](#style-guides)
  - [Documentation](#documentation)
  - [Community \& Support](#community--support)
  - [License](#license)

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
Please treat everyone with respect and help us maintain a welcoming community.

---

## How to Contribute

### Reporting Issues

- **Search first:** Please check [existing issues](https://github.com/dipaloke/real-estate-prod/issues) before opening a new one.
- **Provide details:** Include clear steps to reproduce, expected vs. actual behavior, and relevant logs or screenshots.
- **Label appropriately:** Use labels such as `bug`, `enhancement`, or `question` when possible.

### Suggesting Enhancements

- **Describe your idea:** Explain the motivation and potential benefits.
- **Check for duplicates:** Ensure your suggestion hasn’t already been proposed.
- **Be constructive:** Suggest solutions or alternatives if possible.

### Submitting Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **Write clear, concise code** following our [Coding Standards](#coding-standards).
3. **Add or update tests** as appropriate.
4. **Document your changes** in code comments and/or the `README.md` if needed.
5. **Ensure all checks pass** (lint, build, tests).
6. **Submit a pull request** with a clear description of your changes and link to any relevant issues.

---

## Development Guidelines

### Project Structure

This project uses a monorepo structure:

```bash
real-estate-prod/
├── client/   # Next.js frontend
├── server/   # Express.js backend
├── .github/  # GitHub workflows and templates
├── .gitignore
├── README.md
├── CONTRIBUTING.md
└── ...
```

### Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/dipaloke/real-estate-prod.git
    cd real-estate-prod
    ```

2. **Install dependencies:**
    - For the frontend:

      ```bash
      cd client
      npm install
      ```

    - For the backend:

      ```bash
      cd ../server
      npm install
      ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` in both `client` and `server` folders and fill in your credentials.

4. **Run the development servers:**
    - Frontend:

      ```bash
      npm run dev
      ```

    - Backend:

      ```bash
      npm run dev
      ```

### Coding Standards

- **Languages:** TypeScript (preferred), JavaScript
- **Linting:** Use ESLint and Prettier (configured in the repo)
- **Formatting:** Follow the `.editorconfig` and Prettier rules
- **Naming:** Use descriptive variable, function, and component names
- **Comments:** Write clear, concise comments for complex logic

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for clarity and automation :

- **feat:** add user authentication with AWS Cognito
- **fix:** correct property listing filter bug
- **docs:** update README with setup instructions
- **refactor:** simplify map integration logic
- **test:** add tests for property search

### Branching Strategy

- **main:** Stable, production-ready code
- **feature/xxx:** New features
- **fix/xxx:** Bug fixes
- **docs/xxx:** Documentation updates
- **test/xxx:** Testing-related changes

#### Example

- feature/property-listing
- fix/login-auth-bug
- docs/update-readme

### Testing

- **Frontend:** Use **Jest and React Testing Library**
- **Backend:** Use **Jest or your preferred Node.js** testing framework
- **Write tests** for new features and bug fixes
- **Run all tests** before submitting a PR

---

## Style Guides

- **Frontend:** Follow [Next.js](https://nextjs.org/docs), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/docs), and [Shadcn UI](https://ui.shadcn.com/docs) best practices.
- **Backend:** Follow [Express.js](https://expressjs.com/) and [Prisma](https://www.prisma.io/docs/) best practices.
- **TypeScript:** Use strict typing and avoid `any` where possible.

---

## Documentation

- Update or add documentation for any new features, APIs, or components.
- Keep the [README.md](README.md) and relevant docs up to date.
- For major changes, consider adding or updating diagrams or architecture overviews.

---

## Community & Support

- For questions, open a [GitHub Discussion](https://github.com/dipaloke/real-estate-prod/discussions) or [issue](https://github.com/dipaloke/real-estate-prod/issues).
- For security concerns, please email the maintainer directly: [Dipaloke Biswas](mailto:dipalokebiswas96@gmail.com).

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for helping make **Rently Pro** better!
Happy coding! 🚀
