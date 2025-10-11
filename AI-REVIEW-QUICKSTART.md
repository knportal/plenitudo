# AI Code Review - Quick Start Guide

## 🎯 What You Got

Your project now has a **two-tier code quality system**:

1. **Fast Static Analysis** - Pattern-based (no API key needed)
2. **AI-Powered Deep Review** - Semantic analysis with OpenAI

## 🚀 Quick Start

### 1. Set Your API Key

```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

Or add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
echo 'export OPENAI_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### 2. Run Your First AI Review

```bash
# Review a few files to test
npm run ai:review:changed

# Or review everything
npm run ai:review
```

### 3. Review the Results

The AI will analyze your code and show:

- 🔴 **Critical** - Must fix immediately
- 🟠 **High** - Fix before committing
- 🟡 **Medium** - Should fix soon
- 🔵 **Low** - Nice to fix
- ℹ️ **Info** - Suggestions

Results are saved to `.ai-review-results/` as JSON files.

## 📋 Common Commands

```bash
# During development
npm run quality              # Fast static check (no API needed)
npm run dev:full            # Dev + auto-watch

# Before committing
npm run ai:review:staged    # AI review of staged files only

# Deep analysis
npm run ai:review           # Full AI review of all code
```

## ⚙️ Customize Settings

Edit `.ai-review-config.json` to:

- Change OpenAI model (gpt-4o, gpt-4-turbo, etc.)
- Filter severity levels
- Enable/disable categories
- Adjust file size limits

Example:

```json
{
  "openai": {
    "model": "gpt-4o",
    "temperature": 0.2
  },
  "review": {
    "severity": {
      "showCritical": true,
      "showHigh": true,
      "showMedium": true,
      "showLow": false, // Hide low priority issues
      "showInfo": false
    }
  }
}
```

## 🔄 Revert to Static Analysis Only

If something goes wrong or you want to remove AI review:

```bash
npm run revert:ai-review
```

This safely restores your original setup.

## 💡 Pro Tips

1. **Use staged reviews before commits:**

   ```bash
   git add .
   npm run ai:review:staged
   # Fix issues
   git commit -m "your message"
   ```

2. **Combine with static analysis:**

   ```bash
   npm run quality && npm run ai:review:changed
   ```

3. **Review specific severity levels:**
   Edit `.ai-review-config.json` to hide low/info issues

4. **Save API costs:**
   - Use `ai:review:staged` or `ai:review:changed` instead of full reviews
   - Static analysis is free and fast for quick checks
   - AI review for deeper analysis before important commits

## 🛡️ Safety Features

- ✅ Original `code-quality.js` **unchanged** and backed up
- ✅ Works without API key (falls back to static)
- ✅ Quick revert script available
- ✅ All existing npm scripts still work
- ✅ No breaking changes to your workflow

## 📊 What Gets Analyzed

### Static Analysis (Fast)

- Console.log statements
- TODO/FIXME comments
- Hardcoded values
- Missing error handling
- Memory leaks
- Security patterns

### AI Analysis (Deep)

- Semantic bug detection
- Architecture review
- Security vulnerabilities (context-aware)
- Performance bottlenecks
- Best practices
- Code complexity
- Design patterns

## 🤔 Troubleshooting

**No API key error?**

```bash
export OPENAI_API_KEY="your-key-here"
```

**Want to go back to static only?**

```bash
npm run revert:ai-review
```

**API rate limits?**

- Review fewer files at once
- Use `ai:review:staged` or `ai:review:changed`
- Adjust in config to reduce token usage

**Results not showing?**

- Check `.ai-review-results/` directory
- Verify API key is set
- Check console for error messages

## 📚 More Info

See `DEVELOPMENT_RULES.md` for complete documentation.

## 🎓 Example Workflow

```bash
# 1. Start development
npm run dev:full

# 2. Make changes to your code
# ... edit files ...

# 3. Quick check while coding
npm run quality

# 4. Stage changes
git add .

# 5. Deep AI review before commit
npm run ai:review:staged

# 6. Fix any issues found
# ... make fixes ...

# 7. Commit
git commit -m "Feature: Added awesome feature"

# 8. Final check before push
npm run check-all
npm run build
```

Happy coding! 🚀





