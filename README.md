# NGO Impact Tracker

A web application to help NGOs submit monthly impact reports and enable admins to view aggregated insights.

## Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- SQLite
- Multer & csv-parser

## Features

- Submit individual NGO monthly reports
- Bulk CSV upload with async background processing
- Job status tracking with partial failure handling
- Admin dashboard with monthly aggregation

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

### API Endpoints
- POST /report
- POST /reports/upload
- GET /job-status/:jobId
- GET /dashboard?month=YYYY-MM

### Deployed Links
- Frontend: (add after deployment)
- Backend: (add after deployment)

### Improvements

- Authentication for admin routes
- Persistent job storage
- Retry mechanism for failed CSV rows
- Pagination & filters in dashboard
