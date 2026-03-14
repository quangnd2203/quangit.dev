# Build Process Rules

## Build Command Guidelines

### Development Workflow

1. **During Active Development:**
   - Use `npm run dev` for development server
   - Hot reload is enabled - no need to rebuild after code changes
   - **RULE: DO NOT run `npm run build` immediately after making code changes during development**
   - Only run build when you're ready to verify or commit

2. **Before Committing:**
   - **MUST run `npm run build`** to verify code compiles successfully
   - Fix any build errors before committing
   - Ensure TypeScript type checking passes (`npm run type-check`)

3. **Build Verification:**
   - Build must pass without errors before:
     - Committing changes
     - Pushing to remote
     - Creating pull requests
     - Deploying to production
     - Merging to main branch

### Important Rule: Build Timing

**DO NOT run `npm run build` immediately after code changes during development.**

**Reason:**
- `npm run dev` handles hot reload automatically
- Running build during development is unnecessary and slows workflow
- Build should only be run when:
  - Verifying code compiles before commit
  - Testing production build
  - Before deploying

### Build Commands

```bash
# Development server (use during development)
npm run dev

# Production build (run before commit/deploy)
npm run build

# Type checking only
npm run type-check

# Linting
npm run lint
```

### Rule: Build Before Commit

**IMPORTANT:** After making code changes, you MUST run `npm run build` successfully before:
- Committing changes
- Pushing to remote
- Creating pull requests
- Deploying

**Exception:** During active development with `npm run dev` running, you can skip build until you're ready to commit.

### Build Checklist

Before committing code changes:
- [ ] Run `npm run build` - must pass without errors
- [ ] Run `npm run lint` - fix any linting warnings
- [ ] Run `npm run type-check` - ensure no TypeScript errors
- [ ] Test in browser with `npm run dev`
- [ ] Verify all features work correctly

### Common Build Issues

1. **TypeScript Errors:**
   - Fix all type errors before building
   - Use `npm run type-check` to check types

2. **Linting Warnings:**
   - Fix critical warnings
   - Non-critical warnings can be addressed later

3. **Import Errors:**
   - Verify all imports are correct
   - Check file paths and exports

### CI/CD Integration

If using CI/CD:
- Build step should run `npm run build`
- Fail build on any errors
- Run linting and type checking in CI pipeline
