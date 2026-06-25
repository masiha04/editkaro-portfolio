/* ============================================
   EDITKARO.IN — script.js
   ============================================ */

/* ──────────────────────────────────────────
   GOOGLE SHEETS INTEGRATION
   ──────────────────────────────────────────
   HOW TO SET UP (one-time):
   1. Go to Google Sheets → create a new sheet named "EditKaro Contacts"
   2. Open Extensions → Apps Script
   3. Paste the Apps Script code from setup-sheets.gs
   4. Click Deploy → New Deployment → Web App
      - Execute as: Me
      - Who has access: Anyone
   5. Copy the Deployment URL
   6. Replace GOOGLE_SHEETS_URL below with your URL
   ─────────────────────────────────────────── */

const GOOGLE_SHEETS_URL = "YOUR_APPS_SCRIPT_DEPLOYMENT_URL_HERE";
// Example: "https://script.google.com/macros/s/AKfy.../exec"

/* ──────────────────────────────────────────
   MOBILE NAV
   ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

/* ──────────────────────────────────────────
   STICKY HEADER SHADOW
   ─────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

/* ──────────────────────────────────────────
   PORTFOLIO FILTERS
   ─────────────────────────────────────────── */
const filterButtons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card[data-category]');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelector('.filters .active')?.classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.35s ease both';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ──────────────────────────────────────────
   VIDEO HOVER PREVIEW
   ─────────────────────────────────────────── */
document.querySelectorAll('.card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  card.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

/* ──────────────────────────────────────────
   LIGHTBOX
   ─────────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeBtn = document.getElementById('close');

function openLightbox(src) {
  if (!lightbox || !lightboxVideo || !src) return;
  lightboxVideo.src = src;
  lightbox.style.display = 'flex';
  lightboxVideo.load();
  lightboxVideo.play().catch(() => {});
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxVideo) return;
  lightboxVideo.pause();
  lightboxVideo.src = '';
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

document.querySelectorAll('.card[data-category]').forEach(card => {
  card.addEventListener('click', () => {
    const source = card.querySelector('source');
    if (source) openLightbox(source.src);
  });
});

if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}

// ESC key to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ──────────────────────────────────────────
   NEWSLETTER SUBSCRIPTION FORM
   ─────────────────────────────────────────── */
const subscribeForm = document.getElementById('subscribeForm');
const subMsg = document.getElementById('subMsg');

if (subscribeForm) {
  subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('subEmail')?.value.trim();
    if (!email) return;

    const btn = subscribeForm.querySelector('button');
    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    if (GOOGLE_SHEETS_URL !== "YOUR_APPS_SCRIPT_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'subscriber', email, timestamp: new Date().toISOString() })
        });
      } catch (err) {
        console.error('Sheets error:', err);
      }
    }

    if (subMsg) subMsg.textContent = '✅ Thank you! You\'re subscribed.';
    subscribeForm.reset();
    btn.textContent = 'Subscribe';
    btn.disabled = false;
  });
}

/* ──────────────────────────────────────────
   CONTACT FORM with Google Sheets
   ─────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const cfMsg = document.getElementById('cfMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('cfName')?.value.trim();
    const email   = document.getElementById('cfEmail')?.value.trim();
    const phone   = document.getElementById('cfPhone')?.value.trim();
    const service = document.getElementById('cfService')?.value;
    const message = document.getElementById('cfMessage')?.value.trim();

    if (!name || !email || !message) return;

    const btn = document.getElementById('cfBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const payload = {
      type: 'contact',
      name, email, phone, service, message,
      timestamp: new Date().toISOString()
    };

    if (GOOGLE_SHEETS_URL !== "YOUR_APPS_SCRIPT_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (cfMsg) cfMsg.textContent = '✅ Message sent! We\'ll reply within 24 hours.';
      } catch (err) {
        console.error('Sheets error:', err);
        if (cfMsg) cfMsg.textContent = '✅ Message sent! We\'ll reply within 24 hours.';
      }
    } else {
      // Demo mode — no real Sheets URL set
      if (cfMsg) cfMsg.textContent = '✅ Message sent! We\'ll reply within 24 hours.';
    }

    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
}

/* ──────────────────────────────────────────
   SCROLL REVEAL (lightweight)
   ─────────────────────────────────────────── */
const revealTargets = document.querySelectorAll('.card, .service-card, .team-card, .testi-card, .mv-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
