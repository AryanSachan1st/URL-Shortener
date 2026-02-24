# 🔗 URL Shortener API

A lightweight REST API that converts long URLs into short, shareable links and redirects users to the original destination. Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- **Shorten URLs** — Generate a unique 10-character alphanumeric short path for any URL
- **Redirect** — Visiting a short URL automatically redirects to the original long URL
- **Idempotent** — Shortening the same URL again returns the existing short link instead of creating a duplicate
- **Protocol Guard** — Automatically prepends `https://` if the stored URL lacks a protocol

---

## 🛠️ Tech Stack

| Layer     | Technology                         |
| --------- | ---------------------------------- |
| Runtime   | Node.js (ESM / `"type": "module"`) |
| Framework | Express.js v5                      |
| Database  | MongoDB with Mongoose              |
| Dev Tool  | Nodemon                            |

---

## 📁 Project Structure

```
backend/src/
├── controllers/
│   └── url.controller.js      # Shorten & redirect logic
├── models/
│   └── urlSet.model.js        # UrlSet schema (originalUrl + shortPath)
├── routes/
│   └── urlShorten.routes.js   # POST /api/v1/url, GET /:path
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── AsyncHandler.js
├── db/
│   └── index.js               # MongoDB connection
├── app.js                     # Express app + global error handler
└── index.js                   # Server entry point
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd URL-Shortener/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in `backend/`:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_uri
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:8000`.

---

## 📡 API Reference

### Shorten a URL

**`POST /api/v1/url`**

**Request Body:**

```json
{
  "original_url": "https://www.example.com/some/very/long/path"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "originalURL": "https://www.example.com/some/very/long/path",
    "shortURL": "http://localhost:8000/aB3xYz12Kp"
  },
  "message": "Short URL created"
}
```

---

### Redirect to Original URL

**`GET /:path`**

Visiting `http://localhost:8000/aB3xYz12Kp` in a browser will **redirect (302)** to the original URL.

Returns `404` if the short path does not exist.

---

## 🗃️ Data Model

### UrlSet

| Field         | Type   | Notes                                    |
| ------------- | ------ | ---------------------------------------- |
| `originalUrl` | String | Required — the full original URL         |
| `shortPath`   | String | Required, Unique — 10-char random string |

---

## ⚡ How It Works

1. Client sends a `POST` request with a long URL.
2. API checks if the URL already exists in the database.
   - **If yes** → returns the existing short link.
   - **If no** → generates a unique 10-character path and saves it.
3. Client visits the short URL → API looks up the path → **redirects** to the original.
