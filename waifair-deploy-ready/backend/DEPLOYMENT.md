# Waifair Backend API — Railway & Render Deployment Guide

Yeh folder (`backend/`) Waifair ka production-ready backend API hai jo **Railway** aur **Render** dono pe 1-click deployment ke liye configured hai.

---

## 1. Deploy on Render (Recommended & Free Tier Available)

### Option A: Render Blueprints (Automatic)
1. Apni GitHub repository mein push karein.
2. [Render Dashboard](https://dashboard.render.com/) pe jayein.
3. **New +** > **Blueprint** select karein.
4. Apni repository connect karein. Render automatically `backend/render.yaml` read karke deployment create kar dega.

### Option B: Render Web Service (Manual)
1. Render Dashboard pe jayein > **New +** > **Web Service**.
2. GitHub repo connect karein.
3. Settings configure karein:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Health Check Path:** `/health`
4. Environment Variables add karein:
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://wai-fair.com` (ya aapka Vercel URL)
5. **Create Web Service** pe click karein. Render aapko live URL dega: `https://waifair-backend-api.onrender.com`.

---

## 2. Deploy on Railway

1. [Railway Dashboard](https://railway.app/) pe login karein.
2. **New Project** > **Deploy from GitHub repo** select karein.
3. Repo select karein.
4. Settings mein jayein:
   - **Root Directory:** `/backend`
   - **Healthcheck Path:** `/health`
5. Railway automatically `backend/railway.json` detect karega aur build start kar dega.
6. **Generate Domain** pe click karein taake aapko public live HTTPS URL mil jaye.

---

## 3. Local Testing

Backend ko local machine pe chalane ke liye:

```bash
cd backend
npm install
npm run dev
```

Server `http://localhost:5000` pe start hoga.
Health Check: `http://localhost:5000/health`
