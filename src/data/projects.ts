export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  role: string;
  features: string[];
  challenges: string[];
  impact?: string;
  metrics?: ProjectMetric[];
  architecture?: string[];
  category: 'Engineering' | 'Design' | 'Fullstack';
  /**
   * Honest maturity label shown as a badge.
   * 'Production' = shipped with a real backend/API/auth and real users.
   * 'Concept'    = build/prototype presented as an interactive demo.
   */
  stage: 'Production' | 'Concept';
  /** One-line note clarifying exactly what "production" or "concept" means here. */
  stageNote?: string;
  link?: string;
  github?: string;
  /** Real public URL of the shipped product (distinct from the portfolio demo). */
  liveUrl?: string;
  /** Real organizations this was built for / deployed at (for a credibility strip). */
  clients?: string[];
  image: string;
  /**
   * When true, the live preview loads the project's built index.html directly in the iframe
   * instead of fetching + runtime-patching it. Use for builds that already ship correct
   * (sub-path) asset bases and their own demo bootstrap.
   */
  directEmbed?: boolean;
  /**
   * Appetize.io public key. When set, the live tab streams the real native app
   * (e.g. an Android APK) in-browser via an Appetize player, so viewers can test
   * the genuine app with no download.
   */
  appetizeKey?: string;
}

