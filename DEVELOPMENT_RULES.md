# Development Rules & Automation

## 🚀 Automated Build & Test Workflow

This project includes automated build and test steps that run after any code changes.

### 📋 Available Commands

#### Manual Testing
```bash
# Run all tests once
npm run auto-test

# Run basic tests (no API test)
npm run test:full

# Run individual checks
npm run type-check    # TypeScript compilation
npm run lint          # ESLint code quality
npm run build         # Next.js production build
```

#### Automated Watching
```bash
# Start dev server + auto-watch (RECOMMENDED)
npm run dev:full

# Watch files and auto-run tests on changes
npm run watch

# Run initial test, then watch for changes
npm run watch:test
```

### 🔄 Automatic Workflow

**After ANY file change in `src/` or `public/`:**

1. **TypeScript Check** - Ensures type safety
2. **ESLint Linting** - Code quality and style checks
3. **Next.js Build** - Production build verification
4. **API Test** - Live endpoint testing (if server running)

### ⚡ Features

- **Debounced Execution**: 1-second delay prevents excessive runs
- **Error Handling**: Clear error messages with full output
- **Performance Tracking**: Shows execution time
- **File Filtering**: Ignores build artifacts and temp files
- **Color-coded Output**: Easy to read status messages

### 🎯 Quality Gates

All changes must pass:
- ✅ TypeScript compilation (no type errors)
- ✅ ESLint rules (code quality)
- ✅ Next.js build (production ready)
- ✅ API functionality (if server running)

### 🛠️ Development Workflow

#### Option 1: Single Command (RECOMMENDED)
```bash
npm run dev:full
```
This starts both the dev server and auto-watch system in one command.

#### Option 2: Separate Commands
1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Start Auto-Watch** (in another terminal):
   ```bash
   npm run watch
   ```

3. **Make Changes**: Edit any file in `src/` or `public/`

4. **Automatic Testing**: Tests run automatically after 1 second

5. **Fix Issues**: Address any failing tests before continuing

### 📁 Monitored Directories

- `src/` - All source code
- `public/` - Static assets

### 🚫 Ignored Files

- `node_modules/`
- `.next/`
- `.git/`
- `.DS_Store`
- `*.log`
- `*.tmp`

### 🔧 Configuration

- **Debounce Delay**: 1 second
- **Watch Mode**: Recursive directory watching
- **Error Handling**: Graceful failure with detailed output
- **Performance**: Optimized for fast feedback

### 💡 Best Practices

1. **Always run tests** before committing
2. **Fix errors immediately** when they appear
3. **Use the watch mode** during active development
4. **Check build output** for production readiness
5. **Verify API functionality** with live server

### 🚨 Troubleshooting

**Tests failing?**
- Check TypeScript errors: `npm run type-check`
- Fix linting issues: `npm run lint`
- Verify build: `npm run build`

**Watch not working?**
- Ensure you're in the project root
- Check file permissions: `chmod +x auto-watch.js`
- Verify Node.js is installed

**API tests failing?**
- Start the dev server: `npm run dev`
- Check server is running on port 3000
- Verify API endpoint is accessible

---

**Remember**: These automated checks ensure code quality and prevent regressions. Always address failing tests before continuing development!

## 🎯 Professional TypeScript Rules

This project uses strict TypeScript configuration for professional development:

### Strict Type Safety
- `noImplicitAny`: Prevents implicit any types
- `noImplicitReturns`: Ensures all code paths return values
- `noImplicitThis`: Prevents implicit any for this context
- `noUnusedLocals`: Flags unused local variables
- `noUnusedParameters`: Flags unused function parameters
- `exactOptionalPropertyTypes`: Strict optional property handling
- `noImplicitOverride`: Requires explicit override keyword
- `noPropertyAccessFromIndexSignature`: Prevents unsafe property access
- `noUncheckedIndexedAccess`: Adds undefined to index access results
- `useUnknownInCatchVariables`: Uses unknown instead of any in catch blocks

### Code Quality
- `forceConsistentCasingInFileNames`: Enforces consistent file naming
- `noFallthroughCasesInSwitch`: Prevents switch fallthrough bugs
- `allowUnusedLabels`: Prevents unused labels
- `allowUnreachableCode`: Prevents unreachable code
- `verbatimModuleSyntax`: Ensures proper module syntax

### Modern JavaScript/TypeScript
- `target`: ES2022 for modern features
- `moduleDetection`: Force module detection
- `allowImportingTsExtensions`: Prevents importing .ts files
- `noEmitOnError`: Prevents emitting on errors
- `allowSyntheticDefaultImports`: Enables default imports
- `experimentalDecorators`: Enables decorator support
- `emitDecoratorMetadata`: Emits decorator metadata

## 🔧 Code Quality Analysis

The project includes automated code quality analysis that checks for:

### Bug Detection
- Console.log statements in production code
- TODO/FIXME/HACK comments
- Hardcoded values (URLs, API keys, large numbers)
- Missing error handling in async functions
- Memory leaks (event listeners, intervals, timeouts)
- Security issues (eval, innerHTML, document.write)

### Performance Optimizations
- Unnecessary re-renders in React components
- Large functions that should be broken down
- Duplicate code detection
- Memory leak prevention

