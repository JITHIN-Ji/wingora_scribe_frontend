# Frontend — Voice Assistant UI

Concise guide for the frontend app: tech stack, how to run locally, what we built, and implementation notes for developers.

---

## 🚀 What we built
- A single-page app (SPA) for medical audio workflows:
  - Record or upload audio, send to backend for transcription & SOAP note generation
  - Display diarized transcript and SOAP sections (Subjective/Objective/Assessment/Plan)
  - Patient management (create/list/select)
  - Login via Google OAuth and email/password flows
  - Approve plan actions (appointments/email)
  - Simple chat Q/A against SOAP summary

## 🧩 Tech stack & tools
- **Framework:** React 18 + TypeScript
- **Bundler / Dev server:** Vite
- **HTTP client:** axios (configured with `withCredentials: true`)
- **Routing:** react-router-dom
- **OAuth:** @react-oauth/google
- **State/context:** React Context (AuthContext)
- **Audio capture / UI:** MediaRecorder API, HTML5 Audio element, simple visualizer (Web Audio API)
- **Optional:** Supabase client present (for any external storage/auth extensions)

## ⚙️ Quick start (local)
1. Navigate to `frontend/`
2. Install dependencies:
   - `npm install` (or `pnpm` / `yarn`)
3. Start dev server:
   - `npm run dev`
4. Open `http://localhost:5173` (or the port printed by Vite)

Build for production:
- `npm run build` (compiles TypeScript and builds Vite bundle)
- `npm run start` runs `server.js` (simple static server) for serving the `dist` folder

## 🔧 Important env vars
- `VITE_API_URL` — URL of the backend API (defaults to the deployed API if not set)
- For local dev, you can point this at `http://localhost:8000`

## 🗂️ Key files & structure
- `src/App.tsx` — top-level routing and app layout
- `src/main.tsx` — app bootstrap, providers
- `src/api/client.ts` — axios instance and API wrappers (use `api.processAudio`, `api.getAudioUrl`, etc.)
- `src/contexts/AuthContext.tsx` — authentication state and helpers
- `src/components/AudioRecorder.tsx` — MediaRecorder-based audio capture and live visualizer
- `src/components/AudioUpload.tsx` — upload file UI and API integration
- `src/pages/*` — page components (Home, Login, Doctor, Receptionist, User)
- `src/types.ts` — shared TypeScript types for API responses

## Integration notes & tips 💡
- API requests require credentials for cookie auth; axios instance sets `withCredentials: true` by default.
- `/process_audio` expects `multipart/form-data` with `audio` and `patient_id`; the client shows a helpful check to ensure `patient_id` is set.
- Recorded audio is `webm` (MediaRecorder) — backend converts to WAV if needed. Use `api.getAudioUrl(storagePath)` to obtain download URL.
- For streaming playback, the backend supports `Range` requests; make sure player requests include range headers.
- Keep `VITE_API_URL` set correctly for dev and production to avoid CORS/auth issues.

## Testing & quality
- Type-checks are enforced via TypeScript build (`npm run build` runs `tsc -b`).
- Recommended additions: `eslint`, `vitest`/`jest` for unit tests, and CI workflow for lint + build.

## Security notes
- Auth uses HttpOnly JWT cookie — front-end should rely on endpoint responses and `authApi.verifyToken()` checks rather than reading token directly.
- Do not log sensitive patient data to console in production.

---

