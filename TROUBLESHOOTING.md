# GitHub Pages Deployment Troubleshooting

## Common Errors and Solutions

### Error 1: "Environment 'github-pages' not found"

**Solution:**
1. Go to your repository: https://github.com/MohammadNoman/ai-driven-educatiom/settings/pages
2. Under "Source", make sure "GitHub Actions" is selected
3. Click "Save"
4. This will automatically create the `github-pages` environment

### Error 2: Build Fails - PostCSS/Tailwind Errors

**Solution:**
- The `postcss.config.js` file has been restored
- Make sure it's committed to the repository
- The file should be in `book/postcss.config.js`

### Error 3: "npm ci" Fails

**Possible causes:**
- Missing `package-lock.json` in the `book/` directory
- Corrupted lock file

**Solution:**
```bash
cd book
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Error 4: Build Succeeds but Site Shows 404

**Solution:**
1. Check that `baseUrl` in `book/docusaurus.config.ts` is exactly: `/ai-driven-educatiom/`
2. Wait 2-5 minutes after deployment (GitHub Pages needs time to propagate)
3. Clear browser cache
4. Try accessing: `https://mohammadnoman.github.io/ai-driven-educatiom/`

### Error 5: Permission Denied Errors

**Solution:**
1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Save

### Error 6: Workflow Runs but No Deployment

**Check:**
1. Go to Actions tab
2. Click on the failed workflow run
3. Expand each step to see error messages
4. Common issues:
   - Missing dependencies
   - Build errors in Docusaurus
   - Path issues

## How to Check Workflow Logs

1. Go to: https://github.com/MohammadNoman/ai-driven-educatiom/actions
2. Click on the workflow run (e.g., "Deploy Docusaurus to GitHub Pages #8")
3. Click on the "deploy" job
4. Expand each step to see detailed logs
5. Look for red X marks or error messages

## Quick Fix Checklist

- [ ] GitHub Pages enabled with "GitHub Actions" as source
- [ ] `postcss.config.js` exists in `book/` directory
- [ ] `package-lock.json` exists in `book/` directory
- [ ] Workflow permissions are set correctly
- [ ] `baseUrl` matches repository name exactly
- [ ] All changes are committed and pushed

## Still Having Issues?

Share the specific error message from the Actions tab, and I can help you fix it!

