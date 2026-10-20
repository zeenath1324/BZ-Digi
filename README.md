# BZ Digital — Luxury Digital Marketing Agency

> **Tagline:** Digital Experiences. Measurable Growth.  
> **Aesthetic:** Luxury, cinematic, elegant, modern, confident, creative, premium.

---

## 1. Project Overview

**BZ Digital** is a premier luxury digital agency website engineered with modern React, Vite, Tailwind CSS v4, and Motion for React. Inspired by high-end creative ateliers and digital performance agencies, the website delivers a black and champagne gold aesthetic with cinematic motion graphics, continuous dual-marquee loops, interactive data visualizations, and full multi-page routing.

---

## 2. Colour Palette — Black & Champagne Gold

The entire website strictly adheres to the requested palette without any legacy purple, violet, orange, or neon colors:

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Main Background** | `#080808` | Primary page canvas |
| **Secondary Background** | `#101010` | Section contrast & alternations |
| **Card Background** | `#151515` | Elevated editorial containers |
| **Elevated Surface** | `#1C1A16` | Nested cards, badges, and icon wells |
| **Primary Champagne Gold** | `#D6B878` | Key accents, buttons, and highlights |
| **Light Champagne Gold** | `#F0DDAA` | Hover states, glowing gradients, and tags |
| **Deep Antique Gold** | `#9C7B3D` | Depth, borders, and shadows |
| **Soft Warm Ivory** | `#F8F3E8` | High-contrast hero typography |
| **Main Text** | `#F5F1E8` | Primary readable copy |
| **Secondary Text** | `#B6B0A4` | Muted descriptions and timestamps |
| **Borders** | `#383126` | Subtle metallic hair lines |
| **Subtle Gold Glow** | `rgba(214,184,120,0.22)` | Ambient lighting & hover effects |

---

## 3. Project File Structure

```text
/
├── .env.example                     # Environment variables template
├── index.html                       # HTML5 entry with Google Fonts (Cinzel, Plus Jakarta Sans, Syne)
├── metadata.json                    # AI Studio applet metadata & permissions
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # Strict TypeScript configuration
├── vite.config.ts                   # Vite bundler & Tailwind configuration
├── README.md                        # Documentation & setup guide
└── src/
    ├── main.tsx                     # React 19 entry point
    ├── App.tsx                      # Root layout, router, modal provider
    ├── index.css                    # Tailwind v4, custom variables, keyframes & animations
    ├── data/
    │   └── agencyData.ts            # Central data store for practices, case studies, metrics, FAQs
    ├── components/
    │   ├── Navbar.tsx               # Sticky navbar with blur, active indicators & mobile drawer
    │   ├── Footer.tsx               # Complete footer with desks, links & newsletter
    │   ├── Hero.tsx                 # Cinematic hero with editorial typography & trust badges
    │   ├── AnimatedBrandGraphic.tsx # Custom SVG/motion orbital sphere with mouse parallax
    │   ├── ClientMarquee.tsx        # Dual continuous infinite marquee rows moving opposite
    │   ├── AboutSection.tsx         # "Strategy Meets Creativity" 2-col layout & stats
    │   ├── ServicesGrid.tsx         # 6 detailed practice cards with gold glow
    │   ├── PortfolioGrid.tsx        # Filterable case study showcase with CSS mockups
    │   ├── ProcessTimeline.tsx      # 4-step interactive timeline with animated gold progress
    │   ├── TestimonialCarousel.tsx  # Autoplay carousel with swipe/keys & demo disclosures
    │   ├── MetricsSection.tsx       # Animated KPIs & interactive SVG growth curve
    │   ├── FAQAccordion.tsx         # Interactive single-open accordion with smooth height
    │   ├── ContactForm.tsx          # Validated inquiry form with spam honeypot & status notices
    │   ├── QuoteModal.tsx           # Global instant proposal / quote dialog
    │   └── ScrollToTop.tsx          # Resets scroll position upon route change
    └── pages/
        ├── Home.tsx                 # Full 10-section cinematic homepage
        ├── About.tsx                # Manifesto, executive leadership & agency milestones
        ├── Services.tsx             # Comprehensive practices breakdown & investment models
        ├── ServiceDetail.tsx        # Individual dynamic service view (/services/:serviceId)
        ├── Work.tsx                 # Full portfolio archive with category filters
        ├── CaseStudy.tsx            # In-depth case study breakdown (/work/:caseStudyId)
        ├── Blog.tsx                 # Memorandum & insights archive with search
        ├── BlogPost.tsx             # Editorial reading view with key takeaways (/blog/:slug)
        ├── Contact.tsx              # Global office desks, phone, email & lead generator
        ├── PrivacyPolicy.tsx        # Complete compliance policy in theme
        ├── Terms.tsx                # Commercial terms and conditions in theme
        └── NotFound.tsx             # Custom luxury 404 error page
```

