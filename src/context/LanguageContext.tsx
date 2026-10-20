import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'FR' | 'DE' | 'ES' | 'IT' | 'AR';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'EN',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    region: 'Global / UK & US',
    dir: 'ltr',
  },
  {
    code: 'FR',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'France & Suisse',
    dir: 'ltr',
  },
  {
    code: 'DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    region: 'DACH & Enterprise',
    dir: 'ltr',
  },
  {
    code: 'ES',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    region: 'España & LATAM',
    dir: 'ltr',
  },
  {
    code: 'IT',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    region: 'Milano & Design',
    dir: 'ltr',
  },
  {
    code: 'AR',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    region: 'GCC & Middle East',
    dir: 'rtl',
  },
];

interface LanguageContextType {
  language: Language;
  languageInfo: LanguageInfo;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.work': 'Our Work',
    'nav.process': 'Process',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Get a Free Quote',
    'nav.practicesTitle': 'Core Agency Practices',
    'nav.allPractices': 'View All 6 Practices & Pricing →',
    'nav.atelier3d': '3D Atelier',
    'nav.languageLabel': 'Select Language',
    'nav.themeLabel': 'Aesthetic Theme',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.badge': 'CREATIVE DIGITAL MARKETING AGENCY',
    'hero.titlePart1': 'We Turn Digital Ambition Into',
    'hero.titlePart2': 'Real Growth.',
    'hero.description': 'At BZ Digital, we architect cinema-grade web platforms, scalable performance media campaigns, and high-authority organic search infrastructure for brands ready to lead their category. No vanity metrics — only compounding enterprise revenue.',
    'hero.ctaGrowth': 'Let’s Talk Growth',
    'hero.ctaWork': 'Explore Our Work',
    'hero.statRevenue': 'Attributed Client Revenue',
    'hero.statRetention': 'Client Retention Rate',
    'hero.statPartners': '50+ Global Brand Partners',

    // Trusted By Marquee
    'marquee.badge': 'TRUSTED BY LUXURY & ENTERPRISE LEADERS',
    'marquee.title': 'Trusted by Preeminent Luxury & Growth Brands.',
    'marquee.subtitle': 'Distinguished global partners across Haute Horlogerie, Private Aviation, Sovereign Wealth, and Frontier Technology.',

    // About Section
    'about.badge': 'AGENCY PHILOSOPHY',
    'about.titlePart1': 'Strategy Meets',
    'about.titlePart2': 'Creativity.',
    'about.p1': 'Most digital agencies force you to choose between breathtaking artistic design and cold, clinical performance marketing. BZ Digital was founded on the conviction that category leaders require both in equal measure.',
    'about.p2': 'We operate as a high-velocity extension of your executive leadership team, engineering full-funnel digital journeys that capture imagination and convert high-ticket intent into compounding enterprise valuation.',
    'about.cta': 'Discover Our Story & Leadership',
    'about.pillarStrategy': 'Strategy',
    'about.pillarStrategyDesc': 'Forensic market positioning and mathematical commercial modeling tailored to eliminate guesswork.',
    'about.pillarCreativity': 'Creativity',
    'about.pillarCreativityDesc': 'Cinema-grade visual aesthetics, bespoke typography, and evocative storytelling that command reverence.',
    'about.pillarTech': 'Technology',
    'about.pillarTechDesc': 'Sub-second headless web architectures, automated server-side attribution, and algorithmic bidding pipelines.',
    'about.pillarPerf': 'Performance',
    'about.pillarPerfDesc': 'Relentless conversion rate optimization and blended revenue growth engineering that scales top-line profit.',

    // Services Section
    'services.badge': 'DISCIPLINED PRACTICES',
    'services.titlePart1': 'Comprehensive Services Engineered for',
    'services.titlePart2': 'Domination.',
    'services.subtitle': 'Six interconnected digital disciplines executing in complete harmony to capture market share, build prestige, and accelerate returns.',
    'services.discover': 'Discover Service',
    'services.viewAll': 'Explore All 6 Practices',

    // 3D Atelier
    'atelier.badge': 'NEW: REAL-TIME THREE.JS 3D ATELIER',
    'atelier.titlePart1': 'Immersive Procedural',
    'atelier.titlePart2': '3D Digital Craftsmanship',
    'atelier.desc': 'Step inside our interactive Three.js 3D Studio. Inspect procedural Haute Horlogerie chronographs, kinetic monoliths, and aerodynamic silhouettes rendered with studio ACES filmic PBR lighting, exploded layer kinematics, and interactive material customization.',
    'atelier.cta': 'Launch Interactive 3D Studio',

    // Process
    'process.badge': 'METHODOLOGY',
    'process.title': 'Our Four-Step Growth Engine.',
    'process.subtitle': 'A structured, systematic methodology refined over hundreds of enterprise engagements to remove risk and guarantee compound expansion.',
    'process.step1': '01. Discovery & Forensic Audit',
    'process.step2': '02. Bespoke Growth Architecture',
    'process.step3': '03. Precision Agile Execution',
    'process.step4': '04. Optimization & Category Domination',

    // Testimonials
    'testimonials.badge': 'CLIENT TESTIMONIALS',
    'testimonials.title': 'Endorsements of Distinction.',
    'testimonials.subtitle': 'Direct accounts from the founders, CMOs, and executive partners who trust BZ Digital with their digital equity.',

