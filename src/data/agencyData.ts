export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  metricsSample: string;
  timeline: string;
  startingAt: string;
  features: string[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  category: 'Performance' | 'SEO' | 'Web' | 'Branding';
  tagline: string;
  year: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    change: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  keyFeatures: string[];
  accentColor: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  quote: string;
  avatarText: string;
  resultsHighlighted: string;
  projectScope?: string;
  location?: string;
  year?: string;
  metricLabel?: string;
  metricValue?: string;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  keyTakeaways: string[];
}

export interface MarqueeClientItem {
  id: string;
  name: string;
  tag: string;
  sector: string;
  location: string;
  established?: string;
  logoType: string;
  metric: string;
  deliverables: string;
  description: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    subtitle: 'High-Intent Organic Dominance',
    iconName: 'Search',
    shortDescription: 'Command top rankings for high-intent queries with enterprise technical SEO, semantic content clusters, and high-authority digital PR.',
    fullDescription: 'Our bespoke SEO methodology moves far beyond standard keyword research. We architect high-performance semantic networks, eliminate algorithmic friction through advanced technical audits, and cultivate institutional digital authority that turns search into your most profitable revenue engine.',
    deliverables: [
      'Comprehensive Core Web Vitals & Technical Infrastructure Audit',
      'Entity-Based Semantic Keyword Architecture',
      'High-Authority Digital PR & Editorial Link Acquisition',
      'Local & International Multi-Region SEO Expansion',
      'Algorithmic Penalty Prevention & Recovery Protocols',
      'Real-Time SERP Intelligence & Executive ROI Dashboards'
    ],
    metricsSample: '+340% Organic Revenue Growth in 6 Months',
    timeline: '3–6 Months Iterative Cycles',
    startingAt: '$4,500 / month',
    features: ['Technical Optimization', 'High-Tier Link Building', 'Conversion Architecture', 'Semantic Search & AI Overviews']
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing & Paid Ads',
    subtitle: 'Data-Engineered Media Buying',
    iconName: 'TrendingUp',
    shortDescription: 'Scalable paid customer acquisition across Google, Meta, LinkedIn, and programmatic channels with obsession over ROAS and unit economics.',
    fullDescription: 'We build high-velocity paid acquisition systems engineered for measurable capital efficiency. By integrating first-party conversion APIs, predictive audience modeling, and hyper-targeted dynamic creative testing, we reliably lower Customer Acquisition Cost (CAC) while scaling revenue.',
    deliverables: [
      'Full-Funnel Meta, Google Ads & LinkedIn Campaign Architecture',
      'Server-Side Tracking (CAPI) & Privacy-Centric Attribution',
      'Algorithmic Bid Strategies & Budget Pacing Automation',
      'Dynamic Creative Testing (DCT) & Hook Fatigue Management',
      'Omnichannel Retargeting & High-Value Segment Nurturing',
      'Cohort LTV & Blended MER (Marketing Efficiency Ratio) Analysis'
    ],
    metricsSample: '4.8x Average Return on Ad Spend (ROAS)',
    timeline: 'Ongoing Growth Sprints',
    startingAt: '$5,000 / month + Ad Spend %',
    features: ['Precision Attribution', 'Dynamic Creative Engine', 'Predictive Bidding', 'Omnichannel Retargeting']
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    subtitle: 'Brand Prestige & Cultural Resonance',
    iconName: 'Share2',
    shortDescription: 'Cultivate an aspirational social presence with cinema-grade motion graphics, community storytelling, and high-converting paid social amplification.',
    fullDescription: 'In luxury and high-growth markets, attention is earned through taste, curation, and relentless visual distinction. We manage social ecosystems that elevate brand prestige, foster fierce community affinity, and turn social followings into qualified inbound pipelines.',
    deliverables: [
      'Bespoke Brand Narrative, Voice & Aesthetic Guidelines',
      'Cinematic Short-Form Video & Editorial Carousel Production',
      'High-Tier Creator & Influencer Partnership Management',
      'Active Community Stewardship & Executive Brand Positioning',
      'Paid Social Amplification & Funnel Synchronization',
      'Sentiment Analysis & Cultural Trend Capitalization'
    ],
    metricsSample: '12M+ Organic Video Impressions Generated',
    timeline: 'Monthly Content Retainers',
    startingAt: '$3,800 / month',
    features: ['Editorial Video Production', 'High-Tier Creator Deals', 'Community Growth', 'Executive Thought Leadership']
  },
  {
    id: 'web-design-dev',
    title: 'Website Design & Development',
    subtitle: 'Cinema-Grade Digital Flagships',
    iconName: 'Layout',
    shortDescription: 'Architecting ultra-fast, aesthetically transcendent digital flagships engineered with React, Framer Motion, and conversion-optimized UX.',
    fullDescription: 'Your website is the single most important touchpoint of your brand ecosystem. We engineer bespoke digital flagships that unite haute visual design with lightning performance, intuitive user flows, and uncompromising technical precision.',
    deliverables: [
      'Tailored UI/UX Design System in Figma with Micro-Interactions',
      'Modern Jamstack/React Web Architecture with Sub-Second Speeds',
      'Framer Motion & WebGL Interactive Canvas Experiences',
      'Headless CMS & CRM Integrations (Sanity, Strapi, HubSpot)',
      'Enterprise E-commerce (Shopify Plus & Custom Checkout)',
      'WCAG 2.1 AA Accessibility & Global CDN Deployment'
    ],
    metricsSample: '99/100 Google Lighthouse Performance Score',
    timeline: '6–10 Weeks From Concept to Launch',
    startingAt: '$8,500 One-Time Project',
    features: ['Interactive Motion Systems', 'Sub-Second Page Loads', 'Bespoke UI Design', 'Enterprise Headless Tech']
  },
  {
    id: 'branding-creative',
    title: 'Branding & Creative Design',
    subtitle: 'Unforgettable Visual Identity',
    iconName: 'Palette',
    shortDescription: 'Crafting distinctive brand identities, bespoke typography, art-directed visual languages, and design systems that command category leadership.',
    fullDescription: 'True luxury lies in subtlety and consistency. We define iconic brand identities from the foundational philosophy to typographic rhythm, color science, packaging touchpoints, and comprehensive digital guidelines that stand the test of time.',
    deliverables: [
      'Brand Strategy, Positioning & Positioning Matrix',
      'Bespoke Wordmark, Monogram & Iconography Creation',
      'Comprehensive Brand Identity System & Tokenized Guidelines',
      'Editorial Collateral, Packaging & Presentation Decks',
      'Custom 3D Renderings & Art-Directed Visual Assets',
      'Motion Design Brand Standards & Audio Identity'
    ],
    metricsSample: 'Redefined 18+ Category-Leading Brands',
    timeline: '4–8 Weeks Strategy & Production',
    startingAt: '$6,000 One-Time Engagement',
    features: ['Brand Positioning', 'Custom Typographic Systems', '3D Asset Creation', 'Comprehensive Style Guides']
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing & Editorial',
    subtitle: 'Authoritative Thought Leadership',
    iconName: 'FileText',
    shortDescription: 'Authoritative white papers, long-form editorial essays, and high-production multimedia that position your executives as undeniable industry titans.',
    fullDescription: 'We translate complex value propositions into compelling editorial content that captivates C-suite decision-makers. From research-backed industry white papers to high-concept video series, our content commands reverence and generates organic inbound demand.',
    deliverables: [
      'Quarterly Editorial Calendar & Thematic Architecture',
      'Original Industry Research Reports & Data White Papers',
      'Executive Ghostwriting for Forbes, LinkedIn & Fast Company',
      'High-Conversion Case Study Storytelling & Video Testimonials',
      'Email Newsletter Ecosystems with >45% Open Rates',
      'Content Syndication & Strategic Medium Distribution'
    ],
    metricsSample: '420% Increase in Inbound Executive Inquiries',
    timeline: 'Bi-Weekly / Monthly Production Cycles',
    startingAt: '$3,500 / month',
    features: ['Data-Driven White Papers', 'Executive Ghostwriting', 'Case Study Film Suites', 'High-Engagement Newsletters']
  }
];

