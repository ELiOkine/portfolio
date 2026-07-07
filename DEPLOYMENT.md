# Deployment Guide

This portfolio is a Next.js 16 app deployed on **Vercel**, connected to the GitHub
repo **`ELiOkine/portfolio`**. Every push to `main` triggers an automatic production
deploy.

- **Live site:** https://emmanuel-okine.vercel.app
- **Repository:** https://github.com/ELiOkine/portfolio
- **Framework:** Next.js 16 (App Router) built with Webpack
- **Node version on Vercel:** 24.x

---

## 1. One-time setup (already done)

These steps were completed when the project was first shipped. They are recorded
here so the process can be repeated for a fresh environment.

### a. Authenticate the tooling

```bash
# GitHub CLI — sign in as the account that owns the repo (ELiOkine)
gh auth login          # GitHub.com → HTTPS → login with a web browser

# Vercel CLI — installed locally in the project (no global install needed)
npm install --no-save vercel
./node_modules/.bin/vercel login   # sign in as the Vercel account (eliokine)
```

### b. Create the GitHub repo and push

```bash
gh auth setup-git
gh repo create ELiOkine/portfolio --public --source=. --remote=origin --push
```

### c. Link the local folder to a Vercel project

```bash
./node_modules/.bin/vercel link --yes --project portfolio
```

This creates a `.vercel/` folder (git-ignored) holding the project + org IDs.

---

## 2. The everyday workflow (Git-based auto-deploy)

Because the Vercel project is connected to GitHub, the normal flow is just Git:

```bash
git add -A
git commit -m "your change"
git push origin main
```

Vercel detects the push, builds, and deploys to production automatically.
No manual deploy command is required day to day.

---

## 3. Manual production deploy (optional / for hotfixes)

If you want to deploy the current local code immediately without going through Git:

```bash
# Build locally first to catch errors early
npm run build

# Deploy the local working tree straight to production
./node_modules/.bin/vercel deploy --prod --yes
```

The command prints a deployment URL like
`https://portfolio-xxxxxxxxx-fleetly123.vercel.app`.

---

## 4. Keeping the clean domain pointed at the latest deploy

The public URL `emmanuel-okine.vercel.app` is a Vercel **alias**. A Git-based
deploy updates it automatically. After a *manual* `vercel deploy --prod`, re-point
the alias at the new deployment URL:

```bash
./node_modules/.bin/vercel alias set <new-deployment-url> emmanuel-okine.vercel.app
```

Example:

```bash
./node_modules/.bin/vercel alias set portfolio-jfjpi2i4r-fleetly123.vercel.app emmanuel-okine.vercel.app
```

---

## 5. Environment variables

| Variable                | Scope       | Value                                  | Purpose                                             |
| ----------------------- | ----------- | -------------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Production  | `https://emmanuel-okine.vercel.app`    | Absolute URLs for OG image, sitemap, and metadata.  |

Set or update it with:

```bash
printf "https://emmanuel-okine.vercel.app" | ./node_modules/.bin/vercel env add NEXT_PUBLIC_SITE_URL production
```

Env-var changes only take effect on the **next** build, so redeploy after changing.

---

## 6. Public access (deployment protection)

By default some Vercel plans enable **Deployment Protection**, which forces a
Vercel login before anyone can view the site. For a public portfolio this must be
**off**. It has already been disabled for this project. To confirm / re-disable via
the dashboard:

**Vercel → Project `portfolio` → Settings → Deployment Protection →
Vercel Authentication → Disabled.**

---

## 7. Live project demos

The interactive demos under `public/live-projects/<name>/` are static builds that
ship with the portfolio and load in an iframe on each project page. They run on
sample data only — no real backends or credentials are involved.

- `fleet/` — Fleetly operator dashboard
- `ismartpay/` — iSmartPay fintech dashboard
- `telecel/` — White-label bundle platform
- `akonta/` — Akonta market-ledger mobile demo (see below)
- `jayee/`, `rentpay/`, `hayapay/` — additional product demos

To add a new demo: drop its built static files in
`public/live-projects/<name>/`, then set `link: '/live-projects/<name>/index.html'`
and `directEmbed: true` on that project in `src/data/projects.ts`.

---

## 8. Common commands reference

```bash
# Local development (Webpack)
npm run dev

# Production build (Webpack) — always run before a manual deploy
npm run build

# Who am I logged in as
gh auth status
./node_modules/.bin/vercel whoami

# List deployments / aliases / projects
./node_modules/.bin/vercel ls
./node_modules/.bin/vercel alias ls
./node_modules/.bin/vercel project ls
```

---

## 9. Troubleshooting

| Symptom                                   | Fix                                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| Build fails with a Turbopack error        | The `build` script uses `next build --webpack`; keep it that way on this machine.|
| Site asks for a Vercel login              | Disable Deployment Protection (section 6).                                       |
| Clean domain shows an old version         | Re-point the alias at the newest deployment (section 4).                         |
| OG image / sitemap uses the wrong URL     | Update `NEXT_PUBLIC_SITE_URL` and redeploy (section 5).                          |
| A project card image looks stale locally  | Delete `.next/cache/images`; Vercel regenerates images per deploy.               |