    // Contact
    'contact.badge': 'START A CONVERSATION',
    'contact.titlePart1': 'Let’s Turn Ambition Into',
    'contact.titlePart2': 'Reality.',
    'contact.subtitle': 'Schedule a private consultation with our principal strategists. We evaluate your current commercial stack and return a bespoke growth roadmap within 48 hours.',
    'contact.formName': 'Full Name',
    'contact.formEmail': 'Executive Email',
    'contact.formCompany': 'Company / Brand Name',
    'contact.formBudget': 'Target Investment Budget',
    'contact.formService': 'Primary Practice Required',
    'contact.formMessage': 'Project Scope & Objectives',
    'contact.submit': 'Request Private Briefing',

    // Footer
    'footer.memorandum': 'THE BZ DIGITAL MEMORANDUM',
    'footer.newsletterTitle': 'Insights for Category Leaders.',
    'footer.newsletterSubtitle': 'A monthly executive briefing on digital prestige, high-intent acquisition, and algorithmic market capture.',
    'footer.subscribe': 'Subscribe',
    'footer.backToTop': 'Back to Top',
    'footer.corePractices': 'Core Practices',
    'footer.agency': 'Agency',
    'footer.legal': 'Legal & Privacy',
    'footer.rights': 'All rights reserved. Engineered for category leaders worldwide.',