export const MARQUEE_CLIENTS_ROW_1: MarqueeClientItem[] = [
  {
    id: 'aurelia',
    name: 'AURELIA LUXE',
    tag: 'Haute Horlogerie',
    sector: 'Horlogerie',
    location: 'Geneva, Switzerland',
    established: 'EST. 1894',
    logoType: 'aurelia',
    metric: '+310% DTC Revenue',
    deliverables: 'Flagship WebGL & Private Client Funnel',
    description: 'Master horology atelier specializing in grand complication chronographs and perpetual calendars.'
  },
  {
    id: 'vespera',
    name: 'VESPERA',
    tag: 'Private Aviation',
    sector: 'Aviation',
    location: 'Zurich & London',
    established: 'EST. 2011',
    logoType: 'vespera',
    metric: '+$14.2M Bookings',
    deliverables: 'Cinema-Grade Charter Platform',
    description: 'Transatlantic bespoke private jet charter service connecting Mayfair, Manhattan, and DIFC.'
  },
  {
    id: 'lumina',
    name: 'LUMINA CAPITAL',
    tag: 'Wealth Advisory',
    sector: 'Wealth',
    location: 'Mayfair, London',
    established: 'EST. 2004',
    logoType: 'lumina',
    metric: '$42M AUM Inflow',
    deliverables: 'Semantic Search & Authority Engine',
    description: 'Multi-family office advisory managing generational capital preservation and sovereign investments.'
  },
  {
    id: 'noir',
    name: 'NOIR ATELIER',
    tag: 'Milano Fashion',
    sector: 'Fashion',
    location: 'Milan, Italy',
    established: 'EST. 1978',
    logoType: 'noir',
    metric: '4.9x Paid ROAS',
    deliverables: 'Global E-Commerce Monograph',
    description: 'Avant-garde Italian haute couture atelier acclaimed for bespoke tailored silhouettes and leather goods.'
  },
  {
    id: 'kroma',
    name: 'KROMA STUDIOS',
    tag: 'Architecture & Design',
    sector: 'Architecture',
    location: 'Copenhagen, Denmark',
    established: 'EST. 2016',
    logoType: 'kroma',
    metric: '99/100 Lighthouse UX',
    deliverables: 'Minimalist Architectural Portal',
    description: 'Scandinavian architectural practice crafting carbon-neutral luxury residences and cultural pavilions.'
  },
  {
    id: 'solis',
    name: 'SOLIS HEALTH',
    tag: 'Longevity Tech',
    sector: 'Health',
    location: 'Zurich & Basel',
    established: 'EST. 2021',
    logoType: 'solis',
    metric: '+280% Inbound HNWIs',
    deliverables: 'Patient Portal & Growth Media',
    description: 'Pioneering cellular rejuvenation and personalized biomarker diagnostics for discerning executives.'
  },
  {
    id: 'zenith',
    name: 'ZENITH MOTORS',
    tag: 'Electric Hypercars',
    sector: 'Automotive',
    location: 'Modena, Italy',
    established: 'EST. 2019',
    logoType: 'zenith',
    metric: '100% Sold Out Allocation',
    deliverables: '3D Configurator & VIP Reservation',
    description: 'All-electric hypercar marque fusing Formula 1 aerodynamics with bespoke carbon-titanium coachbuilding.'
  },
  {
    id: 'velox',
    name: 'VELOX SYSTEMS',
    tag: 'AI Computing',
    sector: 'Tech',
    location: 'Silicon Valley, CA',
    established: 'EST. 2022',
    logoType: 'velox',
    metric: '+$85M Series B Inbound',
    deliverables: 'Technical Flagship & Product Demos',
    description: 'Next-generation quantum-accelerated neural computing clusters for enterprise AI workflows.'
  }
];

