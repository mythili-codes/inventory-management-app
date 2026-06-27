# 📦 Inventory Management App

> A full-stack inventory dashboard with secure authentication, user-isolated data, and live stats — built with **Supabase** + **vanilla JavaScript**.

**🌐 Live Demo:** [mythili-inventory.netlify.app](https://mythili-inventory.netlify.app)
**📂 Source:** [github.com/mythili-codes/inventory-management-app](https://github.com/mythili-codes/inventory-management-app)

---

## ✨ Features

- 🔐 **Secure authentication** — sign up, log in, log out (Supabase Auth)
- 👤 **Personal dashboard** — each user sees only their own inventory
- ➕ **Full CRUD** — add, view, and delete inventory items
- 📊 **Live stats** — total items, total units, inventory value, low-stock alerts
- 🛡️ **Row-Level Security** — enforced at the database layer (Postgres RLS)
- 🚀 **Zero backend code** — no Node, no Express, no MySQL — just HTML + Supabase
- 🌍 **Deployed on Netlify** — free hosting, auto-deploys on git push

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | HTML, CSS, vanilla JavaScript |
| **Auth** | Supabase Auth (JWT-based) |
| **Database** | Supabase (PostgreSQL) |
| **Security** | Row-Level Security (RLS) policies |
| **Hosting** | Netlify |
| **Version control** | Git + GitHub |

---

## 🎯 Try it out

1. Visit the [live demo](https://mythili-inventory.netlify.app)
2. Click **Sign up** → create a free test account
3. Add a few inventory items
4. Log out, log back in — your data persists ✅

Sign up with a **different email** in another browser tab — you'll see each user gets a private inventory. That's RLS in action.

---

## 🛠️ Run locally

### 1. Clone

```bash
git clone https://github.com/mythili-codes/inventory-management-app.git
cd inventory-management-app
```

### 2. Set up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project (any region close to you)
3. Open **SQL Editor** → paste `setup.sql` → Run
4. Open **SQL Editor** → paste `fix-permissions.sql` → Run
5. Copy your **Project URL** and **anon public key** from Project Settings → API

### 3. Configure credentials

Open `login.html`, `dashboard.html`, and `signup.html` — replace these two lines with your values:

```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...your-anon-key';
```

> The anon key is safe to expose — RLS policies protect data at the database level.

### 4. Serve locally

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) 🎉

---

## 📁 Project structure

```
inventory-management-app/
├── index.html              # Landing — redirects to dashboard or login
├── login.html              # Login (inline Supabase client)
├── signup.html             # Signup
├── dashboard.html          # Main dashboard — CRUD + stats
├── setup.sql               # Tables, RLS policies, signup trigger
├── fix-permissions.sql     # GRANT permissions for `authenticated` role
├── css/styles.css          # All styles
├── js/supabase-client.js   # Shared client + helpers
└── README.md
```

---

## 🔍 How it works

### Authentication flow

1. User signs up with email + password → Supabase stores hashed password
2. On login, Supabase returns a JWT → stored in browser localStorage
3. Every database request carries this JWT → Postgres knows who you are
4. RLS policies filter every query: `user_id = auth.uid()`

### Data isolation (RLS)

```sql
CREATE POLICY "Users can only see their own items"
  ON items FOR SELECT
  USING (user_id = auth.uid());
```

Even if two users somehow query the same table — Postgres only returns the rows belonging to the logged-in user. No backend logic required.

---

## 🚀 Deployment

Deployed via Netlify with auto-deploy on `git push`:

1. Push to GitHub
2. Netlify rebuilds and deploys in ~30 seconds
3. Live at the Netlify URL

To deploy your own:
- Connect this repo on [Netlify](https://app.netlify.com)
- Build command: *(empty)*
- Publish directory: *(empty)*
- Deploy 🚀

After deployment, add the Netlify URL to **Supabase → Authentication → URL Configuration** (Site URL + Redirect URLs).

---

## 🛡️ Security notes

- ✅ **anon key** in frontend — safe (designed for browser, RLS-protected)
- ❌ **service_role key** — never put in frontend (admin-level, bypasses RLS)
- ✅ **RLS enabled** on every table
- ✅ **GRANT permissions** explicitly given to `authenticated` role
- ✅ **HTTPS only** via Netlify
- ✅ For production: turn ON email confirmation, add rate limiting

---

## 📜 License

[MIT](LICENSE) © 2026 Mythili

---

## 🙌 Acknowledgments

Built as a learning project to understand:
- JWT authentication
- Row-Level Security in Postgres
- Static site deployment workflow
- Git + GitHub + Netlify CI/CD

If this helped you, give it a ⭐ on GitHub!
