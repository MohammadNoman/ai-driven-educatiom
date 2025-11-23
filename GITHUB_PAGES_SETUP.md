# GitHub Pages Deployment Setup Guide

This guide will help you set up GitHub Pages for your repository.

## Prerequisites

1. Your repository is public (or you have GitHub Pro/Team/Enterprise)
2. You have push access to the repository

## Step 1: Enable GitHub Pages

1. Go to your repository: `https://github.com/MohammadNoman/ai-driven-educatiom`
2. Click on **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Click **Save**

## Step 2: Verify Branch Name

The workflow is configured to work with both `main` and `master` branches. Make sure your default branch matches one of these.

To check/change your default branch:
1. Go to **Settings** → **Branches**
2. Check the default branch name
3. If it's different, either:
   - Rename your branch to `main` or `master`, OR
   - Update the workflow file `.github/workflows/deploy-docusaurus.yml` to use your branch name

## Step 3: Push Your Changes

After enabling GitHub Pages, push your code:

```bash
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

## Step 4: Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy Docusaurus to GitHub Pages"
3. Wait for it to complete (usually 2-5 minutes)
4. Once complete, your site will be available at:
   - `https://mohammadnoman.github.io/ai-driven-educatiom/`

## Troubleshooting

### Workflow Fails

1. Check the **Actions** tab for error messages
2. Common issues:
   - **Node version**: Make sure Node.js 20 is available (already configured)
   - **Dependencies**: Check if `npm ci` fails - might need to commit `package-lock.json`
   - **Build errors**: Check Docusaurus build logs

### Site Not Loading

1. Wait 1-2 minutes after deployment completes (GitHub Pages needs time to propagate)
2. Clear your browser cache
3. Check the URL - make sure it includes the `/ai-driven-educatiom/` path
4. Verify in **Settings** → **Pages** that deployment was successful

### 404 Errors

1. Make sure `baseUrl` in `book/docusaurus.config.ts` matches your repository name: `/ai-driven-educatiom/`
2. Check that `trailingSlash` is set to `false` in the config
3. Verify all internal links use relative paths

### Build Artifacts

The workflow automatically:
- Builds the Docusaurus site
- Uploads it to GitHub Pages
- Deploys it to the `gh-pages` branch (handled automatically by GitHub Actions)

You don't need to manually create or manage the `gh-pages` branch.

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to `book/static/` with your domain name
2. Update `url` in `book/docusaurus.config.ts` to your custom domain
3. Configure DNS settings as per GitHub Pages documentation

## Additional Notes

- The workflow runs on every push to `main` or `master` branch
- Only one deployment runs at a time (concurrency control)
- Build artifacts are automatically cleaned up
- The site is served from the `gh-pages` branch (managed by GitHub Actions)