export const MARQUEE_CLIENTS_ROW_2: MarqueeClientItem[] = [
  {
    id: 'elixir',
    name: 'ELIXIR BOTANICALS',
    tag: 'Luxury Wellness',
    sector: 'Health',
    location: 'Kyoto & Grasse',
    established: 'EST. 1982',
    logoType: 'elixir',
    metric: '+185% VIP Retention',
    deliverables: 'Sensory Web & Subscription Engine',
    description: 'Rare botanical essences and ceremonial formulations harvested from biodynamic alpine estates.'
  },
  {
    id: 'aesthete',
    name: 'AESTHETE LIVING',
    tag: 'Interior Architecture',
    sector: 'Architecture',
    location: 'Stockholm, Sweden',
    established: 'EST. 2008',
    logoType: 'aesthete',
    metric: '2.4x Deal Size Lift',
    deliverables: 'Interactive Spatial Portfolio',
    description: 'Nordic residential studio curating bespoke architectural furnishings and curated living spaces.'
  },
  {
    id: 'valkyrie',
    name: 'VALKYRIE DEFENSE',
    tag: 'Aerospace Engineering',
    sector: 'Aviation',
    location: 'Oxford, UK',
    established: 'EST. 2015',
    logoType: 'valkyrie',
    metric: 'Top Tier Defense Contracts',
    deliverables: 'High-Security Web Infrastructure',
    description: 'Autonomous supersonic avionics and advanced materials engineering for modern defense requirements.'
  },
  {
    id: 'oryx',
    name: 'ORYX VENTURES',
    tag: 'Private Equity',
    sector: 'Wealth',
    location: 'DIFC, Dubai',
    established: 'EST. 2010',
    logoType: 'oryx',
    metric: '$1.8B Assets Under Advisory',
    deliverables: 'Investor Relations Portal',
    description: 'Sovereign venture capital and private equity backing frontier technologies across EMEA and APAC.'
  },
  {
    id: 'mirage',
    name: 'MIRAGE RESIDENCES',
    tag: 'Ultra-Luxury Estates',
    sector: 'Architecture',
    location: 'Monaco & Côte d’Azur',
    established: 'EST. 2006',
    logoType: 'mirage',
    metric: '€120M Portfolio Sold',
    deliverables: 'Cinema-Grade Property Monograph',
    description: 'Exclusive Mediterranean waterfront villas and private estates reserved for ultra-high-net-worth buyers.'
  },
  {
    id: 'crest',
    name: 'CREST & CROWN',
    tag: 'Fine Jewelry',
    sector: 'Jewelry',
    location: 'Place Vendôme, Paris',
    established: 'EST. 1924',
    logoType: 'crest',
    metric: '+240% Haute Joaillerie Sales',
    deliverables: 'Private Concierge Commerce Suite',
    description: 'High jewelry maison crafting one-of-a-kind royal coronets, natural gemstones, and bespoke heirlooms.'
  },
  {
    id: 'chronos',
    name: 'CHRONOS LABS',
    tag: 'Fintech Protocol',
    sector: 'Tech',
    location: 'Singapore & London',
    established: 'EST. 2020',
    logoType: 'chronos',
    metric: '$3.2B Daily Protocol Volume',
    deliverables: 'Real-Time Liquidity Dashboard',
    description: 'Sub-millisecond institutional settlement protocol for decentralized foreign exchange.'
  },
  {
    id: 'monarch',
    name: 'MONARCH HOTELS',
    tag: 'Boutique Hospitality',
    sector: 'Hospitality',
    location: 'St. Moritz & Gstaad',
    established: 'EST. 1902',
    logoType: 'monarch',
    metric: '94% Peak Season Occupancy',
    deliverables: 'VIP Booking Experience & Storytelling',
    description: 'Legendary alpine palace hotels providing discreet five-star hospitality to royal families and dignitaries.'
  }
];

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'aurelia-horlogerie',
    title: 'Aurelia Haute Horlogerie',
    client: 'Aurelia Watch Group (Geneva)',
    category: 'Performance',
    tagline: 'Scaling Direct-to-Consumer Luxury Timepiece Sales by 310%',
    year: '2025',
    challenge: 'A historic Swiss horology house needed to transition from legacy retail reliance to a direct-to-consumer digital acquisition engine without degrading prestige or alienating high-net-worth collectors.',
    solution: 'BZ Digital implemented an invitation-only digital flagship, backed by ultra-targeted Meta and Google Search campaigns targeting high-intent luxury watch enthusiasts, coupled with private concierge chat flows.',
    results: [
      { label: 'Revenue Growth', value: '+310%', change: 'Year-over-Year' },
      { label: 'Blended ROAS', value: '5.2x', change: 'Across All Paid Channels' },
      { label: 'Average Order Value', value: '$18,400', change: '+38% Increase' },
      { label: 'VIP Inbound Leads', value: '1,420+', change: 'Qualified Inquiries' }
    ],
    testimonial: {
      quote: 'BZ Digital understood the delicate balance of luxury restraint and aggressive performance marketing. Our global digital sales reached record highs within 90 days.',
      author: 'Marcus Von Berg',
      role: 'Chief Commercial Officer',
      company: 'Aurelia Haute Horlogerie'
    },
    keyFeatures: [
      'Private Client Acquisition Funnel',
      'VIP Concierge Onboarding Flow',
      'First-Party Conversion API Integration',
      'Cinema-Grade 3D Product Interactive Showcase'
    ],
    accentColor: '#D6B878'
  },
  {
    id: 'vespera-aviation',
    title: 'Vespera Private Aviation',
    client: 'Vespera Global Jets',
    category: 'Web',
    tagline: 'A Cinema-Grade Digital Platform for Transatlantic Jet Charters',
    year: '2025',
    challenge: 'Vespera’s outdated web portal was causing high bounce rates among family offices and corporate flight departments who demanded frictionless booking and transparent fleet exploration.',
    solution: 'We engineered a bespoke, dark-mode digital platform featuring an instant route estimator, 3D cabin walk-throughs, and sub-second load times built on modern Jamstack infrastructure.',
    results: [
      { label: 'Quote Completion Rate', value: '64%', change: 'Up from 18%' },
      { label: 'Page Load Speed', value: '0.42s', change: 'Sub-Second Latency' },
      { label: 'Charter Bookings', value: '+$14.2M', change: 'Total Contract Value' },
      { label: 'Mobile Conversion', value: '+185%', change: 'Executive C-Suite' }
    ],
    testimonial: {
      quote: 'The level of craftsmanship, typographic elegance, and technical performance BZ Digital brought to Vespera was beyond what traditional agencies could even fathom.',
      author: 'Elena Rostova',
      role: 'Head of Brand & Client Experience',
      company: 'Vespera Aviation'
    },
    keyFeatures: [
      'Interactive Flight Route Calculator',
      'Ultra-Fast React & Framer Motion Experience',
      'Secure High-Net-Worth Lead Gateway',
      'Multi-Currency & Fleet Spec Configurator'
    ],
    accentColor: '#F0DDAA'
  },
  {
    id: 'lumina-capital',
    title: 'Lumina Capital Partners',
    client: 'Lumina Global Wealth Tech',
    category: 'SEO',
    tagline: 'Capturing High-Value Institutional Keywords & $42M AUM Inflow',
    year: '2025',
    challenge: 'As an emerging wealth tech firm, Lumina struggled to outrank legacy institutional banks in organic search for critical wealth management and family office advisory terms.',
    solution: 'We executed a comprehensive semantic content cluster architecture, fixed deep crawlability bottlenecks, and orchestrated an authoritative digital PR campaign across top financial journals.',
    results: [
      { label: 'Page 1 Rankings', value: '142+', change: 'High-Intent Financial Terms' },
      { label: 'Organic Inflow AUM', value: '$42M', change: 'Directly Attributed' },
      { label: 'Domain Authority', value: '78 DA', change: '+29 Point Increase' },
      { label: 'C-Suite Inbound Calls', value: '280/mo', change: 'Accredited Investors' }
    ],
    testimonial: {
      quote: 'BZ Digital transformed organic search into our most dependable source of institutional capital. The precision of their technical SEO is unmatched.',
      author: 'David Sterling',
      role: 'Managing Partner',
      company: 'Lumina Capital Partners'
    },
    keyFeatures: [
      'Semantic Financial Entity Optimization',
      'Institutional Digital PR Outreach',
      'Dynamic Wealth Calculator Tools',
      'Core Web Vitals Perfection'
    ],
    accentColor: '#9C7B3D'
  },
  {
    id: 'noir-atelier',
    title: 'Noir Atelier Milano',
    client: 'Noir Atelier Fashion House',
    category: 'Branding',
    tagline: 'Global Identity Overhaul & Cult Social Following for Milano Luxury Brand',
    year: '2026',
    challenge: 'A bespoke Milanese apparel house needed a unified visual identity and social narrative to launch their international flagship collection in Paris, Tokyo, and New York.',
    solution: 'BZ Digital crafted an exquisite brand identity, bespoke typography tokens, high-concept editorial campaign videos, and an omnichannel paid social funnel.',
    results: [
      { label: 'Global Sell-Out Time', value: '48 Hours', change: 'First Capsule Drop' },
      { label: 'Social Engagement Rate', value: '8.4%', change: 'Top 1% in Luxury Fashion' },
      { label: 'Editorial Features', value: '24 Tier-1', change: 'Vogue, GQ, Monocle' },
      { label: 'Direct Online Revenue', value: '$8.9M', change: 'In Inaugural Season' }
    ],
    testimonial: {
      quote: 'BZ Digital gave our heritage brand a contemporary soul. Their visual direction is nothing short of art.',
      author: 'Matteo Biancardi',
      role: 'Creative Director',
      company: 'Noir Atelier Milano'
    },
    keyFeatures: [
      'Bespoke Wordmark & Monogram System',
      'Cinematic Editorial Video Direction',
      'VIP Pre-Order Gated Experience',
      'Full Digital Brand Guidelines System'
    ],
    accentColor: '#D6B878'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    clientName: 'Alexander Vance',
    role: 'Chief Executive Officer',
    company: 'Vance & Sterling Private Wealth',
    industry: 'Asset Management',
    rating: 5,
    quote: 'BZ Digital is the rare agency that pairs high-taste creative direction with ruthless mathematical performance. In six months, our client acquisition cost plummeted while deal size tripled.',
    avatarText: 'AV',
    resultsHighlighted: '340% increase in qualified family office inquiries',
    projectScope: 'Omnichannel UHNW Acquisition & Digital Repositioning',
    location: 'London Mayfair & Zurich',
    year: '2025',
    metricValue: '+340%',
    metricLabel: 'Family Office Inquiries'
  },
  {
    id: '2',
    clientName: 'Sophia Laurent',
    role: 'Vice President of Global Marketing',
    company: 'Aurelia Horlogerie Geneva',
    industry: 'Haute Horlogerie',
    rating: 5,
    quote: 'The champagne gold aesthetic and bespoke website they created set a new industry benchmark. Our international collectors constantly praise the seamless digital journey.',
    avatarText: 'SL',
    resultsHighlighted: '5.2x ROAS across European & North American campaigns',
    projectScope: 'Direct-to-Consumer Flagship & Private Salon Concierge',
    location: 'Geneva & Paris',
    year: '2025',
    metricValue: '5.2x',
    metricLabel: 'Blended Paid ROAS'
  },
  {
    id: '3',
    clientName: 'Julian Thorne',
    role: 'Founder & Managing Director',
    company: 'Zenith Supercars',
    industry: 'Automotive & Mobility',
    rating: 5,
    quote: 'Working with BZ Digital was a masterclass in modern digital execution. Every milestone was delivered ahead of schedule, and the animations are fluid art in motion.',
    avatarText: 'JT',
    resultsHighlighted: 'All 50 build slots reserved within 72 hours of launch',
    projectScope: 'Cinema-Grade 3D Hypercar Configurator & Global Launch',
    location: 'Milan & Silverstone',
    year: '2026',
    metricValue: '72 Hrs',
    metricLabel: 'All 50 Slots Allocated'
  },
  {
    id: '4',
    clientName: 'Dr. Camille Moreau',
    role: 'Chief Executive Officer',
    company: 'Solis Longevity Institute',
    industry: 'Biotechnology & Health',
    rating: 5,
    quote: 'Their technical SEO strategy drove high-net-worth patients directly to our flagship clinic without relying on wasteful mass advertising. The ROI has been extraordinary.',
    avatarText: 'CM',
    resultsHighlighted: 'Ranked #1 for 85+ competitive medical longevity search terms',
    projectScope: 'Authority SEO, Editorial White Papers & Patient Acquisition',
    location: 'Monaco & New York',
    year: '2025',
    metricValue: '#1 Rank',
    metricLabel: '85+ Competitive Keywords'
  },
  {
    id: '5',
    clientName: 'Henrik Lindqvist',
    role: 'Chief Digital Officer',
    company: 'Nordic Architecture Collective',
    industry: 'Architecture & Design',
    rating: 5,
    quote: 'BZ Digital operates with the elegance of a boutique atelier and the analytical rigour of a top-tier management consultancy. We cannot recommend them highly enough.',
    avatarText: 'HL',
    resultsHighlighted: '99/100 Lighthouse performance & 210% increase in global tenders',
    projectScope: 'Digital Identity, Minimalist Web Architecture & Global Monograph',
    location: 'Stockholm & Copenhagen',
    year: '2026',
    metricValue: '+210%',
    metricLabel: 'Global Tenders Won'
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Forensic Audit & Ambition Mapping',
    description: 'We conduct a deep forensic audit of your market positioning, competitor blindspots, technical hurdles, and unit economics to establish an empirical roadmap for dominance.',
    deliverables: ['Competitive Moat Analysis', 'Full Technical Health Audit', 'Audience Segmentation Model', 'High-Intent Revenue Roadmap'],
    highlight: 'Data-driven diagnosis before prescription.'
  },
  {
    number: '02',
    title: 'Strategize',
    tagline: 'Architecting the Growth Engine',
    description: 'We develop bespoke creative frameworks, full-funnel media buying architectures, and search dominance blueprints configured specifically to your profit targets.',
    deliverables: ['Full-Funnel Acquisition Blueprint', 'Creative Narrative & Angle Matrix', 'Conversion Architecture Design', 'Attribution & Tracking Schema'],
    highlight: 'Zero guesswork. Empirical growth modeling.'
  },
  {
    number: '03',
    title: 'Create',
    tagline: 'Cinema-Grade Execution & Engineering',
    description: 'Our designers, animators, and software engineers craft bespoke digital experiences, high-converting ad creative, and lightning-fast web infrastructure.',
    deliverables: ['Sub-Second React/Vite Development', 'High-Impact Motion & 3D Assets', 'Multi-Variant Ad Creative Suites', 'Automated Lead & CRM Routing'],
    highlight: 'Haute aesthetics meets technical perfection.'
  },
  {
    number: '04',
    title: 'Optimize',
    tagline: 'Continuous Algorithmic Refinement',
    description: 'Through multivariate experimentation, predictive bid adjustments, and conversion rate engineering, we compound your competitive advantage month after month.',
    deliverables: ['Iterative A/B Landing Page Testing', 'Dynamic Audience Re-Modeling', 'Executive Monthly Boardroom Reviews', 'LTV & Cohort Retention Optimization'],
    highlight: 'Compounding returns that build category moats.'
  }
];

