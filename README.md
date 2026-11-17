# Super Sky Fiber Net (SSFN) — Official Website & Operations Platform

**Super Sky Fiber Net (SSFN)** is a modern, high-speed fiber broadband Internet Service Provider (ISP) operating in **Jamshedpur, Jharkhand, India**.

This repository contains the complete production-grade web application, dynamic tariff comparison engine, customer enquiry processing pipeline, and administrative management portal.

---

## 🌐 Live Local Deployment

- **Local Address:** [http://localhost:8080](http://localhost:8080)
- **Network Interface:** `http://0.0.0.0:8080`
- **Admin Portal:** [http://localhost:8080/admin](http://localhost:8080/admin) (Default passcode: `ssfn-jamshedpur-admin-2026`)

---

## 🏢 Business & Contact Configuration

All business information is managed centrally in `src/config/site.ts`:

- **Brand Name:** Super Sky Fiber Net
- **Short Name:** SSFN
- **Primary Operating Location:** Jamshedpur, Jharkhand, India
- **Headquarters Address:** Main Road, Bistupur / Sakchi Commercial Hub, Jamshedpur, Jharkhand – 831001
- **Helpline Phone:** `+91 94711 26747` ([tel:+919471126747](tel:+919471126747))
- **WhatsApp Support:** `https://wa.me/919471126747`
- **Email:** `amitkumarsingh20798@gmail.com` ([mailto:amitkumarsingh20798@gmail.com](mailto:amitkumarsingh20798@gmail.com))
- **Primary Target Localities:** Sakchi, Bistupur, Kadma, Sonari, Telco Colony, Mango, Adityapur, Jugsalai, Golmuri, Baridih, Sidhgora, Burmamines.

---

## 🚀 Technology Stack

### Frontend
- **Framework:** Next.js (App Router architecture, React 19)
- **Styling:** Tailwind CSS v4 with custom fiber gradients and design tokens
- **Icons:** Lucide React
- **Animations:** CSS hardware-accelerated animations & smooth transitions
- **Components:** Modular, accessible Server Components by default; Client Components for interactivity

### Backend & Database
- **API Engine:** Next.js Route Handlers (RESTful JSON endpoints)
- **ORM:** Prisma ORM
- **Database Engine:**
  - **Local Development:** SQLite (`file:./dev.db`) for zero-friction local execution without external database daemons.
  - **Production:** PostgreSQL supported via standard `DATABASE_URL` and `prisma/schema.postgresql.prisma`.
- **Validation:** Zod schemas with Indian mobile number normalization and input sanitization
- **Rate Limiting:** Sliding-window in-memory rate limiter per IP address
- **Spam Protection:** Honeypot field verification on all public customer forms

---

## 🔄 Dynamic BSNL Plan Synchronization Engine

SSFN features an automated tariff benchmark synchronization engine under `src/lib/bsnl/`:

1. **`bsnl-source.ts`**: Configured official BSNL source endpoints and verified Jharkhand Circle tariff benchmark snapshot.
2. **`bsnl-fetcher.ts`**: Public tariff retriever with timeout controls, exponential backoff, and fallback preservation.
3. **`bsnl-parser.ts`**: Extracts and normalizes plan names, speeds (Mbps), data allowances, FUP limits, and benefits.
4. **`bsnl-validator.ts`**: Zod validation ensuring only 100% structurally complete plans are committed.
5. **`bsnl-sync.ts`**: Coordinates daily synchronization, writes `BsnlPlan`, logs runs in `BsnlSyncLog`, and records historical diffs in `BsnlPlanHistory`.
6. **`bsnl-comparator.ts`**: Evaluates SSFN pricing against verified BSNL benchmarks and calculates monthly/annual customer savings.

> **Legal Disclaimer:** Super Sky Fiber Net is an independent service provider. BSNL tariffs are strictly utilized as public reference benchmarks for the Jharkhand Circle. BSNL is a registered trademark of Bharat Sanchar Nigam Limited.

---

## 📁 Project Architecture

```
d:/SSFN/
├── prisma/
│   ├── schema.prisma              # SQLite schema (Development default)
│   └── schema.postgresql.prisma   # PostgreSQL schema (Production / Docker)
├── public/                        # Public static assets & images
├── scripts/
│   └── seed.mjs                   # Initial database seeding script
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Schema.org JSON-LD & meta
│   │   ├── page.tsx               # High-conversion Jamshedpur homepage
│   │   ├── globals.css            # Tailwind theme, fiber glow effects
│   │   ├── sitemap.ts             # Dynamic XML sitemap
│   │   ├── robots.ts              # Search engine crawler directives
│   │   ├── plans/                 # Dedicated Broadband Plans & comparison
│   │   ├── services/              # Home, SME, Wi-Fi & Surveillance services
│   │   ├── coverage/              # Jamshedpur localities directory & search
│   │   ├── about/                 # Company background, mission, values
│   │   ├── contact/               # Contact form, phone, WhatsApp & office details
│   │   ├── privacy-policy/        # Customer data protection policy
│   │   ├── terms/                 # Terms of service & Fair Usage Policy
│   │   ├── admin/                 # Protected operations & sync dashboard
│   │   └── api/
│   │       ├── enquiries/         # POST: New connection requests
│   │       ├── availability/      # POST: Locality & PIN feasibility checks
│   │       ├── contact/           # POST: General customer support messages
│   │       ├── plans/             # GET: SSFN plans & BSNL comparison matrix
│   │       └── admin/
│   │           ├── plan-sync/     # GET/POST: Trigger BSNL tariff synchronization
│   │           ├── enquiries/     # GET/PATCH: Customer enquiries management
│   │           ├── plans/         # GET/PATCH: SSFN pricing & promotion control
│   │           └── coverage/      # GET/PATCH: Jamshedpur coverage status control
│   ├── components/
│   │   ├── common/                # SSFN Logo, typography
│   │   ├── layout/                # Navbar, Footer, Floating WhatsApp, Modals
│   │   ├── homepage/              # Hero, Trust, Plans, Comparison, Services, FAQ, CTA
│   │   ├── plans/                 # Pricing cards, speed matrices
│   │   └── coverage/              # Locality search and status cards
│   ├── config/
│   │   ├── site.ts                # Centralized contact and brand configuration
│   │   ├── plans.ts               # SSFN plan catalogue & multi-month discounts
│   │   └── coverage.ts            # Jamshedpur locality configuration & PIN codes
│   └── lib/
│       ├── db.ts                  # PrismaClient singleton instance
│       ├── validation.ts          # Zod validation and sanitization schemas
│       ├── rate-limit.ts          # Sliding-window rate limiter
│       ├── constants.ts           # Status colors, API response helpers
│       └── bsnl/                  # Dynamic BSNL sync engine modules
├── Dockerfile                     # Multi-stage production container
├── docker-compose.yml             # App + PostgreSQL container orchestration
├── .env.example                   # Environment variable template
└── package.json                   # Port 8080 scripts and dependencies
```

---

## 💻 Getting Started Locally

### 1. Prerequisites
- Node.js `v20.x` or higher
- npm `10.x` or higher

### 2. Setup & Database Seeding
```bash
# Install dependencies
npm install

# Generate Prisma Client & push schema to SQLite
npm run db:push
npm run db:generate

# Seed SSFN plans, Jamshedpur coverage areas, and BSNL benchmarks
npm run db:seed
```

### 3. Run Development Server (Port 8080)
```bash
npm run dev
# Application starts on http://localhost:8080
```

### 4. Build & Run Production Server (Port 8080)
```bash
npm run build
npm run start
# Server listens on http://0.0.0.0:8080
```

---

## 🐳 Docker & PostgreSQL Deployment

To deploy SSFN using Docker and PostgreSQL:

```bash
# Build and start both App and PostgreSQL containers
docker compose up -d --build

# Run database migrations / seed inside the container
docker compose exec app npm run db:push
docker compose exec app npm run db:seed
```

The application will be accessible at `http://localhost:8080`.

---

## 🔒 Security Measures

1. **Input Validation:** Strict Zod schema verification for all customer submissions.
2. **Sanitization:** Script stripping and HTML tag removal to eliminate XSS risks.
3. **SQL Injection Protection:** Fully parameterized queries via Prisma ORM.
4. **Rate Limiting:** Sliding-window rate limits on public submission endpoints to mitigate spam and DoS attempts.
5. **Honeypot Traps:** Hidden `website_url` fields to silently trap automated bot submissions.
6. **Security Headers:** Strict `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` headers.
7. **Admin Access Control:** Bearer token / administrative key authorization on all `/api/admin/*` endpoints.

---

## 📞 Support & Inquiries

- **Helpline:** +91 94711 26747
- **WhatsApp:** [Chat with SSFN Team](https://wa.me/919471126747)
- **Email:** amitkumarsingh20798@gmail.com
- **Office:** Commercial Hub, Bistupur / Sakchi Main Road, Jamshedpur, Jharkhand 831001
