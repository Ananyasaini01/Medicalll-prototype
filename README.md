# MediCallfrontend — React Healthcare Assistance Web Application

MediCallfrontend is an independently runnable, buildable, and deployable React frontend application for the MediCall healthcare assistance platform.

It is designed with senior citizens, elderly couples, adults living alone, and distant family members in mind.

## Features

- **Modern Responsive Design**: Senior-friendly interface with large readable typography, high-contrast buttons, and accessible forms.
- **Safety Positioning**: Prominent emergency disclaimer directing life-threatening emergencies to 112 / 911.
- **Three Core Assistance Pathways**:
  1. **Quick Help**: Urgent healthcare items & emergency supplies (10–15 minute target).
  2. **Scheduled Delivery**: Monthly medicine refills, adult briefs, and health supplements.
  3. **Medical Equipment**: ICU home setup, motorized beds, oxygen concentrators, and ventilators with technician support.
- **Visual Status Tracking Timeline**: Step-by-step progress view (`PENDING` -> `ACCEPTED` -> `PROVIDER_ASSIGNED` -> `OUT_FOR_DELIVERY` -> `DELIVERED`).
- **User Dashboard**: Active requests, upcoming scheduled deliveries, past history, and emergency contacts.
- **Admin Portal**: Status update management, provider/technician assignment, and user directory.

## Prerequisites

- Node.js v18+
- npm v9+

## Environment Variables

Create a `.env` file in `MediCallfrontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production deployment:

```env
VITE_API_BASE_URL=https://your-backend-railway-domain.up.railway.app/api
```

## Running Locally

1. Navigate to `MediCallfrontend`:
   ```bash
   cd MediCallfrontend
   ```
2. Install dependencies (if not done):
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173`.

## Production Build

```bash
npm run build
```

The production output directory will be created at `MediCallfrontend/dist/`.

## Vercel / Netlify Deployment

1. Push `MediCallfrontend` repository to GitHub as a standalone repository.
2. Connect to Vercel or Netlify.
3. Set Environment Variable in Vercel/Netlify Dashboard:
   - `VITE_API_BASE_URL`: Your deployed Spring Boot backend URL.
4. Deploy!