export const AGENCY_METRICS = [
  { value: 140, suffix: 'M+', prefix: '$', label: 'Client Revenue Influenced', note: 'Cumulative client impact across active campaigns' },
  { value: 340, suffix: '%', prefix: '+', label: 'Average Organic Lift', note: 'Measured within 6 months of technical deployment' },
  { value: 4.8, suffix: 'x', prefix: '', label: 'Blended Paid ROAS', note: 'Across Google, Meta & programmatic channels' },
  { value: 98.4, suffix: '%', prefix: '', label: 'Client Retention Rate', note: 'Long-term enterprise growth partnerships' }
];

export const FAQ_ITEMS = [
  {
    category: 'Services',
    question: 'What types of companies does BZ Digital partner with?',
    answer: 'We partner with ambitious mid-market to enterprise companies, luxury brands, high-growth technology ventures, and professional service firms seeking transformative growth. Whether you require a full-funnel growth engine or a cinema-grade digital flagship, we tailor our engagements to serious brands ready to command category leadership.'
  },
  {
    category: 'Timelines',
    question: 'How quickly can we expect to see measurable results?',
    answer: 'While performance marketing and paid media campaigns typically generate qualified leads and sales within the first 14 to 30 days of campaign launch, enterprise SEO and organic dominance strategies compound over 3 to 6 months. For bespoke web design and development projects, typical sprint cycles range from 6 to 10 weeks from concept approval to production deployment.'
  },
  {
    category: 'Pricing',
    question: 'How are your engagements and pricing structured?',
    answer: 'We offer flexible, transparent engagement models tailored to client scope. Ongoing growth retainers (covering SEO, Performance Marketing, and Content) typically start between $3,500 and $7,500 per month depending on market complexity and scale. Bespoke web design and development projects are quoted on a transparent fixed-deliverable basis, generally starting at $8,500.'
  },
  {
    category: 'SEO & Ads',
    question: 'How do you guarantee transparent reporting and accurate attribution?',
    answer: 'We abhor vanity metrics. All clients receive live 24/7 executive dashboards built on first-party attribution data, server-side Conversion APIs (CAPI), and Blended Marketing Efficiency Ratios (MER). You will always know precisely how much revenue every advertising dollar generated down to the dollar.'
  },
  {
    category: 'Web Development',
    question: 'What technology stack do you use for website development?',
    answer: 'We build primarily with modern, resilient technologies including React, Vite, TypeScript, Tailwind CSS, Framer Motion, and lightweight headless content management systems. Our builds consistently achieve 95+ Google Lighthouse scores, sub-second TTFB, and strict accessibility standards.'
  },
  {
    category: 'Communication',
    question: 'What does day-to-day communication look like during an engagement?',
    answer: 'Every client is paired with a dedicated Senior Growth Strategist and Technical Director. We establish a private Slack or Microsoft Teams channel for real-time correspondence, hold bi-weekly strategic sprint calls, and deliver comprehensive monthly executive performance reviews.'
  },
  {
    category: 'Onboarding',
    question: 'What is the process to get started with BZ Digital?',
    answer: 'Initiate the conversation by submitting the quote request form or booking a discovery consultation. We will conduct a preliminary assessment of your brand, schedule a 30-minute strategic discovery call to align on growth targets, and present a custom roadmap and proposal within 72 hours.'
  }
];

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: 'high-converting-luxury-web-experiences',
    title: 'The Architecture of High-Converting Luxury Web Experiences in 2026',
    excerpt: 'Why ultra-clean typography, restrained motion design, and sub-second performance are outconverting conventional e-commerce layouts by 300%.',
    category: 'Web Design & UX',
    readTime: '6 min read',
    date: 'February 18, 2026',
    author: {
      name: 'Julian Vance',
      role: 'Principal Creative Director'
    },
    keyTakeaways: [
      'Micro-interactions must communicate prestige, not create latency.',
      'Champagne and deep charcoal palettes elicit trust in high-ticket transactions.',
      'First-party data collection must feel like an exclusive concierge service.',
      'Headless architectures with sub-second page transitions retain affluent buyers.'
    ],
    content: [
      'In high-end commerce, the digital environment must mirror the bespoke attention of a Mayfair or Madison Avenue boutique. Traditional web templates saturated with flashing banners and aggressive countdown timers shatter the illusion of luxury.',
      'Our research across $50M+ in luxury e-commerce reveals that discerning clients value friction-free elegance above all. When every transition glides with purposeful inertia and text hierarchies are mathematically proportioned, users subconsciously perceive superior product value.',
      'By decoupling frontends through modern React architectures and applying bespoke motion curves, we eliminate the clunky page reloads that cause luxury shoppers to abandon carts.',
      'The modern luxury interface is not merely a catalog; it is an editorial monograph that invites quiet contemplation, emotional alignment, and decisive action.'
    ]
  },
  {
    slug: 'beyond-roas-measuring-brand-equity',
    title: 'Beyond ROAS: The New Rules of Unit Economics in Performance Marketing',
    excerpt: 'Platform-reported ROAS is no longer sufficient. Discover why leading CMOs are pivoting to Blended MER, First-Party LTV, and incremental margin modeling.',
    category: 'Performance Marketing',
    readTime: '8 min read',
    date: 'January 29, 2026',
    author: {
      name: 'Claire Kensington',
      role: 'Head of Growth & Analytics'
    },
    keyTakeaways: [
      'Relying solely on in-platform ROAS obscures ad fatigue and cannibalization.',
      'Marketing Efficiency Ratio (MER) provides the true indicator of top-line scalability.',
      'Server-side tracking (CAPI) recovers up to 35% of lost attribution data.',
      'Creative iteration speed is the ultimate hedge against rising ad costs.'
    ],
    content: [
      'The era of cheap, algorithmic ad buying is definitively behind us. With privacy regulations and attribution signal degradation, relying solely on platform-reported ROAS creates dangerous blind spots.',
      'At BZ Digital, we evaluate growth through a tri-pillar framework: Blended MER (Total Revenue divided by Total Ad Spend), Incremental Lift Testing, and Cohort Net Present Value.',
      'Brands that scale past eight figures do not win by hacking bidding algorithms. They win through dynamic creative testing at scale, pairing arresting visual hooks with rigorously tested value propositions.',
      'When your creative communicates undeniable prestige and your tracking infrastructure captures every server-side touchpoint, scaling paid media becomes a predictable capital investment.'
    ]
  },
  {
    slug: 'technical-seo-semantic-ai-search',
    title: 'Mastering Technical SEO for Semantic Search and Generative AI Overviews',
    excerpt: 'How search engines and LLM answer engines evaluate digital authority, and the exact schema architecture needed to claim position zero.',
    category: 'Search Engine Optimization',
    readTime: '7 min read',
    date: 'January 14, 2026',
    author: {
      name: 'Siddharth Mehta',
      role: 'Director of Search Intelligence'
    },
    keyTakeaways: [
      'Search engines now index entities and relational knowledge graphs, not just keywords.',
      'Generative AI Overviews favor clear citation hooks and structured JSON-LD data.',
      'Technical performance and Core Web Vitals remain the foundational entry ticket.',
      'High-tier editorial digital PR provides the external validation AI engines trust.'
    ],
    content: [
      'Search engines have transformed into semantic reasoning engines. Ranking in the top positions now requires structuring your website as an authoritative knowledge graph that AI crawlers can effortlessly ingest and verify.',
      'By embedding rich JSON-LD schemas, author authority profiles, and clear contextual relationships between topical clusters, we train search algorithms to regard your brand as the canonical source of truth.',
      'Moreover, as AI Overviews become the default interface for executive search queries, inclusion in summary syntheses requires clean factual density and high algorithmic crawl efficiency.',
      'Those who invest in technical SEO fundamentals today will own the primary traffic corridors of the next decade.'
    ]
  },
  {
    slug: 'psychology-of-champagne-aesthetics',
    title: 'The Psychology of Champagne Gold: Crafting Category-Defining Brands',
    excerpt: 'An exploration of color theory, contrast ratios, and typographic resonance in modern digital branding.',
    category: 'Brand Strategy',
    readTime: '5 min read',
    date: 'December 28, 2025',
    author: {
      name: 'Julian Vance',
      role: 'Principal Creative Director'
    },
    keyTakeaways: [
      'Subtle metallic warmth builds warmth and emotional security without gaudiness.',
      'Deep obsidian backgrounds enhance perceived contrast and visual focus.',
      'Typographic rhythm with serif accents communicates enduring heritage.',
      'Restraint in color palette signals confidence and authority.'
    ],
    content: [
      'Color in luxury branding is never accidental. While neon palettes scream for fleeting attention, the harmonious interplay of deep obsidian `#080808` and warm champagne gold `#D6B878` communicates timeless permanence.',
      'Champagne gold carries historical connotations of celebratory triumph, artisanal craftsmanship, and quiet affluence. When paired with disciplined geometric typography, it bridges classic heritage with futuristic confidence.',
      'By adhering to a strict, intentional palette and eliminating visual noise, a brand signals that it does not need to shout to be heard. Its presence alone commands reverence.'
    ]
  }
];

