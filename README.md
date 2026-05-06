# White Coat Network

## Tech Stack

### Backend
- **Node.js** — runtime
- **`http` module** (built-in) — HTTP server, no Express or any framework
- **nodemon** — dev auto-restart

### Frontend
- **Vanilla HTML5**
- **Vanilla CSS3**
- **Vanilla JavaScript (ES6+)** — no React, Vue, or any framework
- **Google Fonts** (Manrope + Sora) — via CDN
- **serve** — static dev server

---

## Running Locally

Run each in a separate terminal:

```bash
# Terminal 1 — Entire project (frontend + backend)
npm run dev

# Or run individually:
# Backend (http://localhost:5000)
cd backend && npm run dev

# Frontend (http://localhost:3000)
npm run dev-frontend
```

## API Endpoints
- `GET /api/health`
- `GET /api/network/top-pick`
- `GET /api/talks`
- `GET /api/awards`
- `GET /api/directory`
- `GET /api/journal`

## Vercel Deployment
- The project deploys from the root directory.
- Frontend files (`index.html`, `styles.css`, `script.js`) are located at the root for automatic serving.
- Production API runs from Vercel Functions in `api/`.
- Deployment is zero-config via `vercel.json`.

