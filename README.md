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

### Browser APIs used in Frontend
- **`fetch`** — API calls to the backend
- **`IntersectionObserver`** — scroll reveal animations
- **`requestAnimationFrame`** — counter animations
- **`Intl.NumberFormat`** — number formatting

> No build tools — no Webpack, Vite, Babel, or TypeScript. Pure static files served as-is.

---

## Frontend
- Location: `frontend/`
- Open `frontend/index.html` directly in a browser for quick preview.
- Frontend fetches data from `http://localhost:5000/api` and falls back to local demo data if backend is offline.

## Backend
- Location: `backend/`
- Start backend:

```bash
cd backend
node server.js
```

## Running in Dev Mode

Run each in a separate terminal:

```bash
# Terminal 1 — backend (runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (runs on http://localhost:3000)
cd frontend
npm run dev
```

## API Endpoints
- `GET /api/health`
- `GET /api/network/top-pick`
- `GET /api/talks`
- `GET /api/awards`
- `GET /api/directory`
- `GET /api/journal`

## Vercel Deployment
- The project deploys from repo root.
- `vercel.json` routes `/` and static assets to `frontend/`.
- Production API runs from Vercel Functions in `api/`:
  - `/api/health`
  - `/api/network/top-pick`
  - `/api/talks`
  - `/api/awards`
  - `/api/directory`
  - `/api/journal`
