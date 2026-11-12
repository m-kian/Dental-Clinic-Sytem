# Miguel's Dental System

A modern dental clinic management interface designed to simplify appointment booking and clinic operations.

The system provides a patient-facing website and a dedicated staff portal for managing appointments and viewing dental records.

## Features

- **Clinic Website** — Overview of dental services and clinic information.
- **Appointment Booking** — Select treatments, dentists, preferred dates, and available time slots.
- **Staff Portal** — Staff login and registration interface.
- **Admin Dashboard** — Appointment overview, patient search, and status monitoring.
- **Dental Charting** — Interactive 32-tooth odontogram for recording dental conditions.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Lucide React

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/m-kian/Dental-Clinic-Sytem.git
```

**2. Navigate to the project directory**

```bash
cd Dental-Clinic-Sytem
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Project Structure

```text
Dental-Clinic-Sytem/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   ├── Booking.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Odontogram.jsx
│   │   └── StaffAuth.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Development Status

This project currently serves as a frontend prototype. Authentication, appointment processing, and dashboard records use client-side state and sample data. Backend integration, persistent storage, and actual email notifications are not yet configured.

---

**Built with React and Vite.**
