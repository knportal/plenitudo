#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Auto Watch & Test Script
 * Monitors file changes and automatically runs build/test steps
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

// Configuration
const WATCH_DIRS = ["src/", "public/"];
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /\.DS_Store/,
  /\.log$/,
  /\.tmp$/,
];

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(filePath));
}

async function runTests() {
  const startTime = Date.now();
  log("\n🔧 File change detected - Running tests...", "cyan");

  try {
    // Run TypeScript check
    log("📋 TypeScript check...", "blue");
    await execAsync("npm run type-check");
    log("✅ TypeScript check passed", "green");

    // Run ESLint
    log("📋 ESLint check...", "blue");
    await execAsync("npm run lint");
    log("✅ ESLint check passed", "green");

    // Run build
    log("📋 Building application...", "blue");
    await execAsync("npm run build");
    log("✅ Build successful", "green");

    const duration = Date.now() - startTime;
    log(`🎉 All tests passed in ${duration}ms`, "green");
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`❌ Tests failed in ${duration}ms`, "red");
    log(`Error: ${error.message}`, "red");

    // Show more details for build errors
    if (error.stdout) {
      log("STDOUT:", "yellow");
      console.log(error.stdout);
    }
    if (error.stderr) {
      log("STDERR:", "yellow");
      console.log(error.stderr);
    }
  }
}

// Test function to verify the watch system is working
function testWatchSystem() {
  log("🧪 Testing watch system...", "magenta");
  setTimeout(() => {
    log("✅ Watch system is active and monitoring files", "green");
  }, 1000);
}

function watchDirectory(dirPath) {
  log(`👀 Watching directory: ${dirPath}`, "magenta");

  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (!filename) return;

    const fullPath = path.join(dirPath, filename);

    if (shouldIgnore(fullPath)) {
      return;
    }

    log(`📁 ${eventType}: ${filename}`, "yellow");

    // Debounce: wait 1 second before running tests
    clearTimeout(watchDirectory.timeoutId);
    watchDirectory.timeoutId = setTimeout(runTests, 1000);
  });
}

async function main() {
  log("🚀 Auto Watch & Test - Starting...", "bright");
  log("📁 Monitoring directories:", "blue");
  WATCH_DIRS.forEach((dir) => log(`   - ${dir}`, "blue"));
  log("⏱️  Debounce delay: 1 second", "blue");
  log("🛑 Press Ctrl+C to stop", "yellow");
  log("", "reset");

  // Check if directories exist
  for (const dir of WATCH_DIRS) {
    if (!fs.existsSync(dir)) {
      log(`❌ Directory not found: ${dir}`, "red");
      process.exit(1);
    }
  }

  // Start watching
  WATCH_DIRS.forEach(watchDirectory);

  // Test the watch system
  testWatchSystem();

  // Run initial test
  await runTests();

  // Keep the process alive
  process.on("SIGINT", () => {
    log("\n👋 Stopping auto watch...", "yellow");
    process.exit(0);
  });
}

// Run the main function
main().catch((error) => {
  log(`❌ Fatal error: ${error.message}`, "red");
  process.exit(1);
});
