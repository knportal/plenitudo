#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CodeQualityEngineer {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.optimizations = [];
    }

    // Check for common bugs and issues
    checkForBugs() {
        console.log('🔍 Checking for bugs...');

        // Check for console.log statements
        this.checkConsoleLogs();

        // Check for TODO/FIXME comments
        this.checkTODOs();

        // Check for hardcoded values
        this.checkHardcodedValues();

        // Check for missing error handling
        this.checkErrorHandling();

        // Check for memory leaks
        this.checkMemoryLeaks();

        // Check for security issues
        this.checkSecurity();
    }

    checkConsoleLogs() {
        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                if (line.includes('console.log') && !line.includes('// eslint-disable')) {
                    this.warnings.push({
                        file,
                        line: index + 1,
                        message: 'Remove console.log statements in production code',
                        type: 'console-log'
                    });
                }
            });
        });
    }

    checkTODOs() {
        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                if (line.includes('TODO') || line.includes('FIXME') || line.includes('HACK')) {
                    this.warnings.push({
                        file,
                        line: index + 1,
                        message: `Found ${line.includes('TODO') ? 'TODO' : line.includes('FIXME') ? 'FIXME' : 'HACK'} comment`,
                        type: 'todo'
                    });
                }
            });
        });
    }

    checkHardcodedValues() {
        const files = this.getSourceFiles();
        const hardcodedPatterns = [
            /['"`]https?:\/\/[^'"`]+['"`]/g,
            /['"`]pk\.[^'"`]+['"`]/g,
            /['"`]sk\.[^'"`]+['"`]/g,
            /\b\d{4,}\b/g
        ];

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
                hardcodedPatterns.forEach(pattern => {
                    if (pattern.test(line) && !line.includes('// eslint-disable')) {
                        this.warnings.push({
                            file,
                            line: index + 1,
                            message: 'Consider moving hardcoded values to environment variables',
                            type: 'hardcoded'
                        });
                    }
                });
            });
        });
    }

    checkErrorHandling() {
        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');

            // Check for async functions without try-catch
            const asyncFunctions = content.match(/async\s+function\s+\w+|const\s+\w+\s*=\s*async\s*\(/g);
            if (asyncFunctions) {
                asyncFunctions.forEach(() => {
                    if (!content.includes('try') || !content.includes('catch')) {
                        this.warnings.push({
                            file,
                            line: 0,
                            message: 'Async functions should have proper error handling',
                            type: 'error-handling'
                        });
                    }
                });
            }
        });
    }

    checkMemoryLeaks() {
        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');

            // Check for event listeners without cleanup
            if (content.includes('addEventListener') && !content.includes('removeEventListener')) {
                this.warnings.push({
                    file,
                    line: 0,
                    message: 'Event listeners should be cleaned up to prevent memory leaks',
                    type: 'memory-leak'
                });
            }

            // Check for intervals/timeouts without cleanup
            if ((content.includes('setInterval') || content.includes('setTimeout')) &&
                !content.includes('clearInterval') && !content.includes('clearTimeout')) {
                this.warnings.push({
                    file,
                    line: 0,
                    message: 'Intervals/timeouts should be cleaned up to prevent memory leaks',
                    type: 'memory-leak'
                });
            }
        });
    }

    checkSecurity() {
        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');

            // Check for dangerous patterns
            const dangerousPatterns = [
                /eval\s*\(/g,
                /innerHTML\s*=/g,
                /document\.write/g,
                /\.innerHTML\s*=/g
            ];

            dangerousPatterns.forEach(pattern => {
                if (pattern.test(content)) {
                    this.errors.push({
                        file,
                        line: 0,
                        message: 'Potentially dangerous code detected',
                        type: 'security'
                    });
                }
            });
        });
    }

    // Check for performance optimizations
    checkOptimizations() {
        console.log('⚡ Checking for optimizations...');

        const files = this.getSourceFiles();
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');

            // Check for unnecessary re-renders
            if (content.includes('useState') && content.includes('useEffect')) {
                this.optimizations.push({
                    file,
                    message: 'Consider using useMemo or useCallback to prevent unnecessary re-renders',
                    type: 'performance'
                });
            }

            // Check for large functions
            const lines = content.split('\n');
            if (lines.length > 50) {
                this.optimizations.push({
                    file,
                    message: 'Consider breaking down large functions into smaller ones',
                    type: 'maintainability'
                });
            }

            // Check for duplicate code
            this.checkDuplicateCode(file, content);
        });
    }

    checkDuplicateCode(file, content) {
        const lines = content.split('\n');
        const codeBlocks = {};

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed.length > 10) {
                if (codeBlocks[trimmed]) {
                    codeBlocks[trimmed].push(index + 1);
                } else {
                    codeBlocks[trimmed] = [index + 1];
                }
            }
        });

        Object.entries(codeBlocks).forEach(([code, lineNumbers]) => {
            if (lineNumbers.length > 1) {
                this.optimizations.push({
                    file,
                    message: `Duplicate code found at lines ${lineNumbers.join(', ')}`,
                    type: 'duplicate'
                });
            }
        });
    }

    getSourceFiles() {
        const srcDir = path.join(__dirname, 'src');
        const files = [];

        const walkDir = (dir) => {
            const items = fs.readdirSync(dir);
            items.forEach(item => {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    walkDir(fullPath);
                } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
                    files.push(fullPath);
                }
            });
        };

        walkDir(srcDir);
        return files;
    }

    // Run all checks
    run() {
        console.log('🤖 Professional Code Quality Engineer Starting...\n');

        this.checkForBugs();
        this.checkOptimizations();

        // Run ESLint
        try {
            console.log('🔧 Running ESLint...');
            execSync('npx eslint src/ --format=compact', { stdio: 'inherit' });
        } catch (error) {
            console.log('❌ ESLint found issues');
        }

        // Run TypeScript check
        try {
            console.log('🔧 Running TypeScript check...');
            execSync('npx tsc --noEmit', { stdio: 'inherit' });
        } catch (error) {
            console.log('❌ TypeScript found issues');
        }

        // Report results
        this.report();
    }

    report() {
        console.log('\n📊 Code Quality Report:');
        console.log('========================\n');

        if (this.errors.length > 0) {
            console.log('❌ ERRORS:');
            this.errors.forEach(error => {
                console.log(`  ${error.file}:${error.line} - ${error.message}`);
            });
            console.log('');
        }

        if (this.warnings.length > 0) {
            console.log('⚠️  WARNINGS:');
            this.warnings.forEach(warning => {
                console.log(`  ${warning.file}:${warning.line} - ${warning.message}`);
            });
            console.log('');
        }

        if (this.optimizations.length > 0) {
            console.log('💡 OPTIMIZATIONS:');
            this.optimizations.forEach(opt => {
                console.log(`  ${opt.file} - ${opt.message}`);
            });
            console.log('');
        }

        if (this.errors.length === 0 && this.warnings.length === 0 && this.optimizations.length === 0) {
            console.log('✅ All checks passed! Code quality is excellent.');
        }
    }
}

// Run the quality check
const engineer = new CodeQualityEngineer();
engineer.run();
