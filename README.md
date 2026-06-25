# Editkaro.in – Portfolio Website

A complete multi-page portfolio website for a video editing and social media marketing agency.

---

## 📁 File Structure

```
editkaro/
├── index.html          → Home page
├── portfolio.html      → Full portfolio with 9 category filters
├── about.html          → About Us + Team section
├── contact.html        → Contact form + Email subscriber
├── style.css           → All styles (responsive, dark theme)
├── script.js           → Filters, lightbox, forms, Google Sheets
├── setup-sheets.gs     → Google Apps Script for Sheets integration
├── README.md           → This file
└── assets/
    └── videos/         → Place your .mp4 video files here
```

---

## 🎬 Adding Your Videos

Place `.mp4` files in `assets/videos/` with these names:

| File | Category |
|------|----------|
| `short.mp4` / `short2.mp4` | Short Form |
| `long.mp4` / `long2.mp4` | Long Form |
| `gaming.mp4` / `gaming2.mp4` | Gaming |
| `football.mp4` / `football2.mp4` | Football |
| `ads.mp4` / `ads2.mp4` | eCommerce Ads |
| `documentary.mp4` / `documentary2.mp4` | Documentary |
| `colorgrading.mp4` / `colorgrading2.mp4` | Color Grading |
| `anime.mp4` / `anime2.mp4` | Anime |

---

## 🔗 Google Sheets Integration

### Step 1 – Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it **EditKaro Contacts**

### Step 2 – Add Apps Script
1. In your sheet: **Extensions → Apps Script**
2. Delete existing code
3. Copy-paste everything from `setup-sheets.gs`
4. Save (Ctrl+S)

### Step 3 – Deploy
1. Click **Deploy → New Deployment**
2. Type: **Web App**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** → Authorize → Copy the URL

### Step 4 – Connect to Website
1. Open `script.js`
2. Find line: `const GOOGLE_SHEETS_URL = "YOUR_APPS_SCRIPT_DEPLOYMENT_URL_HERE";`
3. Replace with your URL

---

## 🚀 Deployment

### Option A – Vercel (Recommended)
```bash
git init
git add .
git commit -m "Initial commit – Editkaro portfolio"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
Then: [vercel.com](https://vercel.com) → Import repo → Deploy

### Option B – Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `editkaro` folder
3. Done — live URL in seconds

### Option C – GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: main branch
3. URL: `https://yourusername.github.io/editkaro`

---

## ✅ Features Checklist

- [x] Home page (hero, stats, services, featured work, newsletter, testimonials)
- [x] Portfolio page (9 categories + filter buttons)
- [x] About Us page (mission, vision, story, 6-member team)
- [x] Contact page (full form + info)
- [x] Email subscription form
- [x] Google Sheets integration (contacts + subscribers)
- [x] Video lightbox with keyboard/click-outside close
- [x] Video hover preview
- [x] Scroll reveal animations
- [x] Fully responsive (mobile, tablet, desktop)
- [x] SEO meta tags on all pages
- [x] Mobile hamburger navigation
- [x] Sticky header

---

## 📞 Contact

Email: hello@editkaro.in  
Website: editkaro.in
