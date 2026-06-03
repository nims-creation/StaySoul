# Contributing to StaySoul

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork** the repository and clone your fork
2. Create a new branch: `git checkout -b feat/your-feature-name`
3. Follow the setup guide in [README.md](./README.md)

## Development Setup

### Backend
```bash
# Requires Java 21, Maven 3.8+, PostgreSQL 16
cp .env.example .env  # fill in your values
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
cp .env.example .env  # fill in VITE_API_BASE_URL
npm install
npm run dev
```

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use For |
|--------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `refactor` | Code restructuring |
| `docs` | Documentation only |
| `chore` | Tooling, config, CI |
| `test` | Tests |

**Examples:**
```
feat(frontend): add date range picker to search bar
fix(backend): handle null paymentSessionId on cancel
docs: update deployment guide in README
```

## Pull Request Guidelines

- Keep PRs focused and small (one logical change)
- Add a clear description of what changed and why
- Make sure the build passes (`./mvnw clean package`)
- Make sure the frontend builds (`npm run build`)

## Code Style

### Java (Backend)
- Follow standard Java naming conventions
- Use Lombok annotations where appropriate
- Write Javadoc for public service methods

### React (Frontend)
- Use functional components with hooks
- Keep components small and focused
- Use the `useToast` hook instead of `window.alert`

## Questions?

Open a [GitHub Issue](https://github.com/nims-creation/StaySoul/issues) or reach out to the maintainer.

---

Made with ❤️ by [Nitesh Mishra](https://github.com/nims-creation)
