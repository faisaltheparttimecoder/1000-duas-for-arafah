# GitHub Pages Setup Guide

This guide will help you deploy your 1000 Duas app to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your project code ready to push

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `Dua` (or your preferred name)
   - **Description**: "1000 Duas for Arafah - A collection of supplications"
   - **Visibility**: Choose Public or Private
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: 1000 Duas app"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
5. That's it! The workflow will automatically deploy your site

## Step 4: Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow run called **"Deploy to GitHub Pages"**
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once complete, your site will be live!

## Step 5: Access Your Site

Your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

For example, if your username is `john` and repo is `Dua`:
```
https://john.github.io/Dua/
```

## Automatic Deployments

The GitHub Action is configured to automatically deploy whenever you push to the `main` branch:

```bash
# Make changes to your code
git add .
git commit -m "Update duas or fix bugs"
git push

# Your site will automatically redeploy!
```

## Custom Domain (Optional)

If you want to use a custom domain like `duas.example.com`:

1. Go to **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain
3. Add a `CNAME` file to your repository root with your domain
4. Configure your DNS provider:
   - Add a `CNAME` record pointing to `YOUR_USERNAME.github.io`

## Troubleshooting

### Site not loading?

1. Check the **Actions** tab for any errors
2. Make sure GitHub Pages is enabled in Settings
3. Wait a few minutes - first deployment can take time
4. Check that your repository is public (or you have GitHub Pro for private repos)

### 404 errors?

1. Ensure your `index.html` is in the root directory
2. Check that all file paths are relative (not absolute)
3. Verify the workflow completed successfully

### Service Worker issues?

The service worker is configured for the root path. If deployed to a subdirectory, you may need to update the paths in `service-worker.js`.

## Manual Deployment Trigger

You can manually trigger a deployment:

1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select the branch and click **"Run workflow"**

## Monitoring

- **Actions tab**: See deployment history and logs
- **Environments**: View deployment status and history
- **Settings → Pages**: See current deployment URL

## Security Notes

- The workflow uses minimal permissions (read content, write pages)
- No secrets or API keys are required
- All deployments are logged and auditable

## Next Steps

- ✅ Share your site URL with others
- ✅ Add the URL to your repository description
- ✅ Consider adding a custom domain
- ✅ Monitor the Actions tab for successful deployments

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in your repository.