export const AGENCY_STATS = [
  { label: 'Years of Excellence', value: '8+' },
  { label: 'Growth Awards Won', value: '24' },
  { label: 'Client Success Rate', value: '98%' },
  { label: 'Average Growth Multiple', value: '3.4x' }
];

export const OFFICE_LOCATIONS = [
  {
    city: 'London',
    address: '14 Berkeley Square, Mayfair, London W1J 6BQ',
    phone: '+44 (0) 20 7946 0912',
    email: 'london@bzdigital.agency',
    hours: 'Mon – Fri: 09:00 – 18:00 GMT'
  },
  {
    city: 'New York',
    address: '430 Park Avenue, 18th Floor, New York, NY 10022',
    phone: '+1 (212) 555-0194',
    email: 'newyork@bzdigital.agency',
    hours: 'Mon – Fri: 09:00 – 18:00 EST'
  },
  {
    city: 'Dubai',
    address: 'DIFC Gate Precinct 4, Level 6, Dubai, UAE',
    phone: '+971 4 362 7800',
    email: 'dubai@bzdigital.agency',
    hours: 'Mon – Fri: 09:00 – 18:00 GST'
  }
];

export interface AwardItem {
  id: string;
  organization: string;
  title: string;
  category: 'Craft & WebGL' | 'Strategy & Growth' | 'Design & UX' | 'Enterprise SEO';
  year: string;
  badgeType: 'trophy' | 'wreath' | 'crown' | 'star' | 'diamond' | 'shield' | 'ribbon' | 'seal';
  metric: string;
  citation: string;
  project: string;
  jury: string;
}

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'awwwards-sotd',
    organization: 'Awwwards International',
    title: 'Site of the Day & Developer Award',
    category: 'Craft & WebGL',
    year: '2026',
    badgeType: 'wreath',
    metric: '9.24 / 10 Score',
    citation: 'Flawless procedural kinematics, sub-second WebGL TTFB, and uncompromising editorial luxury aesthetics.',
    project: 'Vespera Haute Horlogerie 3D Studio',
    jury: 'Awwwards International Grand Jury'
  },
  {
    id: 'fwa-day',
    organization: 'The FWA',
    title: 'FWA of the Day & Mobile Winner',
    category: 'Craft & WebGL',
    year: '2026',
    badgeType: 'star',
    metric: 'Filmic PBR Studio',
    citation: 'Pushing browser shaders to cinema standards with ACES filmic colorimetry and zero mobile GPU latency.',
    project: 'BZ Digital Real-Time 3D Atelier',
    jury: 'FWA Global Executive Board'
  },
  {
    id: 'luxury-daily-agency',
    organization: 'Luxury Daily New York',
    title: 'Best Luxury Digital Agency of the Year',
    category: 'Strategy & Growth',
    year: '2025',
    badgeType: 'crown',
    metric: 'Category Winner',
    citation: 'Unmatched mastery in translating high-net-worth commercial intent into verified enterprise valuation.',
    project: 'Sovereign Wealth & Private Aviation',
    jury: 'Luxury Daily Executive Editorial Board'
  },
  {
    id: 'webby-honoree',
    organization: 'The Webby Awards',
    title: 'Best Visual Design & Aesthetics Honoree',
    category: 'Design & UX',
    year: '2025',
    badgeType: 'trophy',
    metric: 'Top 1% Worldwide',
    citation: 'Exceptional editorial rhythm, bespoke typographic composition, and seamless high-ticket commerce flow.',
    project: 'Aurelia Haute Parfumerie Flagship',
    jury: 'IADAS (International Academy of Digital Arts & Sciences)'
  },
  {
    id: 'cssda-kudos',
    organization: 'CSS Design Awards',
    title: 'Special Kudos & Innovation Award',
    category: 'Design & UX',
    year: '2025',
    badgeType: 'diamond',
    metric: '98 Lighthouse Score',
    citation: 'An exemplary union of neoclassical aesthetic restraint, kinetic typography, and sub-second performance.',
    project: 'Sub-Second Headless Commerce Engine',
    jury: 'CSSDA International Design Panel'
  },
  {
    id: 'search-engine-land',
    organization: 'Search Engine Land',
    title: 'Enterprise SEO Campaign of the Year',
    category: 'Enterprise SEO',
    year: '2024',
    badgeType: 'shield',
    metric: '+340% YoY ARR',
    citation: 'Category dominance attained through proprietary entity-graph architectures and automated programmatic SEO.',
    project: 'Semantic Organic Authority Infrastructure',
    jury: 'Search Engine Land Editorial Board'
  },
  {
    id: 'drum-agency',
    organization: 'The Drum Awards London',
    title: 'Performance Marketing Agency of the Year',
    category: 'Strategy & Growth',
    year: '2024',
    badgeType: 'ribbon',
    metric: '4.8x Blended ROAS',
    citation: 'Eliminating third-party cookie reliance via server-side Conversion APIs and blended revenue modeling.',
    project: 'Algorithmic Server-Side Attribution',
    jury: 'The Drum UK Judging Panel'
  },
  {
    id: 'red-dot-brand',
    organization: 'Red Dot Design Award',
    title: 'Brands & Communication Design Winner',
    category: 'Design & UX',
    year: '2025',
    badgeType: 'seal',
    metric: 'Best of the Best',
    citation: 'Timeless luxury identity rooted in sacred geometry, custom champagne gradients, and digital tactile presence.',
    project: 'BZ Digital Monogram & Design System',
    jury: 'Red Dot International Jury Essen'
  },
  {
    id: 'w3-awards-gold',
    organization: 'W3 Awards Global',
    title: 'Gold Award in Corporate Digital Experience',
    category: 'Strategy & Growth',
    year: '2025',
    badgeType: 'trophy',
    metric: 'Gold Medallion',
    citation: 'Transformative high-ticket digital interface producing a 38% increase in qualified private charter contracts.',
    project: 'AeroDynamics Global Private Aviation',
    jury: 'Academy of Interactive & Visual Arts'
  },
  {
    id: 'mindsparkle-mag',
    organization: 'Mindsparkle Mag',
    title: 'Site of the Month & Curators Pick',
    category: 'Craft & WebGL',
    year: '2026',
    badgeType: 'wreath',
    metric: 'Curatorial Excellence',
    citation: 'A mesmerizing demonstration of interactive 3D procedural mechanics embedded natively into high-end commerce.',
    project: 'Interactive Kinetic Chronograph Studio',
    jury: 'Mindsparkle Curatorial Board'
  }
];

