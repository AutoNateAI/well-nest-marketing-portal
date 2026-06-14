# Well Nest Marketing Portal

Next.js + Firebase portal for Well Nest faith-community market research, sermon intelligence, content planning, social scheduling, and retreat funnel tracking.

## Access

- URL: https://autonateai.github.io/well-nest-marketing-portal/
- Firebase project: `autonateai-learning-hub`
- Auth: email/password only in the UI
- Allowed admin email: `autonate.ai@gmail.com`

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
npm run build --prefix functions
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, builds a static Next export, and publishes `out/` to the `gh-pages` branch.

Firebase rules and Functions are deployed separately:

```bash
npx firebase-tools deploy --only firestore:rules --project autonateai-learning-hub
npx firebase-tools deploy --only functions:wellNestApi --project autonateai-learning-hub
```

The deployed API endpoint is:

```text
https://wellnestapi-4qinfaeidq-uc.a.run.app
```
