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
