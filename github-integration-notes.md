# Plutoploy - GitHub Integration Architecture Notes

This document summarizes the architectural decisions and strategies for integrating GitHub into Plutoploy, particularly focusing on handling heavy API traffic on the frontend and receiving webhook notifications for deployments.

## 1. Shifting API Load to the Frontend

To reduce load on the backend, the application can perform heavy GitHub API operations directly from the React frontend.

**Workflow:**
1. The Backend handles the initial OAuth flow and securely passes the GitHub Access Token to the Frontend.
2. The Frontend uses `fetch` to call `api.github.com` directly.
3. The Frontend manages fetching the user's repositories and committing the `.github/workflows/deploy.yml` workflow file.

**Security Consideration:** Sending full `repo` scoped OAuth tokens to the frontend is a security risk if the app is vulnerable to XSS. To mitigate this securely, a **GitHub App** should be used instead of an OAuth App.

## 2. GitHub App vs. OAuth App

For a service injecting workflows and managing deployments, a GitHub App is the recommended approach.

### GitHub OAuth App (Standard Login)
- Grants broad permissions to the entire user account (e.g., all public and private repos).
- Acts exactly as the user.
- If the token is stolen from the frontend, an attacker has full access to the user's account.

### GitHub App (Recommended)
- Grants fine-grained permissions (e.g., only "Contents: Read & Write" and "Workflows: Read & Write").
- Users install the app *only on specific repositories*, not their entire account.
- Backend can generate short-lived "Installation Access Tokens" explicitly for those selected repositories, making them safe to pass to the frontend.

## 3. Webhooks & Deployment Triggers

Plutoploy needs a mechanism to be notified when the injected GitHub Actions workflow (`.yaml`) finishes building the application's Docker image so the deployment can proceed.

### Option A: GitHub App Webhooks
- Native platform solution.
- The GitHub App subscribes to the `workflow_run` event.
- When the build finishes, GitHub securely sends a signed `POST` request to the backend with the build payload.

### Option B: The `curl` Step (Simpler)
- The injected `.yaml` workflow includes a final step that executes a `curl` command to ping the backend when successful.
- Example:
  ```yaml
  - name: Notify Plutoploy Backend to Deploy
    run: |
      curl -X POST https://api.plutoploy.com/deploy \
      -H "Authorization: Bearer ${{ secrets.deploy_token }}" \
      -d '{"image_tag": "${{ github.sha }}"}'
  ```

## 4. Localhost Development for Webhooks

Because GitHub cannot send requests directly to a local development machine (`localhost`), a secure tunnel must be used to test webhooks while building the application.

1. **Ngrok:** Use `ngrok http 8787` (assuming the backend runs on port 8787) to generate a public URL. Place this URL in the GitHub webhook settings or the YAML `curl` step.
2. **GitHub CLI (For GitHub Apps):** Use `gh webhook forward --events=workflow_run --url=http://localhost:8787/webhook` to natively forward events to the local environment.
