# Flask Backend for Transport Management System

This folder contains a Flask API used by the Next.js frontend.

## Project layout

```
transport-management/
│
├── app.py             # application entrypoint
├── config.py          # loads environment variables
├── requirements.txt
├── .env               # secret configuration
│
├── models/            # simple in-memory models
│   ├── user_model.py
│   ├── vehicle_model.py
│   ├── booking_model.py
│   └── driver_model.py
│
├── routes/            # blueprint modules for each resource
│   ├── auth_routes.py
│   ├── vehicle_routes.py
│   ├── booking_routes.py
│   └── driver_routes.py
│
├── utils/             # helper utilities
│   ├── jwt_handler.py
│   └── helpers.py
│
└── middleware/        # request middleware (e.g. auth)
    └── auth_middleware.py
```

## Setup

1. **Create & activate a virtual environment** (optional but recommended):
   ```powershell
   cd server
   python -m venv venv
   .\venv\Scripts\Activate.ps1   # Windows PowerShell
   ```

2. **Install dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Run the server**
   ```powershell
   python app.py
   ```

   The API will be available at `http://localhost:5000`.

## Available endpoints

- `GET /api/health` – health check
- `POST /api/auth/signup` – create account (returns JWT)
- `POST /api/auth/login` – log in (returns JWT)
- `GET/POST /api/vehicles` – list or add vehicles
- `GET/POST /api/bookings` – list or create bookings
- `GET/POST /api/drivers` – list or add drivers

All other routes are currently simple in-memory stubs; expand them as needed.

The frontend (`next` app) can call the endpoints directly. Example:

```js
fetch("http://localhost:5000/api/vehicles")
  .then(r => r.json())
  .then(data => console.log(data));
```