# Kickstart: Futsal Booking System

Kickstart is a comprehensive platform that simplifies the process of registering, booking, and managing futsal turfs. This repository houses both the frontend and backend codebases, enabling a seamless experience for all users involved.

# [Demo Video Link](https://www.loom.com/share/69665b736adb440e8f14c98f7e088a7f?sid=3a23c583-a9f4-46df-ab72-fc82803bb8d6)

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
   git clone https://github.com/amritkandel49/kickstart-futsal.git
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
  ### Backend
  - Ensure your .env file is correctly set up with environment-specific settings.
  - Make sure ALLOWED_HOSTS and CORS_ALLOWED_ORIGINS are configured properly for your deployment environment.
  - Set up environment variables for sensitive information like JWT_SECRET, database credentials, and any other necessary configuration.



## Deployment
### Frontend
  The frontend is deployed on render.

## Backend
  The backend is deployed on Render. Push the code to the repository, connect to Render, and set up the necessary environment variables for deployment.

## Contributing
  Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to write tests for any new features or bug fixes.

# Links
## [Github](github.com/AmritKandel49/futsal-booking-system)
## [Backend](https://futsal-backend-tylv.onrender.com)
## [Frontend](https://kickstart-client.onrender.com/)
