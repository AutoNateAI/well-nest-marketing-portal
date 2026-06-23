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

## OpenAI setup

The OpenAI key must stay server-side. For local shell access across projects, add the key to `~/.zshrc`:

```bash
export OPENAI_API_KEY="sk-..."
source ~/.zshrc
```

For deployed Firebase Functions, configure the same key as a backend secret/environment variable before using carousel image generation. Do not expose it through any `NEXT_PUBLIC_*` variable.

```bash
printf "%s" "$OPENAI_API_KEY" | npx firebase-tools functions:secrets:set OPENAI_API_KEY --project autonateai-learning-hub --data-file -
```

## YouTube sermon processing

Sermon processing uses this order:

1. Public YouTube captions when available.
2. `yt-dlp` audio download into `/tmp`.
3. OpenAI transcription with `whisper-1`.
4. OpenAI sermon review extraction.

YouTube often blocks Cloud Run downloads unless signed-in browser cookies are provided. Export YouTube cookies in Netscape format with a browser extension such as `Get cookies.txt LOCALLY`, then set them as a Firebase secret:

```bash
npx firebase-tools functions:secrets:set YOUTUBE_COOKIES --project autonateai-learning-hub --data-file /path/to/youtube-cookies.txt
npx firebase-tools deploy --only functions:wellNestApi --project autonateai-learning-hub
```

Do not commit cookies. They are account credentials.

### Local sermon worker

Cloud Run can still be restricted by YouTube even with cookies. Use the local worker on this Mac when a sermon needs audio transcription:

```bash
zsh -ic 'npm run process:sermon -- <sermonId>'
```

The worker uses local `yt-dlp`, `.secrets/youtube-cookies-trimmed.txt`, OpenAI transcription, and Firestore Admin SDK to update the sermon record to `Review Ready`.

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

## Operational docs

- [Facebook Page publishing setup](docs/facebook-page-publishing.md)