---

## 4. Installation & Local Development (Windows / VS Code)

### Prerequisites
- **Node.js**: v18.0.0 or later (Node.js 20+ LTS recommended)
- **npm** or **bun** / **pnpm**
- **Visual Studio Code**

### Step-by-Step Instructions

1. **Clone or Download the repository:**
   Open Windows Terminal / PowerShell:
   ```powershell
   git clone <repository-url> bz-digital
   cd bz-digital
   ```

2. **Open in VS Code:**
   ```powershell
   code .
   ```

3. **Install Dependencies:**
   Open the built-in VS Code Terminal (`Ctrl + ~`) and run:
   ```powershell
   npm install
   ```

4. **Configure Environment Variables:**
   Create a local `.env` file by copying `.env.example`:
   ```powershell
   copy .env.example .env
   ```

5. **Start Development Server:**
   ```powershell
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to preview the luxury website.

---

## 5. Firebase & Backend Integration Instructions

The frontend includes a fully validated client-side lead capture form (`src/components/ContactForm.tsx`) that:
- Performs rigorous client-side format and length validation.
- Traps bot spam using a hidden honeypot field.
- Stores inquiries in browser session state (`localStorage.getItem('bz_digital_leads')`).
- **Does not falsely claim a database write occurred** when live Firebase credentials are not yet configured.

### Connecting Live Firebase Firestore:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** in production mode.
3. Add a Web App to obtain your configuration keys.
4. Populate your `.env` file:
   ```env
   VITE_FIREBASE_API_KEY="AIzaSy..."
   VITE_FIREBASE_AUTH_DOMAIN="bz-digital-agency.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="bz-digital-agency"
   VITE_FIREBASE_STORAGE_BUCKET="bz-digital-agency.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
   VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"
   ```
5. Install the Firebase client SDK if desired (`npm install firebase`), and update `ContactForm.tsx` to dispatch directly to your `leads` collection.

---

## 6. Build and Production Deployment

To test and compile the production bundle:

```bash
# Verify TypeScript types
npm run lint

# Build production distribution
npm run build

# Preview production build locally
npm run preview
```

The resulting optimized static assets in the `/dist` directory can be deployed to:
- **Cloud Run / Google Cloud**
- **Vercel** (`vercel --prod`)
- **Netlify**
- **Firebase Hosting** (`firebase deploy --only hosting`)
- **Cloudflare Pages**

---

## 7. Features & Status Confirmation

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Black & Champagne Gold Palette** |  **100% Complete** | Zero purple, orange, or neon branding |
| **Sticky Navbar & Dropdowns** |  **100% Complete** | Smooth scroll transition & mobile drawer |
| **Animated Brand Centerpiece** |  **100% Complete** | SVG orbital rings, floating particles, mouse parallax |
| **Continuous Client Marquee** |  **100% Complete** | 2 opposite infinite loops with hover pause |
| **About Section & Stats** |  **100% Complete** | 4 core pillars with viewport reveals |
| **Services Grid & 6 Detail Pages** |  **100% Complete** | Dynamic routing for all 6 practices |
| **Case Studies & Portfolio Archive** |  **100% Complete** | Category filterable with demonstration notes |
| **Interactive 4-Step Process** |  **100% Complete** | Animated connected timeline & deliverables |
| **Testimonial Carousel** |  **100% Complete** | Touch-friendly, pause/play, keyboard accessible |
| **Results & Interactive Graph** |  **100% Complete** | Dynamic SVG stroke-drawing growth curves |
| **FAQ Single-Open Accordion** |  **100% Complete** | Animated height transitions |
| **Lead Form & Validation** |  **100% Complete** | Honeypot spam defense + transparent backend notice |
| **Instant Quote Modal** |  **100% Complete** | Global modal triggered from any CTA |
| **Blog & Reading View** |  **100% Complete** | Searchable insights archive + full reader view |
| **Privacy Policy & Terms** |  **100% Complete** | Formal legal compliance pages |
| **Custom 404 Error Page** |  **100% Complete** | Styled in brand theme |
| **Accessibility & Reduced Motion** |  **100% Complete** | Responds to `prefers-reduced-motion` |
