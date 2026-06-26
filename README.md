# Supabase Inventory Dashboard

A complete login + inventory dashboard built with **Supabase** (Auth + Postgres) and **vanilla HTML/CSS/JavaScript**.

**No Node.js. No Express. No MySQL.** Open in a browser and it works.

## What you get

- Sign up / log in / log out (Supabase Auth)
- Personal dashboard for each user
- Add / view / delete inventory items
- Live stats: total items, units, value, low-stock alerts
- Row-Level Security — each user only sees their own data

---

## Setup (5 minutes)

### Step 1 — Create a Supabase account & project

1. Go to **https://supabase.com** → Sign up (use GitHub)
2. Click **"New Project"**
3. Project name: `inventory-app`
4. Database password: choose a strong one (save it!)
5. Region: `Mumbai (ap-south-1)`
6. Click **Create new project** → wait 2 minutes

### Step 2 — Run the SQL setup

1. In Supabase dashboard → **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open `setup.sql` from this folder → copy ALL the contents
4. Paste into the SQL Editor → click **Run**
5. You should see "Success. No rows returned."

This creates the `profiles` and `items` tables, sets up Row-Level Security policies, and creates a trigger to auto-create a profile row on signup.

### Step 3 — Get your API credentials

In Supabase dashboard:

1. Click **⚙️ Project Settings** (left sidebar bottom)
2. Click **API**
3. Copy these two values:
   - **Project URL** — like `https://abcdefgh.supabase.co`
   - **anon / public key** — long string starting with `eyJ...`

### Step 4 — Paste them into the project

Open `js/supabase-client.js` and replace the two placeholder lines at the top:

```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY-HERE';
```

with your real values from Step 3.

### Step 5 — Turn off email confirmation (for testing)

So you can log in instantly without confirming an email:

1. Supabase dashboard → **Authentication** → **Providers** → **Email**
2. Toggle **OFF** "Confirm email"
3. Click **Save**

(For production, leave this ON.)

### Step 6 — Run the app

You can simply double-click `index.html` to open it in your browser — but for cleanest behavior, use a local web server:

**Option A — Python (already installed on Linux):**

```bash
cd /home/mythili/inventory-supabase
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

**Option B — Node:**

```bash
cd /home/mythili/inventory-supabase
npx serve
```

**Option C — VS Code:** install the "Live Server" extension and right-click `index.html` → "Open with Live Server".

---

## How to use

1. Visit **http://localhost:8000** → you'll be sent to login
2. Click **"Sign up"** → create an account with any email + password (min 6 chars)
3. You'll land on the dashboard
4. Add items, see stats update live
5. Log out → log back in → your data is still there (synced via Supabase)

Sign up with a **different email** in another browser to see that each user gets their own private inventory — Row-Level Security at work.

---

## Project structure

```
inventory-supabase/
├── index.html              # Entry — redirects to login or dashboard
├── login.html              # Login page
├── signup.html             # Sign up page
├── dashboard.html          # Main inventory dashboard
├── setup.sql               # Run this once in Supabase SQL Editor
├── css/styles.css
├── js/
│   └── supabase-client.js  # PUT YOUR KEYS HERE
└── README.md
```

---

## How it works

| Old project (Express + MySQL) | This project (Supabase) |
|---|---|
| Express routes for `/api/auth/*` | `supabase.auth.signInWithPassword()` |
| bcrypt password hashing | Handled by Supabase |
| express-session cookies | Supabase JWT tokens (in localStorage) |
| MySQL connection pool | PostgreSQL hosted by Supabase |
| Routes for items CRUD | `supabase.from('items').select()` etc. |
| Backend auth middleware | Row-Level Security (RLS) in Postgres |
| Need to install + run a Node server | Open HTML in browser — done |

---

## Troubleshooting

- **"Invalid API key"** → Double-check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `js/supabase-client.js`. No extra spaces, no quotes inside the string.
- **"new row violates row-level security policy"** → You forgot to run `setup.sql`, or you're not signed in.
- **Login says "Invalid login credentials"** → Email confirmation is probably ON. Go to Auth → Providers → Email and turn off "Confirm email" (for testing only).
- **"Failed to fetch" / CORS error** → You opened the HTML directly with `file://`. Use a local server (Step 6 Option A).
- **Nothing happens after signup** → Open browser DevTools → Console tab to see the error.

---

## Security notes

- The **anon key** in `supabase-client.js` is meant to be public. RLS policies protect your data.
- Never paste your **service_role** key into frontend code — that one is admin-level.
- For production: turn email confirmation ON, add rate limiting in Supabase, restrict allowed domains.