    // Quote Modal
    'quote.title': 'Request a Bespoke Proposal',
    'quote.subtitle': 'Tell us about your brand vision, target timeline, and growth targets. Our partners will formulate a tailored engagement strategy.',
    'quote.step1': 'Practice Selection',
    'quote.step2': 'Investment Scope',
    'quote.step3': 'Executive Contact',
  },

  FR: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Prestations',
    'nav.work': 'Nos Travaux',
    'nav.process': 'Méthodologie',
    'nav.blog': 'Éditorial',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Devis Sur-Mesure',
    'nav.practicesTitle': 'Expertises de l’Atelier',
    'nav.allPractices': 'Consulter nos 6 expertises & tarifs →',
    'nav.atelier3d': 'Atelier 3D',
    'nav.languageLabel': 'Choisir la langue',
    'nav.themeLabel': 'Thème Visuel',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.badge': 'AGENCE CRÉATIVE DE MARKETING DIGITAL',
    'hero.titlePart1': 'Nous Transformons l’Ambition Digitale en',
    'hero.titlePart2': 'Croissance Mesurable.',
    'hero.description': 'Chez BZ Digital, nous architecturons des plateformes web cinématographiques, des campagnes d’acquisition à fort rendement et une infrastructure SEO d’autorité pour les marques leaders. Aucune métrique de vanité — uniquement de la rentabilité d’entreprise.',
    'hero.ctaGrowth': 'Parlons Croissance',
    'hero.ctaWork': 'Explorer Nos Réalisations',
    'hero.statRevenue': 'Chiffre d’Affaires Attribué',
    'hero.statRetention': 'Taux de Fidélisation Client',
    'hero.statPartners': '50+ Marques Partenaires Mondiales',

    // Trusted By Marquee
    'marquee.badge': 'LA CONFIANCE DES LEADERS DU LUXE',
    'marquee.title': 'La Confiance des Marques d’Exception.',
    'marquee.subtitle': 'Partenaires mondiaux de référence dans la haute horlogerie, l’aviation privée, le private equity et la technologie de pointe.',

    // About Section
    'about.badge': 'PHILOSOPHIE DE L’AGENCE',
    'about.titlePart1': 'La Stratégie Épouse',
    'about.titlePart2': 'la Créativité.',
    'about.p1': 'La plupart des agences numériques vous obligent à choisir entre l’esthétique artistique et le marketing de performance analytique. BZ Digital est née de la conviction que les marques de référence exigent les deux à part égale.',
    'about.p2': 'Nous agissons comme le prolongement direct de votre direction générale, concevant des expériences immersives qui captivent et transforment l’intérêt premium en valorisation pérenne.',
    'about.cta': 'Découvrir Notre Histoire & Direction',
    'about.pillarStrategy': 'Stratégie',
    'about.pillarStrategyDesc': 'Positionnement de marché chirurgical et modélisation commerciale pour éradiquer l’aléa.',
    'about.pillarCreativity': 'Créativité',
    'about.pillarCreativityDesc': 'Esthétique cinématographique, typographie sur-mesure et récits saisissants forçant le respect.',
    'about.pillarTech': 'Technologie',
    'about.pillarTechDesc': 'Architectures headless ultra-rapides, attribution temps réel et pipelines d’enchères algorithmiques.',
    'about.pillarPerf': 'Performance',
    'about.pillarPerfDesc': 'Optimisation rigoureuse de la conversion et ingénierie de croissance démultipliant le profit net.',

    // Services Section
    'services.badge': 'DISCIPLINES DE POINTE',
    'services.titlePart1': 'Des Expertises Complètes Calibrées pour',
    'services.titlePart2': 'la Domination.',
    'services.subtitle': 'Six disciplines numériques interconnectées exécutées en parfaite harmonie pour conquérir des parts de marché et asseoir votre prestige.',
    'services.discover': 'Découvrir l’Expertise',
    'services.viewAll': 'Découvrir nos 6 expertises',

    // 3D Atelier
    'atelier.badge': 'NOUVEAU : ATELIER 3D TEMPS RÉEL THREE.JS',
    'atelier.titlePart1': 'Artisanat Numérique',
    'atelier.titlePart2': '3D Procédural & Immersif',
    'atelier.desc': 'Pénétrez au sein de notre studio interactif 3D Three.js. Inspectez chronographes de haute horlogerie, monolithes cinétiques et silhouettes aérodynamiques sous un éclairage PBR studio filmique, avec éclatement cinématique des couches.',
    'atelier.cta': 'Lancer le Studio 3D Interactif',

    // Process
    'process.badge': 'MÉTHODOLOGIE',
    'process.title': 'Notre Moteur de Croissance en 4 Étapes.',
    'process.subtitle': 'Une méthode rigoureuse et éprouvée auprès d’acteurs d’envergure pour éliminer le risque et catalyser une expansion durable.',
    'process.step1': '01. Découverte & Audit Approfondi',
    'process.step2': '02. Architecture de Croissance Sur-Mesure',
    'process.step3': '03. Exécution Agile & Millimétrée',
    'process.step4': '04. Optimisation & Hégémonie de Marché',

    // Testimonials
    'testimonials.badge': 'TÉMOIGNAGES CLIENTS',
    'testimonials.title': 'Des Recommandations d’Excellence.',
    'testimonials.subtitle': 'Témoignages authentiques de fondateurs, directeurs marketing et dirigeants confiant leur capital digital à BZ Digital.',

    // Contact
    'contact.badge': 'NOUER LE DIALOGUE',
    'contact.titlePart1': 'Concrétisons Vos Ambitions en',
    'contact.titlePart2': 'Réalité Commerciale.',
    'contact.subtitle': 'Réservez un échange confidentiel avec nos directeurs stratégiques. Nous analysons vos actifs digitaux et vous livrons une feuille de route sous 48h.',
    'contact.formName': 'Nom Complet',
    'contact.formEmail': 'Courriel Professionnel',
    'contact.formCompany': 'Entreprise / Maison',
    'contact.formBudget': 'Budget d’Investissement Ciblé',
    'contact.formService': 'Expertise Principale Requise',
    'contact.formMessage': 'Envergure & Objectifs du Projet',
    'contact.submit': 'Demander un Briefing Privé',

    // Footer
    'footer.memorandum': 'LE MÉMORANDUM BZ DIGITAL',
    'footer.newsletterTitle': 'L’Intelligence des Leaders du Marché.',
    'footer.newsletterSubtitle': 'Une note mensuelle réservée aux dirigeants sur le prestige numérique et la conquête algorithmique.',
    'footer.subscribe': 'S’inscrire',
    'footer.backToTop': 'Haut de Page',
    'footer.corePractices': 'Disciplines Fondatrices',
    'footer.agency': 'Maison BZ',
    'footer.legal': 'Mentions Légales & Confidentialité',
    'footer.rights': 'Tous droits réservés. Façonné pour les leaders mondiaux.',

    // Quote Modal
    'quote.title': 'Solliciter une Proposition Exécutive',
    'quote.subtitle': 'Partagez la vision de votre marque, votre calendrier et vos ambitions. Nos associés établiront une stratégie sur-mesure.',
    'quote.step1': 'Sélection de l’Expertise',
    'quote.step2': 'Enveloppe d’Investissement',
    'quote.step3': 'Coordonnées de Direction',
  },

  DE: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.services': 'Leistungen',
    'nav.work': 'Referenzen',
    'nav.process': 'Methodik',
    'nav.blog': 'Journal',
    'nav.contact': 'Kontakt',
    'nav.getQuote': 'Kostenloses Angebot',
    'nav.practicesTitle': 'Kernkompetenzen der Agentur',
    'nav.allPractices': 'Alle 6 Kernbereiche & Preise ansehen →',
    'nav.atelier3d': '3D Atelier',
    'nav.languageLabel': 'Sprache Wählen',
    'nav.themeLabel': 'Visuelles Design',
    'nav.menu': 'Menü',

    // Hero Section
    'hero.badge': 'KREATIVE DIGITAL-MARKETING-AGENTUR',
    'hero.titlePart1': 'Wir Verwandeln Digitale Ambition in',
    'hero.titlePart2': 'Messbares Wachstum.',
    'hero.description': 'Bei BZ Digital entwickeln wir filmreife Web-Plattformen, hochskalierbare Performance-Media-Kampagnen und erstklassige SEO-Infrastrukturen für zukunftsorientierte Marken. Keine Eitelkeitsmetriken — nur nachhaltiger Unternehmensumsatz.',
    'hero.ctaGrowth': 'Lassen Sie Uns Wachsen',
    'hero.ctaWork': 'Unsere Arbeiten Erkunden',
    'hero.statRevenue': 'Generierter Kundenumsatz',
    'hero.statRetention': 'Kundenbindungsrate',
    'hero.statPartners': '50+ Globale Markenpartner',

    // Trusted By Marquee
    'marquee.badge': 'VERTRAUT VON LUXUS- & ENTERPRISE-LEADERN',
    'marquee.title': 'Das Vertrauen Führender Luxus- & Wachstumsmarken.',
    'marquee.subtitle': 'Renommierte globale Partner aus Haute Horlogerie, privater Luftfahrt, Private Equity und Zukunftstechnologien.',

    // About Section
    'about.badge': 'AGENTURPHILOSOPHIE',
    'about.titlePart1': 'Strategie Trifft Auf',
    'about.titlePart2': 'Kreativität.',
    'about.p1': 'Viele Digitalagenturen verlangen die Entscheidung zwischen atemberaubendem Design und kühlem Performance-Marketing. BZ Digital vereint beides mit kompromissloser Exzellenz.',
    'about.p2': 'Als strategischer Partner Ihrer Geschäftsführung schaffen wir ganzheitliche digitale Markenerlebnisse, die begeistern und wertvollen Kundenkontakt in langfristigen Unternehmenswert übersetzen.',
    'about.cta': 'Unsere Geschichte & Führung Entdecken',
    'about.pillarStrategy': 'Strategie',
    'about.pillarStrategyDesc': 'Präzise Marktpositionierung und fundierte Geschäftsmodelle ohne spekulative Risiken.',
    'about.pillarCreativity': 'Kreativität',
    'about.pillarCreativityDesc': 'Cineastische Ästhetik, exklusive Typografie und Storytelling mit höchster Strahlkraft.',
    'about.pillarTech': 'Technologie',
    'about.pillarTechDesc': 'Sub-Sekunden Headless-Architekturen und automatisierte serverbasierte Attributionssysteme.',
    'about.pillarPerf': 'Performance',
    'about.pillarPerfDesc': 'Unerbittliche Conversion-Optimierung für maximal skalierbare Unternehmensgewinne.',

    // Services Section
    'services.badge': 'KRAFTVOLLE DISZIPLINEN',
    'services.titlePart1': 'Ganzheitliche Leistungen Konzipiert für',
    'services.titlePart2': 'Marktführerschaft.',
    'services.subtitle': 'Sechs ineinandergreifende digitale Disziplinen im perfekten Zusammenspiel zur Marktdominanz und Wertsteigerung.',
    'services.discover': 'Disziplin Entdecken',
    'services.viewAll': 'Alle 6 Kernbereiche Entdecken',

    // 3D Atelier
    'atelier.badge': 'NEU: ECHTZEIT THREE.JS 3D ATELIER',
    'atelier.titlePart1': 'Immersive Prozedurale',
    'atelier.titlePart2': '3D-Handwerkskunst',
    'atelier.desc': 'Betreten Sie unser interaktives Three.js 3D-Studio. Entdecken Sie Uhrmacherkunst, kinetische Monolithen und aerodynamische Formen mit studiofilmfähigem ACES PBR-Licht und interaktiven Materialvarianten.',
    'atelier.cta': 'Interaktives 3D-Studio Starten',

    // Process
    'process.badge': 'METHODIK',
    'process.title': 'Unser 4-Stufen-Wachstumsmotor.',
    'process.subtitle': 'Eine bewährte, risikoarme Vorgehensweise für messbare und planbare Unternehmensskalierung.',
    'process.step1': '01. Analyse & Forensisches Audit',
    'process.step2': '02. Maßgeschneiderte Wachstumsarchitektur',
    'process.step3': '03. Präzise Agile Umsetzung',
    'process.step4': '04. Optimierung & Marktführerschaft',

    // Testimonials
    'testimonials.badge': 'KUNDENSTIMMEN',
    'testimonials.title': 'Empfehlungen von Rang.',
    'testimonials.subtitle': 'Aussagen von Gründern und Führungskräften, die BZ Digital ihr digitales Markenkapital anvertrauen.',

    // Contact
    'contact.badge': 'DIALOG BEGINNEN',
    'contact.titlePart1': 'Lassen Sie Uns Ambitionen in',
    'contact.titlePart2': 'Erfolg Verwandeln.',
    'contact.subtitle': 'Vereinbaren Sie ein vertrauliches Beratungsgespräch. Wir analysieren Ihr digitales Setup und liefern innerhalb von 48 Stunden eine konkrete Roadmap.',
    'contact.formName': 'Vollständiger Name',
    'contact.formEmail': 'Geschäftliche E-Mail',
    'contact.formCompany': 'Unternehmen / Marke',
    'contact.formBudget': 'Geplantes Investitionsvolumen',
    'contact.formService': 'Gewünschte Kernleistung',
    'contact.formMessage': 'Projektumfang & Zielsetzungen',
    'contact.submit': 'Vertrauliches Briefing Anfordern',

    // Footer
    'footer.memorandum': 'DAS BZ DIGITAL MEMORANDUM',
    'footer.newsletterTitle': 'Wissen für Marktführer.',
    'footer.newsletterSubtitle': 'Ein monatlicher Leitfaden zu digitaler Vorherrschaft und algorithmischer Kundenakquise.',
    'footer.subscribe': 'Abonnieren',
    'footer.backToTop': 'Nach Oben',
    'footer.corePractices': 'Kernkompetenzen',
    'footer.agency': 'Agentur',
    'footer.legal': 'Rechtliches & Datenschutz',
    'footer.rights': 'Alle Rechte vorbehalten. Entwickelt für globale Vorreiter.',

    // Quote Modal
    'quote.title': 'Maßgeschneidertes Angebot Anfordern',
    'quote.subtitle': 'Beschreiben Sie Ihre Markenvision und Ziele. Unsere Partner erarbeiten eine individuelle Wachstumsstrategie.',
    'quote.step1': 'Auswahl der Leistung',
    'quote.step2': 'Investitionsrahmen',
    'quote.step3': 'Kontaktdaten der Leitung',
  },

  ES: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.work': 'Portafolio',
    'nav.process': 'Metodología',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.getQuote': 'Cotización Gratuita',
    'nav.practicesTitle': 'Prácticas Principales',
    'nav.allPractices': 'Ver las 6 especialidades y tarifas →',
    'nav.atelier3d': 'Atelier 3D',
    'nav.languageLabel': 'Seleccionar Idioma',
    'nav.themeLabel': 'Tema Visual',
    'nav.menu': 'Menú',

    // Hero Section
    'hero.badge': 'AGENCIA CREATIVA DE MARKETING DIGITAL',
    'hero.titlePart1': 'Convertimos la Ambición Digital en',
    'hero.titlePart2': 'Crecimiento Real.',
    'hero.description': 'En BZ Digital diseñamos plataformas web cinematográficas, campañas publicitarias de alto rendimiento e infraestructuras SEO líderes para marcas destinadas a dominar su sector. Sin métricas superficiales: solo ingresos empresariales compuestos.',
    'hero.ctaGrowth': 'Hablemos de Crecimiento',
    'hero.ctaWork': 'Explorar Nuestro Trabajo',
    'hero.statRevenue': 'Ingresos de Clientes Atribuidos',
    'hero.statRetention': 'Tasa de Retención de Clientes',
    'hero.statPartners': '50+ Marcas Socias Globales',

    // Trusted By Marquee
    'marquee.badge': 'ELEGIDO POR LÍDERES DE LUJO Y EMPRESA',
    'marquee.title': 'La Confianza de Marcas de Lujo y Crecimiento.',
    'marquee.subtitle': 'Socios globales selectos en Alta Relojería, Aviación Privada, Fondos Soberanos y Tecnología de Vanguardia.',

    // About Section
    'about.badge': 'FILOSOFÍA DE AGENCIA',
    'about.titlePart1': 'La Estrategia se Une a la',
    'about.titlePart2': 'Creatividad.',
    'about.p1': 'La mayoría de agencias obligan a elegir entre un diseño estético impactante o un marketing de rendimiento frío. BZ Digital nació de la convicción de que las marcas líderes requieren ambos con idéntica maestría.',
    'about.p2': 'Operamos como una extensión directa de su equipo directivo, concibiendo viajes digitales integrales que cautivan y convierten el interés en valor corporativo a largo plazo.',
    'about.cta': 'Conozca Nuestra Historia y Liderazgo',
    'about.pillarStrategy': 'Estrategia',
    'about.pillarStrategyDesc': 'Posicionamiento analítico de mercado y modelos comerciales sin espacio para la especulación.',
    'about.pillarCreativity': 'Creatividad',
    'about.pillarCreativityDesc': 'Estética cinematográfica, tipografía a medida y narrativa con poder de convicción.',
    'about.pillarTech': 'Tecnología',
    'about.pillarTechDesc': 'Arquitecturas headless ultra-rápidas, atribución en tiempo real y pujas algorítmicas.',
    'about.pillarPerf': 'Rendimiento',
    'about.pillarPerfDesc': 'Optimización implacable de la tasa de conversión para escalar el beneficio neto.',

    // Services Section
    'services.badge': 'DISCIPLINAS DE PRECISIÓN',
    'services.titlePart1': 'Servicios Integrales Diseñados para la',
    'services.titlePart2': 'Dominación.',
    'services.subtitle': 'Seis disciplinas digitales interconectadas en armonía para captar cuota de mercado, generar prestigio y multiplicar el ROI.',
    'services.discover': 'Descubrir Especialidad',
    'services.viewAll': 'Ver las 6 Prácticas',

    // 3D Atelier
    'atelier.badge': 'NUEVO: ATELIER 3D EN TIEMPO REAL THREE.JS',
    'atelier.titlePart1': 'Artesanía Digital 3D',
    'atelier.titlePart2': 'Procedural e Inmersiva',
    'atelier.desc': 'Ingrese a nuestro estudio 3D interactivo Three.js. Examine cronógrafos de alta relojería, monolitos cinéticos y siluetas aerodinámicas con iluminación PBR calidad cine y desglose cinemático.',
    'atelier.cta': 'Abrir Estudio 3D Interactivo',

    // Process
    'process.badge': 'METODOLOGÍA',
    'process.title': 'Nuestro Motor de Crecimiento en 4 Pasos.',
    'process.subtitle': 'Una metodología sistemática depurada para minimizar el riesgo y garantizar una expansión compuesta.',
    'process.step1': '01. Descubrimiento y Auditoría Forense',
    'process.step2': '02. Arquitectura de Crecimiento a Medida',
    'process.step3': '03. Ejecución Ágil y Milimétrica',
    'process.step4': '04. Optimización y Liderazgo de Categoría',

    // Testimonials
    'testimonials.badge': 'TESTIMONIOS DE CLIENTES',
    'testimonials.title': 'Recomendaciones de Distinción.',
    'testimonials.subtitle': 'Testimonios directos de fundadores y directores que confían en BZ Digital para salvaguardar su prestigio digital.',

    // Contact
    'contact.badge': 'INICIAR CONVERSACIÓN',
    'contact.titlePart1': 'Convirtamos la Ambición en',
    'contact.titlePart2': 'Realidad.',
    'contact.subtitle': 'Reserve una consulta confidencial con nuestros estrategas principales. Evaluaremos su ecosistema digital y presentaremos una hoja de ruta en 48 horas.',
    'contact.formName': 'Nombre Completo',
    'contact.formEmail': 'Correo Corporativo',
    'contact.formCompany': 'Empresa / Marca',
    'contact.formBudget': 'Presupuesto de Inversión',
    'contact.formService': 'Práctica Principal Requerida',
    'contact.formMessage': 'Alcance y Objetivos del Proyecto',
    'contact.submit': 'Solicitar Sesión Privada',

    // Footer
    'footer.memorandum': 'EL MEMORANDO BZ DIGITAL',
    'footer.newsletterTitle': 'Inteligencia para Líderes de Mercado.',
    'footer.newsletterSubtitle': 'Un informe mensual sobre prestigio digital y adquisición algorítmica de alto valor.',
    'footer.subscribe': 'Suscribirse',
    'footer.backToTop': 'Volver Arriba',
    'footer.corePractices': 'Especialidades Clave',
    'footer.agency': 'Agencia',
    'footer.legal': 'Aviso Legal y Privacidad',
    'footer.rights': 'Todos los derechos reservados. Creado para líderes globales.',

    // Quote Modal
    'quote.title': 'Solicitar Propuesta Personalizada',
    'quote.subtitle': 'Comparta la visión de su marca, tiempos y metas comerciales. Formaremos un plan de acción a su medida.',
    'quote.step1': 'Selección de Servicio',
    'quote.step2': 'Presupuesto Estimado',
    'quote.step3': 'Contacto Directivo',
  },

  IT: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.services': 'Servizi',
    'nav.work': 'Portfolio',
    'nav.process': 'Metodo',
    'nav.blog': 'Editoriale',
    'nav.contact': 'Contatti',
    'nav.getQuote': 'Preventivo Gratuito',
    'nav.practicesTitle': 'Discipline Principali',
    'nav.allPractices': 'Tutte le 6 discipline & listino →',
    'nav.atelier3d': 'Atelier 3D',
    'nav.languageLabel': 'Seleziona Lingua',
    'nav.themeLabel': 'Tema Visivo',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.badge': 'AGENZIA CREATIVA DI MARKETING DIGITALE',
    'hero.titlePart1': 'Trasformiamo l’Ambizione Digitale in',
    'hero.titlePart2': 'Crescita Concreta.',
    'hero.description': 'In BZ Digital creiamo piattaforme web di livello cinematografico, campagne di performance marketing su larga scala e infrastrutture SEO d’autorità per marchi leader. Nessuna metrica effimera — solo redditività aziendale moltiplicata nel tempo.',
    'hero.ctaGrowth': 'Parliamo di Crescita',
    'hero.ctaWork': 'Scopri i Nostri Progetti',
    'hero.statRevenue': 'Fatturato Clienti Attribuito',
    'hero.statRetention': 'Tasso di Fedeltà Clienti',
    'hero.statPartners': '50+ Partner Globali',

    // Trusted By Marquee
    'marquee.badge': 'SCELTO DA LEADER DEL LUSSO E DELL’IMPRESA',
    'marquee.title': 'La Fiducia dei Grandi Marchi di Lusso.',
    'marquee.subtitle': 'Partner d’eccezione tra Alta Orologeria, Aviazione Privata, Private Equity e Tecnologia d’Avanguardia.',

    // About Section
    'about.badge': 'FILOSOFIA DELL’AGENZIA',
    'about.titlePart1': 'La Strategia Incontra la',
    'about.titlePart2': 'Creatività.',
    'about.p1': 'La maggior parte delle agenzie impone di scegliere tra un’estetica affascinante e un marketing quantitativo. BZ Digital nasce per offrire entrambe le componenti ai massimi livelli.',
    'about.p2': 'Operiamo come partner fidato della vostra direzione, sviluppando percorsi digitali ad alto impatto che convertono l’interesse dei clienti in autentico valore aziendale.',
    'about.cta': 'Scopri la Nostra Storia & Leadership',
    'about.pillarStrategy': 'Strategia',
    'about.pillarStrategyDesc': 'Posizionamento di mercato analitico e modelli commerciali mirati a eliminare l’incertezza.',
    'about.pillarCreativity': 'Creatività',
    'about.pillarCreativityDesc': 'Estetica cinematografica, tipografia su misura e narrazioni d’autore di assoluto prestigio.',
    'about.pillarTech': 'Tecnologia',
    'about.pillarTechDesc': 'Architetture headless fulminee, tracciamento in tempo reale e algoritmi d’asta predittivi.',
    'about.pillarPerf': 'Performance',
    'about.pillarPerfDesc': 'Ottimizzazione meticolosa della conversione e incremento continuo dei margini operativi.',

    // Services Section
    'services.badge': 'DISCIPLINE DI RIGORE',
    'services.titlePart1': 'Servizi Completi Progettati per la',
    'services.titlePart2': 'Dominanza.',
    'services.subtitle': 'Sei discipline digitali complementari che operano in perfetta sintonia per acquisire quote di mercato ed elevare il prestigio.',
    'services.discover': 'Scopri il Servizio',
    'services.viewAll': 'Scopri Tutte le 6 Discipline',

    // 3D Atelier
    'atelier.badge': 'NOVITÀ: ATELIER 3D TEMPO REALE THREE.JS',
    'atelier.titlePart1': 'Artigianato Digitale 3D',
    'atelier.titlePart2': 'Procedurale & Immersivo',
    'atelier.desc': 'Entra nel nostro Studio 3D interattivo Three.js. Esplora cronografi d’alta orologeria, monoliti cinetici e profili aerodinamici con illuminazione PBR cinematografica e vista esplosa.',
    'atelier.cta': 'Avvia lo Studio 3D Interattivo',

    // Process
    'process.badge': 'METODOLOGIA',
    'process.title': 'Il Nostro Motore di Crescita in 4 Fasi.',
    'process.subtitle': 'Un metodo rigoroso perfezionato su centinaia di brand per abbattere i rischi e moltiplicare i risultati.',
    'process.step1': '01. Analisi & Audit Approfondito',
    'process.step2': '02. Architettura di Crescita su Misura',
    'process.step3': '03. Esecuzione Agile & Millimetrica',
    'process.step4': '04. Ottimizzazione & Leadership di Mercato',

    // Testimonials
    'testimonials.badge': 'TESTIMONIANZE CLIENTI',
    'testimonials.title': 'Riconoscimenti di Prestigio.',
    'testimonials.subtitle': 'Le parole di fondatori e dirigenti d’impresa che affidano la loro presenza digitale a BZ Digital.',

    // Contact
    'contact.badge': 'APRIAMO UN DIALOGO',
    'contact.titlePart1': 'Diamo Forma Concreta alle',
    'contact.titlePart2': 'Tue Ambizioni.',
    'contact.subtitle': 'Prenota una sessione riservata con i nostri senior partner. Valuteremo la tua strategia attuale e presenteremo un piano su misura entro 48 ore.',
    'contact.formName': 'Nome e Cognome',
    'contact.formEmail': 'Email Direzionale',
    'contact.formCompany': 'Azienda / Marchio',
    'contact.formBudget': 'Budget di Investimento',
    'contact.formService': 'Disciplina Richiesta',
    'contact.formMessage': 'Obiettivi e Visione di Progetto',
    'contact.submit': 'Richiedi Incontro Riservato',

    // Footer
    'footer.memorandum': 'IL MEMORANDUM BZ DIGITAL',
    'footer.newsletterTitle': 'Strategie per Leader di Settore.',
    'footer.newsletterSubtitle': 'Un briefing mensile riservato su reputazione digitale e acquisizione clienti ad alto rendimento.',
    'footer.subscribe': 'Iscriviti',
    'footer.backToTop': 'Torna in Cima',
    'footer.corePractices': 'Discipline Chiave',
    'footer.agency': 'L’Agenzia',
    'footer.legal': 'Note Legali e Privacy',
    'footer.rights': 'Tutti i diritti riservati. Realizzato per i leader internazionali.',

    // Quote Modal
    'quote.title': 'Richiedi una Proposta Esclusiva',
    'quote.subtitle': 'Condividi obiettivi, tempi e orizzonte di crescita. I nostri partner formuleranno una strategia calibrata.',
    'quote.step1': 'Scelta del Servizio',
    'quote.step2': 'Ambito di Investimento',
    'quote.step3': 'Contatto Esecutivo',
  },

  AR: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.work': 'أعمالنا',
    'nav.process': 'منهجيتنا',
    'nav.blog': 'المقالات',
    'nav.contact': 'تواصل معنا',
    'nav.getQuote': 'طلب استشارة مجانية',
    'nav.practicesTitle': 'التخصصات الأساسية للوكالة',
    'nav.allPractices': 'عرض التخصصات الستة والأسعار ←',
    'nav.atelier3d': 'استوديو 3D',
    'nav.languageLabel': 'اختر اللغة',
    'nav.themeLabel': 'المظهر الجمالي',
    'nav.menu': 'القائمة',

    // Hero Section
    'hero.badge': 'وكالة تسويق رقمي إبداعية فاخرة',
    'hero.titlePart1': 'نُحوّل الطموح الرقمي إلى',
    'hero.titlePart2': 'نمو تجاري حقيقي ومستدام.',
    'hero.description': 'في بي زد ديجيتال (BZ Digital)، نصمم منصات ويب بمستوى سينمائي، وحملات أداء إعلاني عالية العائد، وبنية تحتية متفوقة لمحركات البحث للعلامات التجارية الراغبة في تصدّر فئتها. لا نعتمد المقاييس الشكلية — بل نركز على الإيرادات المؤسسية المتراكمة.',
    'hero.ctaGrowth': 'لنناقش استراتيجية النمو',
    'hero.ctaWork': 'استكشف سابقة أعمالنا',
    'hero.statRevenue': 'إيرادات العملاء المحققة',
    'hero.statRetention': 'نسبة ولاء واستمرار العملاء',
    'hero.statPartners': 'أكثر من 50 شريك عالمي مرموق',

    // Trusted By Marquee
    'marquee.badge': 'موثوق من قادة الفخامة والمؤسسات الكبرى',
    'marquee.title': 'محل ثقة كبرى العلامات التجارية الفاخرة.',
    'marquee.subtitle': 'شركاء عالميون مميزون في صناعة الساعات الفاخرة، الطيران الخاص، الصناديق السيادية والتقنيات المتقدمة.',

    // About Section
    'about.badge': 'فلسفة الوكالة',
    'about.titlePart1': 'حيث تلتقي الاستراتيجية مع',
    'about.titlePart2': 'الإبداع الاستثنائي.',
    'about.p1': 'تُلزمك معظم الوكالات بالاختيار بين التصميم الفني الباهر أو التسويق الرقمي الرياضي الجاف. تأسست بي زد ديجيتال بناءً على قناعة راسخة بأن العلامات الرائدة تحتاج إلى الاثنين معاً بنفس الدقة.',
    'about.p2': 'نعمل كامتداد استراتيجي لإدارتكم التنفيذية، حيث نصمم تجارب رقمية متكاملة تأسر القلوب وتُحوّل الاهتمام عالي القيمة إلى عائدات مؤسسية متنامية.',
    'about.cta': 'اكتشف مسيرتنا وفريق قيادتنا',
    'about.pillarStrategy': 'الاستراتيجية',
    'about.pillarStrategyDesc': 'تحديد مواضع السوق بدقة متناهية ونمذجة تجارية رياضية تقضي على التخمين.',
    'about.pillarCreativity': 'الإبداع الفني',
    'about.pillarCreativityDesc': 'جماليات بصرية سينمائية، وخطوط مخصصة، وسرد قصصي يفرض الهيبة والتقدير.',
    'about.pillarTech': 'التكنولوجيا المتقدمة',
    'about.pillarTechDesc': 'بنى ويب فائقة السرعة، ونظم إسناد خادمية آلية، وخطوط مزايدة خوارزمية ذكية.',
    'about.pillarPerf': 'الأداء والنمو',
    'about.pillarPerfDesc': 'تحسين متواصل لمعدلات التحويل وهندسة نمو تضاعف صافي الأرباح التشغيلية.',

    // Services Section
    'services.badge': 'تخصصات متقدمة',
    'services.titlePart1': 'خدمات شاملة مصممة من أجل',
    'services.titlePart2': 'الهيمنة السوقية.',
    'services.subtitle': 'ستة تخصصات رقمية مترابطة تعمل في تناغم تام للاستحواذ على حصص السوق وبناء المكانة المرموقة ومضاعفة العوائد.',
    'services.discover': 'اكتشف الخدمة',
    'services.viewAll': 'استعرض كافة التخصصات الستة',

    // 3D Atelier
    'atelier.badge': 'جديد: استوديو 3D ثلاثي الأبعاد تفاعلي',
    'atelier.titlePart1': 'حرفية رقمية ثلاثية الأبعاد',
    'atelier.titlePart2': 'تفاعلية وإجرائية غامرة',
    'atelier.desc': 'ادخل إلى استوديو Three.js ثلاثي الأبعاد التفاعلي. افحص ساعات اليد الراقية والمجسمات الحركية بإضاءة استوديو سينمائية وتحكم كامل في تفكيك الطبقات وخامات المواد.',
    'atelier.cta': 'بدء تجربة استوديو 3D',

    // Process
    'process.badge': 'المنهجية',
    'process.title': 'محرك النمو ذو الخطوات الأربع.',
    'process.subtitle': 'منهجية منهجية صارمة جرى تطويرها خلال مئات المشاريع المؤسسية لإزالة المخاطر وضمان التوسع المتراكم.',
    'process.step1': '01. الاستكشاف والتدقيق الاستقصائي',
    'process.step2': '02. هندسة النمو المخصصة',
    'process.step3': '03. التنفيذ الدقيق والمرن',
    'process.step4': '04. التحسين والهيمنة السوقية',

    // Testimonials
    'testimonials.badge': 'شهادات العملاء',
    'testimonials.title': 'تزكيات الرفعة والتميز.',
    'testimonials.subtitle': 'آراء صريحة ومباشرة من المؤسسين والمديرين التنفيذيين الذين وضعوا أصولهم الرقمية في رعاية بي زد ديجيتال.',

    // Contact
    'contact.badge': 'ابدأ المحادثة',
    'contact.titlePart1': 'لنحوّل الطموح إلى',
    'contact.titlePart2': 'واقع ملموس.',
    'contact.subtitle': 'احجز استشارة خاصة مع كبار خبرائنا الاستراتيجيين. سنقوم بتقييم منظومتكم الرقمية وتقديم خارطة طريق مخصصة خلال 48 ساعة.',
    'contact.formName': 'الاسم الكامل',
    'contact.formEmail': 'البريد الإلكتروني المهني',
    'contact.formCompany': 'اسم الشركة أو العلامة',
    'contact.formBudget': 'ميزانية الاستثمار المستهدفة',
    'contact.formService': 'الخدمة الأساسية المطلوبة',
    'contact.formMessage': 'نطاق المشروع وأهدافه',
    'contact.submit': 'طلب جلسة إحاطة سرية',

    // Footer
    'footer.memorandum': 'مذكرة بي زد ديجيتال',
    'footer.newsletterTitle': 'رؤى استراتيجية لقادة القطاعات.',
    'footer.newsletterSubtitle': 'نشرة شهرية حصرية للمديرين التنفيذيين حول الريادة الرقمية والاستحواذ الخوارزمي الفعّال.',
    'footer.subscribe': 'اشتراك',
    'footer.backToTop': 'العودة للأعلى',
    'footer.corePractices': 'التخصصات الأساسية',
    'footer.agency': 'عن الوكالة',
    'footer.legal': 'الشروط والخصوصية',
    'footer.rights': 'جميع الحقوق محفوظة. صُمم وصُنع لقادة الأعمال حول العالم.',

    // Quote Modal
    'quote.title': 'طلب عرض مالي واستراتيجي مخصص',
    'quote.subtitle': 'أخبرنا عن رؤية علامتك وجدولك الزمني وأهدافك. سيقوم شركاؤنا بإعداد خطة عمل دقيقة مخصصة لاحتياجاتك.',
    'quote.step1': 'اختيار التخصص',
    'quote.step2': 'نطاق الاستثمار',
    'quote.step3': 'بيانات التواصل',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bz_digital_lang') as Language;
      const validCodes: Language[] = ['EN', 'FR', 'DE', 'ES', 'IT', 'AR'];
      if (saved && validCodes.includes(saved)) {
        return saved;
      }
    }
    return 'EN';
  });

  const languageInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRTL = languageInfo.dir === 'rtl';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bz_digital_lang', lang);
      const info = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
      document.documentElement.lang = lang.toLowerCase();
      document.documentElement.dir = info.dir;
      if (info.dir === 'rtl') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  };

  const toggleLanguage = () => {
    const currentIndex = SUPPORTED_LANGUAGES.findIndex((l) => l.code === language);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    setLanguage(SUPPORTED_LANGUAGES[nextIndex].code);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language.toLowerCase();
      document.documentElement.dir = languageInfo.dir;
      if (languageInfo.dir === 'rtl') {
        document.documentElement.classList.add('rtl');
      } else {
        document.documentElement.classList.remove('rtl');
      }
    }
  }, [language, languageInfo.dir]);

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || translations.EN?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, languageInfo, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