### Code Style
- ESLint integration with Next.js and TypeScript rules
- Prettier formatting
- Consistent code structure

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development**:
   ```bash
   npm run dev:full
   ```

3. **Make Changes**: Edit files in `src/` or `public/`

4. **Automatic Testing**: Tests run automatically on file changes

5. **Check Quality**: Run `npm run quality` for detailed analysis

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:full` - Start dev server with auto-watch
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript check
- `npm run quality` - Run code quality analysis
- `npm run format` - Format code with Prettier
- `npm run watch` - Watch files and auto-test
- `npm run auto-test` - Run all tests once
- `npm run test:full` - Run basic tests (no API)
- `npm run check-all` - Run all checks

## 🎯 Quality Standards

This project maintains high quality standards through:

1. **Type Safety**: Strict TypeScript configuration
2. **Code Quality**: Automated linting and analysis
3. **Testing**: Automated testing on file changes
4. **Performance**: Build verification and optimization checks
5. **Security**: Security pattern detection
6. **Maintainability**: Code duplication and complexity analysis

All code must pass these quality gates before being considered ready for production.

---

## ✅ Beta Signup & Responsive UX Rules

These rules protect the beta waitlist flow and the new responsive design so future changes don’t accidentally break them.

### 1. Beta Signup Backend Rules

- **Prisma schemas**
  - Local development uses **`prisma/schema.dev.prisma`** with SQLite.
  - Production uses **`prisma/schema.prisma`** with Postgres.
  - After changing the `BetaSignup` model:
    - Dev:
      ```bash
      DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma
      DATABASE_URL="file:./prisma/dev.db" npx prisma db push --schema=./prisma/schema.dev.prisma
      ```
    - Prod (CI/deploy):
      ```bash
      npx prisma migrate deploy --schema=./prisma/schema.prisma
      ```

- **API contracts (do not break without updating the UI)**:
  - `POST /api/beta-signup`:
    - Accepts `{ email: string }`.
    - Always **normalizes email**: lowercase + trim.
    - Returns:
      - `requiresVerification: true` when an email verification link is sent.
      - `message` and/or `error` for UX copy.
    - Must keep:
      - Format validation + disposable email blocking.
      - Unique email constraint.
      - Token generation and storage on `BetaSignup.verificationToken`.
  - `GET /api/beta-signup/verify`:
    - Reads `token` query param.
    - On success/failure, redirects to `/` with `?verified=success|already` or `?error=...`.
    - Do not change these query keys without updating `VerificationBanner`.

- **Environment variables required in production**:
  - `DATABASE_URL` – Postgres connection string.
  - `RESEND_API_KEY` – for outbound email (or equivalent email provider).
  - `NEXT_PUBLIC_APP_URL` – used to build verification links in emails.

### 2. Beta Signup Frontend Rules

- **Header & navigation**
  - `PlHeader` lives in `src/app/layout.tsx` and is **global + fixed**.
    Do not re-mount it per page.
  - All in-page section links (`Feed`, `Rooms`, `Prompts`) use `Link` with hashes (`/#feed-title`, etc.) and rely on the hash-scroll `useEffect` in `PlHeader`.

- **Join beta button**
  - The header “Join beta” button must use the **same `btn-primary` gradient style** as the hero “Explore Feed” button for visual consistency.
  - Desktop and mobile “Join beta” actions must both open the same modal in `PlHeader`.

- **Join beta modal**
  - Must be rendered with `createPortal(..., document.body)` to stay fully centered and independent of header layout.
  - Close behavior:
    - Clicking background closes **only when not loading**.
    - “Cancel” resets email + status + error.
  - State machine:
    - `idle` → `loading` → `success` or `error`.
    - When `requiresVerification` is true, keep showing the “Check your email” success state before auto-closing.

- **Verification banner**
  - `VerificationBanner` reads `verified` and `error` from search params on `/`.
  - Any changes to redirect params in the API must be mirrored in this component.

### 3. Responsive Design & Accessibility Rules

- **Touch targets**
  - All buttons and clickable controls must have **min-height `44px`** (either via Tailwind `min-h-[44px]` or shared `.btn-*` styles).

- **Text sizes**
  - Use responsive typography: `text-xs sm:text-sm`, `text-base sm:text-lg`, etc.
  - Avoid locking large text sizes on very small screens (e.g. `text-4xl` without a smaller mobile size).

- **Layout & overflow**
  - No horizontal scrolling on the main layout:
    - `body { overflow-x: hidden; }` is already set in `globals.css` – do not override it.
  - Background effects (`PlBackgroundFX`) must stay behind content:
    - Use `fixed inset-0 -z-10 overflow-hidden`.
    - Avoid adding new large gradient blobs that create “ghost shadows” on edges.

- **Logo**
  - Always use `PlLogoMark` (not raw `<Image>` tags) so size and behavior stay consistent.
  - `PlLogoMark` sizes (`sm`, `md`, `lg`) are responsive; do not hardcode conflicting widths/heights around it.

When changing any of the above areas, **run a quick manual regression**:
- Test beta signup with a valid and invalid email.
- Click the verification link and confirm the banner shows on `/`.
- Check header + logo + “Join beta” on:
  - Mobile width (~375px),
  - Tablet (~768px),
  - Desktop (~1280px+).