export const projects: Project[] = [
  {
    id: 'ismartpay',
    title: 'iSmartPay: Fintech Platform',
    description: 'A production fintech platform spanning 15 feature modules including disbursements, payroll, wallet, collections, settlements, invoicing, utility payments and SMS, with 2FA auth, a permissions engine, multi-language support and PDF reporting.',
    longDescription: 'iSmartPay is a full-scale digital finance platform I led on the frontend, built as a modular React 19 application organized by feature domain. It covers the complete money-movement lifecycle for businesses and individuals: onboarding and KYC verification, wallet top-ups and transfers, single and bulk disbursements, payroll runs, collections, settlements, invoicing, and utility bill payments (electricity, water, TV, internet, airtime). It ships secure two-factor authentication, a role-based permissions engine, session inactivity handling, in-app SMS, multi-language support, and on-the-fly PDF report generation, all backed by a service layer with Zod validation, error boundaries, Sentry monitoring and a Vitest test suite.',
    techStack: ['React 19', 'Vite 7', 'React Query', 'Zod', 'Chart.js', 'jsPDF', 'i18next', 'Sentry', 'Vitest'],
    role: 'Frontend Lead',
    features: [
      'Single and bulk disbursements with real-time status tracking',
      'Wallet, collections, settlements and payroll modules',
      'Utility bill payments for electricity, water, TV, internet and airtime',
      'Invoicing and on-the-fly PDF report generation (jsPDF)',
      'Secure 2FA authentication with a role-based permissions engine',
      'Multi-language UI (i18next) with light/dark theming',
      'In-app SMS, notifications and session inactivity protection'
    ],
    challenges: [
      'Structuring a 15-module fintech codebase (feature-based) that stays maintainable as scope grows',
      'Enforcing data accuracy and security across real-time financial flows with Zod validation and error boundaries',
      'Building a permissions engine that gates routes and UI per user role and access level'
    ],
    impact: 'Processed over 800,000 GH₵ in transaction volume across live disbursement and collection flows.',
    metrics: [
      { label: 'Volume Processed', value: '800k GH₵+', description: 'Total transaction value processed.' },
      { label: 'Feature Modules', value: '15', description: 'From disbursements and payroll to utilities and SMS.' },
      { label: 'Uptime', value: '99.9%', description: 'Reliability of critical disbursement flows.' }
    ],
    architecture: [
      'Feature-based module architecture with a shared service layer and lazy-loaded routes.',
      'React Query for server-state caching, with Zod schema validation on all inputs.',
      'Role-based permissions engine gating routes and UI, plus 2FA and session inactivity handling.',
      'Sentry-integrated error boundaries and a Vitest + React Testing Library suite (70% coverage threshold).'
    ],
    category: 'Engineering',
    stage: 'Production',
    stageNote: 'Live product with a real REST API, database, 2FA auth and paying users. The embedded preview is a sandboxed build running on sample data so it is safe to explore publicly.',
    liveUrl: 'https://stgpayportal.ismartghana.com',
    image: '/projects/ismartpay.png',
    link: '/live-projects/ismartpay/index.html',
    directEmbed: true
  },
  {
    id: 'fleet-management-dashboard',
    title: 'Fleetly: Fleet Management Platform',
    description: 'An enterprise fleet operations suite spanning 15+ modules, from vehicles, drivers, maintenance, fuel and safety to financials and a live tracking map, plus dedicated workshop and supplier partner portals.',
    longDescription: 'Fleetly is a comprehensive fleet management platform I architected and built on the frontend. It unifies the entire operational lifecycle of a vehicle fleet, from onboarding vehicles and drivers, through maintenance work orders, fuel and expense tracking, safety incidents and insurance claims, to reporting and a marketplace, behind a single, cohesive SaaS interface. Beyond the core operator dashboard, it ships two full partner experiences: a Workshop portal for service providers (job cards, quotes, invoicing, technician dispatch and revenue) and a Supplier portal for parts catalogs and fulfillment. An AI copilot, powered by Groq, lets operators query fleet state in natural language.',
    techStack: ['React 19', 'Vite 7', 'React Router 7', 'Tailwind CSS', 'Recharts', 'React-Leaflet', 'Axios', 'Groq AI'],
    role: 'Lead Frontend Engineer',
    features: [
      'Operator dashboard with fleet-health KPIs, alerts and guided onboarding',
      'Full vehicle lifecycle: makes/models/trims, groups, status & ownership history',
      'Maintenance suite: work orders, service programs, schedules, reminders and issues',
      'Driver management with a multi-step registration wizard and camera capture',
      'Fuel, financials, safety, insurance, documents, parts and reporting modules',
      'Interactive live tracking map built on Leaflet',
      'AI fleet copilot (Groq) for natural-language operational queries',
      'Dedicated Workshop and Supplier partner portals with their own auth and flows'
    ],
    challenges: [
      'Architecting a 15+ module, multi-role application (operator, workshop, supplier) with maintainable, feature-based structure',
      'Building a resilient data layer against a live REST API, with a fallback wrapper so the UI degrades gracefully when the network drops',
      'Keeping a large React 19 codebase performant while unifying a consistent design system across all modules'
    ],
    impact: 'A production platform unifying the complete fleet operations lifecycle across three distinct user roles behind one SaaS interface.',
    metrics: [
      { label: 'Operational Modules', value: '15+', description: 'From vehicles and maintenance to financials and safety.' },
      { label: 'Partner Portals', value: '3 roles', description: 'Fleet operator, workshop provider and parts supplier.' },
      { label: 'AI Copilot', value: 'Natural language', description: 'Groq-powered assistant answers fleet questions in plain English.' }
    ],
    architecture: [
      'Feature-based module architecture organized by domain (fleet, drivers, maintenance, service-providers).',
      'Axios service layer against a REST API, with a fallback wrapper for graceful offline degradation.',
      'Role-aware routing with protected routes and separate authentication for partner portals.',
      'Shared component and design-system layer (base inputs, modals, tables, badges) reused across every module.'
    ],
    category: 'Fullstack',
    stage: 'Production',
    stageNote: 'Shipped fleet operations platform backed by a live REST API and role-based auth. The public preview here runs on sample data so it can be explored without a login.',
    image: '/projects/fleet.png',
    link: '/live-projects/fleet/index.html',
    directEmbed: true
  },
  {
    id: 'bundle-platform',
    title: 'White-Label Bundle Platform',
    description: 'A reusable airtime & data-bundle purchase platform white-labeled and deployed for 5+ Ghanaian organizations including Telecel, NHIS, SSNIT, GPAA and the Registered Midwives Association.',
    longDescription: 'A single, themeable frontend platform for buying institution-specific airtime and data bundles, productized and re-skinned for multiple Ghanaian organizations. Each deployment ships its own branding, catalog and identity-verification rules while sharing one battle-tested codebase, turning a bespoke build into a repeatable product. The live demo shown here is the Telecel deployment, the most feature-complete instance, containerized with Docker and served via nginx.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Docker', 'nginx'],
    role: 'Frontend Engineer & UI/UX Designer',
    features: [
      'Themeable, white-label architecture re-skinned per organization',
      'Multi-step bundle purchase flow with phone-number and staff-ID verification',
      'Organization-specific catalogs, branding and validation rules',
      'Responsive, accessibility-first UI tuned for low-end devices and older browsers',
      'Dockerized builds served through nginx for consistent deployment'
    ],
    challenges: [
      'Designing one codebase flexible enough to re-brand for very different institutions without forking',
      'Adhering to strict corporate identity guidelines per client while keeping a shared component core',
      'Optimizing for older browsers and low-bandwidth conditions common across the user base'
    ],
    impact: 'Turned a bespoke build into a repeatable product deployed across 5+ organizations, including benefit distribution for 12,000+ NHIS employees.',
    metrics: [
      { label: 'Deployments', value: '5+', description: 'Organizations running the same platform.' },
      { label: 'Employees Served', value: '12k+', description: 'Via the NHIS benefit deployment alone.' },
      { label: 'Codebase', value: '1 core', description: 'Shared, themeable frontend across all brands.' }
    ],
    architecture: [
      'Configuration-driven theming layer that re-skins the platform per organization.',
      'Shared component core with per-client catalog and verification modules.',
      'Dockerized build pipeline with nginx serving optimized static assets.'
    ],
    category: 'Fullstack',
    stage: 'Production',
    stageNote: 'Deployed for 5+ real organizations against their live provisioning APIs. The embedded preview is the Telecel deployment running on sample data.',
    liveUrl: 'https://studentbundle.ismartghana.com',
    clients: ['Telecel', 'NHIS', 'SSNIT', 'GPAA', 'Registered Midwives Association'],
    image: '/projects/bundles.png',
    link: '/live-projects/telecel/index.html',
    directEmbed: true
  },
  {
    id: 'akonta',
    title: 'Akonta: Market Ledger App',
    description: 'A bilingual (English/Twi), offline-first mobile bookkeeping app that replaces the paper notebook for Ghanaian market traders, with icon-based and voice-driven sales entry.',
    longDescription: 'Akonta (Twi for "account") is a React Native / Expo mobile app I built to bring digital bookkeeping to informal market traders in Ghana. It is designed around real constraints: low literacy, intermittent connectivity, and budget Android phones. Every core feature, from recording sales and managing inventory to seeing daily profit, works fully offline on an on-device SQLite database. Traders record a sale in seconds by tapping product icons, or by speaking (English recognized on-device; Twi via an online path). The entire interface is bilingual English/Twi and switches instantly.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Zustand', 'i18next'],
    role: 'Mobile Engineer & Product Designer',
    features: [
      'Fully offline-first: sales, inventory and profit computed on-device via SQLite (WAL mode)',
      'Icon-based quick sale entry to record a sale in under 5 seconds',
      'Voice entry with an NLP parser (Levenshtein fuzzy matching, EN/Twi numbers)',
      'Instant daily profit, revenue and cost dashboard',
      'Bilingual English/Twi UI with instant language switching',
      'Low-stock local notifications and optional PIN lock'
    ],
    challenges: [
      'Designing for low-literacy, Twi-first users through icon-driven interaction rather than text',
      'Delivering a genuinely offline experience with local SQLite and no server or account',
      'Keeping the app lightweight for budget Android phones (stripped ~50–100MB of on-device ML weight)'
    ],
    impact: 'A feature-complete, offline-first MVP that turns end-of-day "how much did I make?" into an instant answer for market traders.',
    metrics: [
      { label: 'Works Offline', value: '100%', description: 'All core features run with no internet.' },
      { label: 'Sale Entry', value: '<5s', description: 'From product tap to recorded sale.' },
      { label: 'Languages', value: 'EN / Twi', description: 'Fully bilingual, instant switching.' }
    ],
    architecture: [
      'On-device SQLite (WAL mode, indexed) as the single source of truth.',
      'Zustand global store hydrated from the local database.',
      'i18next-driven bilingual layer covering every screen and alert.'
    ],
    category: 'Engineering',
    stage: 'Concept',
    stageNote: 'A working, self-funded MVP. Offline-first is a deliberate product decision for its users, not a demo limitation: it runs entirely on an on-device SQLite database.',
    image: '/projects/akonta.png',
    link: '/live-projects/akonta/index.html',
    directEmbed: true,
    appetizeKey: ''
  },
  {
    id: 'jayee',
    title: 'University Admissions Portal',
    description: 'A multi-step application system for Higher Education, handling 10,000+ student applications annually.',
    longDescription: 'Architected and built a robust admissions portal for Jayee University College. Implemented a 5-step application engine with state persistence, document validation, and real-time status tracking.',
    techStack: ['React 19', 'Tailwind CSS', 'Zustand', 'React Hook Form', 'Zod', 'Framer Motion'],
    role: 'Software Engineer',
    features: [
      '5-step persistent application engine',
      'Asynchronous document upload with MIME validation',
      'Automated application status notifications',
      'Administrative dashboard for application review'
    ],
    challenges: [
      'Implementing a reliable multi-step form state management that survives page reloads',
      'Handling concurrent file uploads under heavy load during admissions peaks'
    ],
    impact: 'Replaced a paper-based system, reducing processing time by 80%.',
    metrics: [
      { label: 'Annual Applications', value: '10k+', description: 'Handled during peak admission periods.' },
      { label: 'Time Saved', value: '80%', description: 'Reduction in manual processing time.' },
      { label: 'Error Rate', value: '<1%', description: 'Incomplete or invalid form submissions.' }
    ],
    architecture: [
      'Stateless multi-step engine with local persistence.',
      'Zod-driven schema validation for complex form inputs.',
      'Direct-to-S3 asynchronous document upload pipeline.'
    ],
    category: 'Engineering',
    stage: 'Production',
    stageNote: 'Live admissions system that replaced a paper-based process, handling real student applications with document upload and status tracking.',
    clients: ['Jayee University College'],
    image: '/projects/jayee.png',
    link: '/live-projects/jayee/index.html'
  },
  {
    id: 'rentpay',
    title: 'RentPay: Property Rent Tracker',
    description: 'A full-stack property and rent-management app with real-time cloud sync, letting landlords track properties, tenants and monthly payments across multiple currencies.',
    longDescription: 'RentPay is a full-stack rental-management application I built to give small landlords a clear, real-time view of their portfolio. Property, tenant and payment records sync live across devices through Supabase (Postgres + realtime subscriptions), with a resilient offline-first design that transparently falls back to local storage when the cloud is unavailable. It tracks monthly rent status across properties, supports multiple currencies, and exports statements, all behind a clean, single-page interface.',
    techStack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Lucide React'],
    role: 'Full-Stack Engineer',
    features: [
      'Real-time cloud sync via Supabase Postgres + realtime subscriptions',
      'Offline-first design with automatic local-storage fallback',
      'Property, tenant and monthly-payment tracking with status at a glance',
      'Multi-currency support (GH₵ / USD)',
      'Data export and yearly payment overviews'
    ],
    challenges: [
      'Designing a data model that stays consistent across realtime cloud sync and offline local storage',
      'Building an app that degrades gracefully from cloud mode to local-only without code changes'
    ],
    impact: 'A full-stack, real-time rent tracker with a Postgres backend that keeps a landlord\u2019s entire portfolio in sync, and keeps working when the network drops.',
    metrics: [
      { label: 'Backend', value: 'Supabase', description: 'Postgres with row-level security and realtime subscriptions.' },
      { label: 'Sync', value: 'Realtime', description: 'Changes broadcast live to every connected device.' },
      { label: 'Resilience', value: 'Offline fallback', description: 'Degrades to local storage when the cloud is unreachable, then re-syncs.' }
    ],
    architecture: [
      'JSONB-backed Postgres schema with row-level security policies.',
      'Realtime subscriptions to broadcast changes to every connected client.',
      'Storage abstraction that swaps between Supabase and local storage at runtime.'
    ],
    category: 'Fullstack',
    stage: 'Concept',
    stageNote: 'A self-directed full-stack build with a real Supabase/Postgres backend, realtime sync and offline resilience.',
    image: '/projects/rentpay.png',
    link: '/live-projects/rentpay/index.html',
    directEmbed: true
  },
  {
    id: 'hayapay',
    title: 'HayaPay: HR & Payroll Platform Site',
    description: 'Marketing site for HayaPay, an HR and payroll outsourcing platform for the modern African enterprise, built for performance, SEO and conversion.',
    longDescription: 'Designed and built the marketing site for HayaPay, an HR and payroll outsourcing platform serving enterprises across Africa. Statically exported with Next.js for edge-fast delivery, the site pairs a bold, animated hero with a modular component system that lets the team assemble new service and package pages quickly, all tuned for SEO, Core Web Vitals and conversion.',
    techStack: ['Next.js', 'Framer Motion', 'Lucide React', 'Tailwind CSS'],
    role: 'Lead Designer & Frontend Engineer',
    features: [
      'Statically exported Next.js site with SEO-optimized architecture',
      'Modular, reusable component library for rapid page assembly',
      'Scroll-driven Framer Motion animations',
      'Fully responsive across all device categories'
    ],
    challenges: [
      'Reducing LCP and FID metrics while maintaining high visual fidelity',
      'Implementing a seamless navigation flow across multiple service lines'
    ],
    impact: 'Increased average session duration by 40% post-launch.',
    metrics: [
      { label: 'Session Duration', value: '+40%', description: 'Increase in average time on site post-launch.' },
      { label: 'Framework', value: 'Next.js', description: 'Statically exported for edge-speed delivery.' },
      { label: 'Coverage', value: '50+', description: 'African markets addressed in the messaging.' }
    ],
    architecture: [
      'Statically exported Next.js site for CDN-first, edge-fast delivery.',
      'Reusable, modular marketing component library for rapid page assembly.',
      'Scroll-driven Framer Motion animations with intersection-observer triggers.'
    ],
    category: 'Design',
    stage: 'Production',
    stageNote: 'A shipped, statically-exported marketing site tuned for SEO, Core Web Vitals and conversion.',
    image: '/projects/hayapay.png',
    link: '/live-projects/hayapay/index.html',
    directEmbed: true
  },
];
