# Miguel's Dental Clinic System

React, Vite, and Tailwind frontend with a Node HTTP API and SQLite database.
Requires Node.js 24 or newer (uses built-in `node:sqlite`).

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `STAFF_PASSWORD` to a strong password.
3. In one terminal run `npm run server`.
4. In another terminal run `npm run dev`, then open the Vite URL.

Vite proxies `/api` requests to the backend at `127.0.0.1:3001`.
The backend creates `server/data/clinic.sqlite` on first start. Database files
and `.env` are ignored by Git. Keep the database on persistent disk and back it up.
`DATABASE_PATH` can override the location.

## Implemented

- Services, dentist profiles, expandable FAQ, and booking preselection.
- Persisted appointment requests with server validation and duration overlap checks.
- “Any available specialist” assigns a dentist with a free interval.
- Staff password authentication with an HttpOnly session cookie; sessions expire
  after eight hours and are cleared when the server restarts.
- Protected appointment list and confirm, complete, or cancel actions.
- Live availability checks against pending and confirmed bookings. Cancelled and
  completed bookings do not block a slot. Dates and times use Asia/Manila.

## Checks

- `npm run build` builds the frontend.
- `npm test` tests real HTTP requests against a temporary SQLite database,
  including persistence after restart, overlapping appointments, validation,
  staff authentication, logout, cancellation, and automatic dentist assignment.

## Remaining work before production

This is a local development implementation. Catalog prices, clinic claims,
profiles, operating hours, and contact information still need clinic approval.
The slot schedule is fixed; dentist-specific schedules and holidays are not yet
implemented. Email/SMS notifications and patient self-service are not enabled.
Tooth charting remains an unsaved demo and is not linked to patient records.

Staff access currently uses one administrator-configured password, not individual
staff accounts. Add individual accounts, role permissions, login rate limits,
audit history, and patient-record controls before using this for real clinic data.

For deployment, serve the frontend and `/api` under the same HTTPS origin with a
reverse proxy and persistent storage; `vite preview` alone does not proxy the API.
Set `NODE_ENV=production` to enable Secure session cookies. No deployment is
configured by this project.
