# Kickstart: Futsal Booking System

Kickstart is a comprehensive platform that simplifies the process of registering, booking, and managing futsal turfs. This repository houses both the frontend and backend codebases, enabling a seamless experience for all users involved.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Configuration](#configuration)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
  - [Frontend](#frontend-2)
  - [Backend](#backend-2)
- [Contributing](#contributing)

## Overview

Kickstart provides a seamless experience for turf owners to register their futsal turfs, manage bookings, and for users to find and book available turfs. The platform is divided into two main parts:

- *Frontend:* Built with React, this part of the application provides a user-friendly interface for interacting with the platform.
- *Backend:* Powered by Node.js and Express, this part of the application handles API requests, authentication, and data management.

## Features

### Frontend
- User-friendly interface for turf management and bookings.
- Real-time feedback and notifications.
- Viewing of previous and upcoming bookings.

### Backend
- Secure user authentication using JWT.
- Turf registration, editing, and deletion.
- Booking management for users and owners.
- API to support frontend interactions.

## Technologies Used

### Frontend
- React with Vite
- React Hook Form
- Toastify for notifications
- Vercel for deployment

### Backend
- Node.js with Express
- PostgreSQL
- JWT for authentication
- Render for deployment


## Installation
### Backend

1. *Clone the repository*

```bash
   git clone https://github.com/yourusername/kickstart-futsal.git
   cd kickstart-futsal/backend
```

2. *Install Dependencies*
```bash
    npm install
```

3. *Set up your PostgreSQL database and update .env with your database credentials.*

4. *Run database migrations:*
```bash
      npm run migrate
```

5. *Start the development server:*
```bash
    npm run dev
```

## Configuration
  ### Frontend
  - Ensure that the API endpoints in your frontend are correctly pointing to your deployed backend.
  - Update vercel.json if needed to handle routes properly for static hosting.
  ### Backend
  - Ensure your .env file is correctly set up with environment-specific settings.
  - Make sure ALLOWED_HOSTS and CORS_ALLOWED_ORIGINS are configured properly for your deployment environment.
  - Set up environment variables for sensitive information like JWT_SECRET, database credentials, and any other necessary configuration.


## API Endpoints
  - Key API endpoints include:
  - User Registration: /api/auth/register
  - User Login: /api/auth/login
  - Register Turf: /api/turfs/register
  - Get Turfs: /api/turfs
  - Get User Bookings: /api/bookings/user
  - Book Turf: /api/bookings
  - Get Turf Bookings: /api/bookings/turf/:id

## Deployment
### Frontend
  The frontend is deployed on Vercel. Ensure that your vercel.json is configured correctly for routing. Push your code to the repository, and Vercel will automatically deploy your application.

## Backend
  The backend is deployed on Render. Push your code to the repository, connect to Render, and set up the necessary environment variables for deployment.

## Contributing
  Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to write tests for any new features or bug fixes.

# Links
## [Github](github.com/AmritKandel49/futsal_booking_system)