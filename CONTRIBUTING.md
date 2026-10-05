# Contributing to SaaS Boilerplate

Thank you for your interest in contributing! This document outlines the process for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Run tests and linting
6. Submit a pull request

## Development Setup

```bash
git clone https://github.com/yourusername/saas-boilerplate.git
cd saas-boilerplate
npm install
cp .env.example .env
# Update .env with your configuration
npm run db:push
npm run dev
```

## Pull Request Process

1. **Create a branch** from `main` with a descriptive name:
   - `feature/your-feature-name` for new features
   - `fix/your-bug-fix` for bug fixes
   - `docs/your-docs-update` for documentation changes

2. **Make your changes** following our coding standards:
   - Use TypeScript for all new code
   - Follow the existing code style
   - Write clear commit messages
   - Add tests for new functionality

3. **Update documentation** if you're changing functionality:
   - Update README.md if needed
   - Add ADRs for significant architectural decisions
   - Update JSDoc comments for public APIs

4. **Submit a pull request**:
   - Describe what your changes do and why
   - Reference any related issues
   - Ensure CI passes
   - Request review from maintainers

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` before committing
- Use meaningful variable and function names
- Write self-documenting code with comments only when necessary

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Code of Conduct

Please be respectful and considerate in all interactions. We want to maintain a welcoming community for everyone.

## Questions?

If you have questions about contributing, please open an issue or reach out to the maintainers.
