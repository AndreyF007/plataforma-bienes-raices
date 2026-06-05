/**
 * ═══════════════════════════════════════════════════════════════
 * SITE CONFIG — WHITE-LABEL MASTER CONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 * 
 * This is the single source of truth for all client-specific data.
 * To create a new branded instance, duplicate this file and modify
 * the values below. No code changes required.
 * 
 * Structure:
 *  - brand: Visual identity & brand info
 *  - agent: Personal information of the real estate agent
 *  - contact: All contact channels
 *  - social: Social media links
 *  - hero: Hero section content
 *  - trustBar: Credibility metrics
 *  - about: Agent biography & story
 *  - services: Service offerings
 *  - properties: Featured property listings
 *  - zones: Geographic areas of expertise
 *  - testimonials: Client testimonials
 *  - process: Work process steps
 *  - ctaFinal: Final call-to-action section
 *  - seo: SEO metadata
 *  - footer: Footer content
 *  - analytics: Tracking & analytics IDs
 */

const siteConfig = {

  // ─── BRAND IDENTITY ──────────────────────────────────────────
  brand: {
    name: 'Andrés Realty',
    tagline: 'Asesoría Inmobiliaria Premium',
    logo: null, // Path to logo image, null = text-based logo
    favicon: '/favicon.svg',
    ogImage: '/og-image.jpg',
    language: 'es',
    country: 'Costa Rica',
    currency: 'USD',
    colors: {
      primary:    '#0A0A0A',   // Black — main backgrounds
      secondary:  '#FAFAFA',   // White — text on dark
      cream:      '#F5F0EB',   // Warm off-white backgrounds
      gray100:    '#E8E4E0',   // Subtle borders
      gray300:    '#B8B2AC',   // Secondary text (light mode)
      gray600:    '#6B6560',   // Secondary text (dark mode)
      gray800:    '#2A2725',   // Body text
      accent:     '#C4956A',   // Bronze/gold — luxury accent
      accentDark: '#A67B52',   // Accent hover state
      accentRgb:  '196,149,106', // RGB values for rgba() usage
      overlay:    'rgba(10,10,10,0.65)', // Image overlays
    },
    fonts: {
      heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      headingUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
      bodyUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    },
  },

  // ─── AGENT INFORMATION ────────────────────────────────────────
  agent: {
    name: 'Andrés Montero',
    title: 'Corredor Inmobiliario Premium',
    photo: null, // Path to agent headshot, null = use initials
    initials: 'AM',
    license: 'Licencia #CR-00000', // Professional license
    yearsExperience: 15,
  },

  // ─── CONTACT INFORMATION ──────────────────────────────────────
  contact: {
    whatsapp: '+50600000000',
    whatsappMessage: 'Hola, me interesa recibir asesoría inmobiliaria personalizada.',
    phone: '+506 0000-0000',
    email: 'info@andresrealty.com',
    address: 'Escazú, San José, Costa Rica',
    mapUrl: 'https://maps.google.com/?q=Escazu,+San+Jose,+Costa+Rica',
    scheduleUrl: null, // Calendly or similar URL
  },

  // ─── SOCIAL MEDIA ─────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/andresrealty',
    facebook: 'https://facebook.com/andresrealty',
    linkedin: 'https://linkedin.com/in/andresrealty',
    youtube: null,
    tiktok: null,
    twitter: null,
  },

  // ─── HERO SECTION ─────────────────────────────────────────────
  hero: {
    backgroundImage: '/images/hero-bg.jpg',
    backgroundVideo: null, // Optional: path to mp4
    badge: '+15 años transformando decisiones en patrimonio',
    title: 'Tu próxima satisfacción inmobiliaria comienza aquí',
    subtitle: 'Asesoría inmobiliaria premium en Costa Rica. Compra, vende o invierte con la confianza de un experto que conoce cada oportunidad del mercado.',
    ctaPrimary: {
      text: 'Agenda tu consulta',
      action: 'whatsapp', // 'whatsapp' | 'scroll' | 'url'
      target: null, // null = uses whatsapp contact, or section ID, or URL
    },
    ctaSecondary: {
      text: 'Explorar propiedades',
      action: 'scroll',
      target: '#propiedades',
    },
  },

  // ─── TRUST BAR ────────────────────────────────────────────────
  trustBar: [
    { value: '+15', label: 'Años de experiencia', icon: 'calendar' },
    { value: '+200', label: 'Propiedades gestionadas', icon: 'home' },
    { value: '+$50M', label: 'En transacciones cerradas', icon: 'trending' },
    { value: '4', label: 'Zonas premium', icon: 'map' },
    { value: '98%', label: 'Satisfacción de clientes', icon: 'star' },
  ],

  // ─── ABOUT SECTION ────────────────────────────────────────────
  about: {
    sectionTitle: 'Sobre Mí',
    sectionSubtitle: 'La historia detrás de cada negociación exitosa',
    photo: null, // Path to about section photo
    paragraphs: [
      'No llegué al mundo inmobiliario por accidente. Crecí recorriendo las calles de San José, observando cómo cada barrio contaba su propia historia a través de su arquitectura, su gente y sus oportunidades.',
      'Después de más de 15 años en el mercado inmobiliario de Costa Rica, puedo decirte algo que pocos asesores admiten: el mejor negocio no es el que se cierra más rápido, sino el que transforma la vida de quien lo hace.',
      'Mi enfoque es diferente porque mi prioridad es diferente. Antes de mostrarte una propiedad, necesito entender tu visión. ¿Buscas un hogar que refleje quién eres? ¿Una inversión que trabaje por ti mientras duermes? ¿Un espacio que conecte con la naturaleza sin sacrificar comodidad?',
      'Trabajo con un número limitado de clientes simultáneos. Esto no es una estrategia de marketing — es la única forma de ofrecer el nivel de atención que mi estándar exige.',
    ],
    highlights: [
      { value: 'Especialista', label: 'en propiedades premium y de inversión' },
      { value: 'Bilingüe', label: 'atención en español e inglés' },
      { value: 'Red exclusiva', label: 'de desarrolladores y propietarios' },
      { value: 'Acompañamiento', label: 'legal y financiero integral' },
    ],
    ctaText: 'Conversemos sobre tu proyecto',
  },

  // ─── SERVICES ─────────────────────────────────────────────────
  services: {
    sectionTitle: 'Servicios',
    sectionSubtitle: 'Soluciones inmobiliarias diseñadas para resultados excepcionales',
    items: [
      {
        icon: 'search',
        title: 'Compra Estratégica',
        description: 'Identifico propiedades que el mercado aún no ha descubierto. Acceso a inventario exclusivo, análisis comparativo riguroso y negociación que protege tu inversión.',
        benefit: 'Encuentras la propiedad ideal antes que la competencia.',
        cta: 'Buscar propiedades',
      },
      {
        icon: 'tag',
        title: 'Venta con Posicionamiento Premium',
        description: 'Tu propiedad merece una presentación a la altura de su valor. Fotografía profesional, pricing estratégico y exposición en los canales que generan compradores reales.',
        benefit: 'Vendes más rápido y al mejor precio del mercado.',
        cta: 'Vender mi propiedad',
      },
      {
        icon: 'chart',
        title: 'Inversión Inteligente',
        description: 'Costa Rica ofrece oportunidades que pocos mercados pueden igualar. Te ayudo a identificar zonas de alta plusvalía, analizar retornos y estructurar inversiones sólidas.',
        benefit: 'Tu dinero trabaja con datos, no con suposiciones.',
        cta: 'Explorar inversiones',
      },
      {
        icon: 'calculator',
        title: 'Valoración Profesional',
        description: 'Conocer el valor real de una propiedad es el primer paso de cualquier decisión inteligente. Valuación basada en datos de mercado, no en estimaciones arbitrarias.',
        benefit: 'Decides con información precisa y actualizada.',
        cta: 'Solicitar valoración',
      },
      {
        icon: 'camera',
        title: 'Marketing Inmobiliario',
        description: 'Cada propiedad tiene una historia que vende. Creo campañas con fotografía editorial, video tours y estrategia digital que atraen al comprador correcto.',
        benefit: 'Tu inmueble se presenta como lo que es: excepcional.',
        cta: 'Ver estrategias',
      },
      {
        icon: 'shield',
        title: 'Asesoría Integral',
        description: 'Desde el primer contacto hasta la firma final. Coordinación legal, financiera y logística para que tu transacción sea segura, clara y sin sorpresas.',
        benefit: 'Cada paso del proceso está cubierto y protegido.',
        cta: 'Conocer el proceso',
      },
    ],
  },

  // ─── FEATURED PROPERTIES ──────────────────────────────────────
  properties: {
    sectionTitle: 'Propiedades Destacadas',
    sectionSubtitle: 'Selección curada de las mejores oportunidades del mercado',
    ctaViewAll: 'Ver todas las propiedades',
    items: [
      {
        id: 'prop-001',
        title: 'Villa Pacífico',
        location: 'Playa Flamingo, Guanacaste',
        price: '$1,250,000',
        status: 'Disponible',
        type: 'Villa',
        image: '/images/property-1.jpg',
        features: {
          bedrooms: 4,
          bathrooms: 4,
          area: '450 m²',
          land: '1,200 m²',
        },
        tags: ['Vista al mar', 'Piscina infinita', 'Smart Home'],
        featured: true,
      },
      {
        id: 'prop-002',
        title: 'Penthouse Escazú Tower',
        location: 'Escazú, San José',
        price: '$890,000',
        status: 'Disponible',
        type: 'Penthouse',
        image: '/images/property-2.jpg',
        features: {
          bedrooms: 3,
          bathrooms: 3,
          area: '320 m²',
          land: null,
        },
        tags: ['Vista panorámica', 'Acabados premium', 'Seguridad 24/7'],
        featured: true,
      },
      {
        id: 'prop-003',
        title: 'Refugio entre Selva',
        location: 'Manuel Antonio, Puntarenas',
        price: '$675,000',
        status: 'Disponible',
        type: 'Casa',
        image: '/images/property-3.jpg',
        features: {
          bedrooms: 3,
          bathrooms: 2,
          area: '280 m²',
          land: '2,500 m²',
        },
        tags: ['Rodeada de naturaleza', 'Diseño bioclimático', 'Privacidad total'],
        featured: true,
      },
      {
        id: 'prop-004',
        title: 'Condo Playa Nosara',
        location: 'Nosara, Guanacaste',
        price: '$425,000',
        status: 'Disponible',
        type: 'Condominio',
        image: '/images/property-4.jpg',
        features: {
          bedrooms: 2,
          bathrooms: 2,
          area: '145 m²',
          land: null,
        },
        tags: ['A 200m de la playa', 'Rental income', 'Comunidad exclusiva'],
        featured: true,
      },
    ],
  },

  // ─── ZONES OF EXPERTISE ───────────────────────────────────────
  zones: {
    sectionTitle: 'Zonas de Especialidad',
    sectionSubtitle: 'Dominio profundo de los mercados más dinámicos de Costa Rica',
    items: [
      {
        name: 'Guanacaste',
        slug: 'guanacaste',
        image: '/images/zone-guanacaste.jpg',
        description: 'La costa dorada de Costa Rica. Playas de arena blanca, desarrollos de lujo frente al mar y el clima más soleado del país. Destino predilecto para inversión internacional y estilo de vida premium.',
        idealFor: 'Inversores internacionales, retiro de lujo, rental vacacional',
        highlights: ['Playa Flamingo', 'Tamarindo', 'Papagayo', 'Conchal'],
        marketInsight: 'Plusvalía promedio del 8-12% anual en zonas costeras premium.',
      },
      {
        name: 'Escazú & Santa Ana',
        slug: 'escazu-santa-ana',
        image: '/images/zone-escazu.jpg',
        description: 'El epicentro del lujo urbano en Costa Rica. Torres residenciales de primer nivel, centros comerciales exclusivos y la mejor infraestructura del país. Donde la sofisticación urbana se encuentra con vistas de montaña.',
        idealFor: 'Ejecutivos, familias de alto nivel, diplomáticos',
        highlights: ['Multiplaza', 'CIMA Hospital', 'Country Club', 'San Rafael'],
        marketInsight: 'La zona con mayor concentración de propiedades premium del país.',
      },
      {
        name: 'Manuel Antonio',
        slug: 'manuel-antonio',
        image: '/images/zone-manuel.jpg',
        description: 'Donde la selva tropical abraza el océano Pacífico. Biodiversidad extraordinaria, playas de postal y un mercado turístico que genera retornos consistentes durante todo el año.',
        idealFor: 'Eco-inversores, amantes de la naturaleza, rental turístico',
        highlights: ['Parque Nacional', 'Quepos Marina', 'Dominical', 'Uvita'],
        marketInsight: 'Ocupación turística sobre 75% anual en propiedades bien gestionadas.',
      },
      {
        name: 'Nosara & Tamarindo',
        slug: 'nosara-tamarindo',
        image: '/images/zone-nosara.jpg',
        description: 'El alma bohemia-premium de Costa Rica. Surf de clase mundial, comunidad internacional vibrante y un mercado inmobiliario que combina lifestyle con rendimiento. La nueva frontera del lujo consciente.',
        idealFor: 'Nómadas digitales, wellness lifestyle, inversión de largo plazo',
        highlights: ['Playa Guiones', 'Playa Grande', 'Playa Avellanas', 'Marbella'],
        marketInsight: 'Crecimiento sostenido del 15% anual en demanda de propiedades.',
      },
    ],
  },

  // ─── TESTIMONIALS ─────────────────────────────────────────────
  testimonials: {
    sectionTitle: 'Lo Que Dicen Mis Clientes',
    sectionSubtitle: 'Resultados que hablan por sí mismos',
    items: [
      {
        name: 'Roberto Méndez',
        initials: 'RM',
        role: 'Inversionista',
        location: 'San José, Costa Rica',
        text: 'Llevaba dos años buscando una propiedad de inversión en Guanacaste sin encontrar algo que cumpliera mis criterios. En menos de 6 semanas, Andrés me presentó tres opciones que no estaban en ningún portal. Cerré una que ya genera el 9% anual que buscaba.',
        result: 'Inversión con 9% de retorno anual',
        photo: null,
      },
      {
        name: 'Sarah Mitchell',
        initials: 'SM',
        role: 'Compradora Internacional',
        location: 'Austin, Texas',
        text: 'Buying property in another country felt overwhelming until I found Andrés. His bilingual service, legal coordination, and deep market knowledge made the entire process smooth. We now own our dream home in Nosara.',
        result: 'Casa de playa adquirida en 8 semanas',
        photo: null,
      },
      {
        name: 'Carolina Vargas',
        initials: 'CV',
        role: 'Vendedora',
        location: 'Escazú, Costa Rica',
        text: 'Vendí mi apartamento en Escazú un 12% por encima del precio que dos agencias anteriores me habían estimado. La diferencia fue el posicionamiento y la estrategia de marketing. Cada detalle fue impecable.',
        result: 'Venta 12% sobre precio estimado',
        photo: null,
      },
      {
        name: 'Diego & Pamela Solano',
        initials: 'DS',
        role: 'Compradores de primera vivienda',
        location: 'Santa Ana, Costa Rica',
        text: 'Como compradores primerizos estábamos nerviosos. Andrés nos guió paso a paso, nos explicó cada documento y nos ayudó a negociar condiciones que no sabíamos que eran posibles. La experiencia superó nuestras expectativas.',
        result: 'Primera vivienda con condiciones excepcionales',
        photo: null,
      },
    ],
  },

  // ─── WORK PROCESS ─────────────────────────────────────────────
  process: {
    sectionTitle: 'Cómo Trabajo',
    sectionSubtitle: 'Un proceso diseñado para resultados, no para improvisación',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        description: 'Escucho tus objetivos, analizo tu situación y defino con precisión qué necesitas del mercado. Sin esta claridad, cualquier búsqueda es tiempo perdido.',
        icon: 'clipboard',
      },
      {
        number: '02',
        title: 'Estrategia',
        description: 'Diseño un plan personalizado: criterios de búsqueda, pricing strategy, timing de mercado y canales. Cada decisión tiene datos detrás.',
        icon: 'target',
      },
      {
        number: '03',
        title: 'Selección & Promoción',
        description: 'Si compras: te presento opciones curadas que cumplen tus criterios. Si vendes: posiciono tu propiedad con estrategia de marketing premium.',
        icon: 'grid',
      },
      {
        number: '04',
        title: 'Negociación',
        description: 'Protejo tus intereses en la mesa de negociación. Conozco el mercado, entiendo las dinámicas y busco el mejor acuerdo posible para ti.',
        icon: 'handshake',
      },
      {
        number: '05',
        title: 'Cierre',
        description: 'Coordino cada detalle legal, financiero y logístico. Revisión de documentos, due diligence y acompañamiento hasta la firma final.',
        icon: 'check-circle',
      },
      {
        number: '06',
        title: 'Acompañamiento',
        description: 'Mi servicio no termina con la firma. Seguimiento post-cierre, gestión de propiedad si lo necesitas y asesoría continua para tu portafolio.',
        icon: 'heart',
      },
    ],
  },

  // ─── FINAL CTA ────────────────────────────────────────────────
  ctaFinal: {
    title: 'Hablemos de tu próximo movimiento inmobiliario',
    subtitle: 'Ya sea que busques comprar, vender o invertir — el primer paso siempre es una conversación honesta sobre tus objetivos.',
    ctaPrimary: {
      text: 'Escribir por WhatsApp',
      action: 'whatsapp',
    },
    ctaSecondary: {
      text: 'Enviar un mensaje',
      action: 'scroll',
      target: '#contacto-form',
    },
    formFields: [
      { name: 'name', label: 'Nombre completo', type: 'text', required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
      { name: 'phone', label: 'Teléfono / WhatsApp', type: 'tel', required: false },
      { name: 'interest', label: '¿Qué te interesa?', type: 'select', required: true,
        options: ['Comprar una propiedad', 'Vender mi propiedad', 'Inversión inmobiliaria', 'Valoración de propiedad', 'Otro'] },
      { name: 'message', label: 'Cuéntame más sobre tu proyecto', type: 'textarea', required: false },
    ],
    formSubmitText: 'Enviar mensaje',
    formSuccessMessage: 'Gracias por tu mensaje. Te contactaré en las próximas 24 horas.',
  },

  // ─── SEO ──────────────────────────────────────────────────────
  seo: {
    title: 'Corredor Inmobiliario Premium en Costa Rica | Andrés Realty',
    description: 'Asesoría inmobiliaria de alto nivel en Costa Rica. Compra, venta e inversión en propiedades premium en Guanacaste, Escazú, Manuel Antonio y más. +15 años de experiencia.',
    keywords: 'corredor inmobiliario Costa Rica, propiedades de lujo Guanacaste, casas premium Escazú, inversión inmobiliaria Costa Rica, bienes raíces Manuel Antonio, asesor inmobiliario premium, real estate Costa Rica',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    canonical: 'https://andresrealty.com',
    schemaType: 'RealEstateAgent',
    structuredData: {
      '@type': 'RealEstateAgent',
      name: 'Andrés Realty',
      description: 'Asesoría inmobiliaria premium en Costa Rica',
      areaServed: ['Guanacaste', 'Escazú', 'Santa Ana', 'Manuel Antonio', 'Nosara', 'Tamarindo'],
      priceRange: '$$$',
    },
  },

  // ─── FOOTER ───────────────────────────────────────────────────
  footer: {
    description: 'Asesoría inmobiliaria premium en Costa Rica. Más de 15 años conectando personas con las propiedades que transforman su vida.',
    quickLinks: [
      { text: 'Inicio', href: '#inicio' },
      { text: 'Sobre Mí', href: '#sobre-mi' },
      { text: 'Servicios', href: '#servicios' },
      { text: 'Propiedades', href: '#propiedades' },
      { text: 'Zonas', href: '#zonas' },
      { text: 'Contacto', href: '#contacto' },
    ],
    operatingZones: ['Guanacaste', 'Escazú', 'Santa Ana', 'Manuel Antonio', 'Nosara', 'Tamarindo', 'San José', 'Heredia'],
    legalText: '© {year} {brandName}. Todos los derechos reservados.',
    privacyUrl: '#',
    termsUrl: '#',
  },

  // ─── ANALYTICS & INTEGRATIONS ─────────────────────────────────
  analytics: {
    googleAnalyticsId: null,  // e.g., 'G-XXXXXXXXXX'
    googleTagManagerId: null, // e.g., 'GTM-XXXXXXX'
    facebookPixelId: null,    // e.g., '000000000000000'
    hotjarId: null,           // e.g., '0000000'
  },

  // ─── NAVIGATION ───────────────────────────────────────────────
  navigation: [
    { text: 'Inicio', href: '#inicio' },
    { text: 'Sobre Mí', href: '#sobre-mi' },
    { text: 'Servicios', href: '#servicios' },
    { text: 'Propiedades', href: '#propiedades' },
    { text: 'Zonas', href: '#zonas' },
    { text: 'Testimonios', href: '#testimonios' },
    { text: 'Contacto', href: '#contacto' },
  ],

  // ─── UI LABELS (i18n / white-label) ───────────────────────────
  // Every rendered string lives here so clients can override
  // language, tone, or terminology without touching code.
  ui: {
    navCtaText: 'Contactar',
    navCtaMobileText: 'Contactar por WhatsApp',
    heroScrollText: 'Descubrir',
    heroImageAlt: 'Propiedad premium',
    whatsappTooltip: '¿Hablamos?',
    whatsappServiceMsg: 'Hola, me interesa el servicio: {service}',
    whatsappPropertyMsg: 'Hola, me interesa la propiedad: {property} ({id})',
    propertyCtaText: 'Consultar',
    propertyBedrooms: 'Hab.',
    propertyBathrooms: 'Baños',
    zoneImageAlt: '{zone} — {country}',
    footerNavHeading: 'Navegación',
    footerZonesHeading: 'Zonas',
    footerContactHeading: 'Contacto',
    footerWhatsappLabel: 'WhatsApp',
    footerPrivacyText: 'Privacidad',
    footerTermsText: 'Términos',
    formSelectPlaceholder: 'Seleccionar...',
    formRequiredError: 'Este campo es obligatorio',
    formEmailError: 'Ingresa un correo electrónico válido',
    formSubmittingText: 'Enviando...',
    formSuccessTitle: '¡Mensaje enviado!',
    formGenericError: 'Error al enviar. Intenta de nuevo.',
  },
};

export default siteConfig;

