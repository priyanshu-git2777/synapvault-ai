# Part 1 Verification Checklist

## Development Tools

- [ ] Homebrew works
- [ ] Git works
- [ ] Java 21 works
- [ ] Node.js 24 works
- [ ] npm works
- [ ] Python 3 works
- [ ] VS Code opens from Terminal
- [ ] Docker Desktop is running
- [ ] Docker Compose works

## Repository

- [ ] Main `synapvault-ai` folder exists
- [ ] Git repository initialized
- [ ] Default branch is `main`
- [ ] Base project folders exist
- [ ] `.gitignore` exists
- [ ] `.editorconfig` exists
- [ ] `.env.example` exists
- [ ] `.env` exists and is ignored
- [ ] `compose.yaml` passes validation

## Infrastructure

- [ ] PostgreSQL container is healthy
- [ ] Redis container is healthy
- [ ] Qdrant container is running
- [ ] MinIO container is running
- [ ] PostgreSQL connection test passes
- [ ] Redis returns `PONG`
- [ ] Qdrant collections API responds
- [ ] Qdrant dashboard opens
- [ ] MinIO console opens
- [ ] `synapvault-documents` bucket exists
- [ ] MinIO bucket is private

## Git

- [ ] `git status` does not include `.env`
- [ ] Initial commit completed