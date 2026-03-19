# Caja de Arena

A sandbox therapy tool for psychologists. Therapists log in, manage patients, generate unique session links, and patients use those links to place and arrange figurines on a virtual sand tray. Session state (selected figures, positions, rotations, transformations) is persisted and can be restored later.

## Tech Stack

| Layer    | Technology                                                       |
| -------- | ---------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, React Router, Redux Toolkit, react-draggable |
| Backend  | Express 5, Node.js, PostgreSQL, JWT, bcrypt                     |
| Deploy   | Vercel (frontend), Railway (backend + database)                  |

## Project Structure

```
├── public/                  # Static assets (sand.jpg, logo.png)
├── src/
│   ├── assets/              # God/figurine images (image1–image106.jpg)
│   ├── components/
│   │   ├── DragElement/     # Draggable figurine card (rotate, transform, bury)
│   │   ├── Navbar/          # Navigation bar with save session action
│   │   ├── PatientForm/     # Create new patient form
│   │   ├── PatientList/     # Patient list with session link management
│   │   └── ProtectedRoute/  # Auth and session route guards
│   ├── pages/
│   │   ├── CajaDeArena.tsx  # Sand tray (main interactive page)
│   │   ├── Dashboard.tsx    # Psychologist dashboard
│   │   ├── Login.tsx        # Login page
│   │   ├── SeleccionDioses.tsx # Figurine selection grid
│   │   └── SessionPage.tsx  # Session token validation + snapshot restore
│   └── utils/
│       ├── Api.ts           # API base URL
│       ├── godsSlice.ts     # Redux slice for selected figurines
│       └── ImgRender.tsx    # Figurine image list generator
├── server/
│   └── src/
│       ├── index.ts         # Express server entry point
│       ├── db.ts            # PostgreSQL connection pool
│       ├── routes/
│       │   ├── auth.ts      # Register / Login / Get profile
│       │   ├── patients.ts  # CRUD patients
│       │   ├── sessions.ts  # Create / validate / deactivate sessions
│       │   └── session_events.ts # Save / retrieve session snapshots
│       ├── middleware/
│       │   ├── authToken.ts # JWT auth middleware
│       │   └── verifyToken.ts # Session token middleware
│       └── utils/
│           └── handleError.ts
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database

### Frontend

```bash
npm install
npm run dev
```


### Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Then start the server:

```bash
npm run dev
```

## Test Credentials

Use these credentials to try the live page: https://caja-de-arena.vercel.app/

| Field    | Value              |
| -------- | ------------------ |
| Email    | doctor@test.com    |
| Password | 123456             |

## App Flow

1. **Login** — Psychologist logs in at `/login`.
2. **Dashboard** — Create patients and manage session links at `/dashboard`.
3. **Generate Link** — Click "Generar Link" on a patient card to create a unique session URL.
4. **Session** — Open the link (`/session/:token`). Previous session state is restored automatically.
5. **Select Figurines** — Navigate to "Selección de Dioses" to browse and add figurines.
6. **Sand Tray** — Drag, rotate, transform (perspective), and bury figurines on the sand tray.
7. **Save** — Click "Terminar sesión" in the navbar to persist the current arrangement.

## Available Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start Vite dev server      |
| `npm run build`   | Type-check and build       |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
