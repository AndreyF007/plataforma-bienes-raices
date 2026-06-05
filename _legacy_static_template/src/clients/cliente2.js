/**
 * ═══════════════════════════════════════════════════════════════
 * CLIENT: Sofía Inmobiliaria Premium
 * ═══════════════════════════════════════════════════════════════
 *
 * Example of a fully customized second client.
 * Demonstrates how changing ONLY this file rebrands the entire site:
 *   - Different name, brand, colors
 *   - Different agent info and contact
 *   - Different zones (Panamá instead of Costa Rica)
 *   - Different properties, testimonials, and copy
 *   - Different accent color (deep emerald green)
 *
 * To preview: http://localhost:5173/?client=cliente2
 */

const cliente2 = {

  // ─── BRAND ──────────────────────────────────────────────────
  brand: {
    name: 'Sofía Inmobiliaria',
    tagline: 'Inversiones & Propiedades de Lujo',
    logo: null,
    country: 'Panamá',
    colors: {
      accent:     '#2D6A4F',   // Deep emerald green
      accentDark: '#1B4332',
      accentRgb:  '45,106,79',
      cream:      '#EDF2F4',   // Cool off-white
    },
  },

  // ─── AGENT ──────────────────────────────────────────────────
  agent: {
    name: 'Sofía Delgado',
    title: 'Asesora Inmobiliaria de Lujo',
    initials: 'SD',
    license: 'Licencia #PA-28491',
    yearsExperience: 12,
  },

  // ─── CONTACT ────────────────────────────────────────────────
  contact: {
    whatsapp: '+50760000000',
    whatsappMessage: 'Hola Sofía, me interesa recibir asesoría sobre propiedades en Panamá.',
    phone: '+507 6000-0000',
    email: 'sofia@sofiainmobiliaria.com',
    address: 'Punta Pacífica, Ciudad de Panamá',
    mapUrl: 'https://maps.google.com/?q=Punta+Pacifica,+Panama',
  },

  // ─── SOCIAL ─────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/sofiainmobiliaria',
    facebook: 'https://facebook.com/sofiainmobiliaria',
    linkedin: 'https://linkedin.com/in/sofiadelgado',
    youtube: null,
    tiktok: 'https://tiktok.com/@sofiainmobiliaria',
    twitter: null,
  },

  // ─── HERO ───────────────────────────────────────────────────
  hero: {
    backgroundImage: '/images/hero-bg.jpg',
    badge: '+12 años de experiencia en el mercado panameño',
    title: 'El lujo inmobiliario tiene nombre propio',
    subtitle: 'Asesoría integral en compra, venta e inversión de propiedades premium en Panamá. Servicio personalizado con estándares internacionales.',
    ctaPrimary: {
      text: 'Hablar con Sofía',
      action: 'whatsapp',
    },
    ctaSecondary: {
      text: 'Ver propiedades',
      action: 'scroll',
      target: '#propiedades',
    },
  },

  // ─── TRUST BAR ──────────────────────────────────────────────
  trustBar: [
    { value: '+12', label: 'Años de trayectoria', icon: 'calendar' },
    { value: '+150', label: 'Clientes satisfechos', icon: 'home' },
    { value: '+$80M', label: 'En negociaciones cerradas', icon: 'trending' },
    { value: '5', label: 'Zonas de especialidad', icon: 'map' },
    { value: '100%', label: 'Dedicación exclusiva', icon: 'star' },
  ],

  // ─── ABOUT ──────────────────────────────────────────────────
  about: {
    sectionTitle: 'Sobre Sofía',
    sectionSubtitle: 'Pasión por conectar personas con espacios extraordinarios',
    paragraphs: [
      'Mi carrera en bienes raíces comenzó con una convicción simple: cada persona merece un espacio que refleje su mejor versión. Esa idea me llevó a especializarme en el segmento premium del mercado panameño.',
      'Panamá es un mercado único: cosmopolita, en constante evolución y con una oferta que pocos países pueden igualar. Entiendo sus dinámicas porque las vivo a diario.',
      'No trabajo con listados masivos. Selecciono cada propiedad que represento y conozco personalmente cada espacio que ofrezco. Si algo no cumple mi estándar, no lo presento.',
      'Mi compromiso es darte una experiencia de asesoría que esté a la altura de las propiedades que buscas.',
    ],
    highlights: [
      { value: 'Especialista', label: 'en torres residenciales premium' },
      { value: 'Trilingüe', label: 'español, inglés y portugués' },
      { value: 'Certificada', label: 'por la Cámara Panameña de Corredores' },
      { value: 'Conexiones', label: 'con los principales desarrolladores' },
    ],
    ctaText: 'Agendar una consulta',
  },

  // ─── SERVICES ───────────────────────────────────────────────
  services: {
    sectionTitle: 'Servicios',
    sectionSubtitle: 'Acompañamiento integral en cada decisión inmobiliaria',
    items: [
      {
        icon: 'search',
        title: 'Búsqueda Personalizada',
        description: 'Creo un perfil detallado de tus necesidades y exploro el mercado hasta encontrar exactamente lo que buscas. Accedo a propiedades que no están en portales públicos.',
        benefit: 'Ahorra tiempo encontrando solo opciones relevantes.',
        cta: 'Iniciar búsqueda',
      },
      {
        icon: 'tag',
        title: 'Venta Estratégica',
        description: 'Posiciono tu propiedad con materiales de primer nivel, estrategia de pricing basada en datos y acceso a mi red de compradores calificados.',
        benefit: 'Tu propiedad se vende al mejor valor del mercado.',
        cta: 'Valuar mi propiedad',
      },
      {
        icon: 'chart',
        title: 'Inversión en Panamá',
        description: 'Panamá ofrece ventajas fiscales y de crecimiento únicas en la región. Te guío para invertir con visión de largo plazo y retornos reales.',
        benefit: 'Inversiones respaldadas por análisis de mercado.',
        cta: 'Explorar opciones',
      },
      {
        icon: 'calculator',
        title: 'Valuación Profesional',
        description: 'Análisis de valor basado en comparables reales, tendencias de zona y condición del inmueble. Información precisa para decisiones inteligentes.',
        benefit: 'Conoce el valor real de tu patrimonio.',
        cta: 'Solicitar valuación',
      },
      {
        icon: 'camera',
        title: 'Marketing Premium',
        description: 'Fotografía arquitectónica, recorridos virtuales y campañas digitales que hacen que tu propiedad destaque entre miles.',
        benefit: 'Presentación visual de clase mundial.',
        cta: 'Ver portafolio',
      },
      {
        icon: 'shield',
        title: 'Gestión Legal y Cierre',
        description: 'Coordino notarios, abogados y bancos para que el proceso sea transparente y sin sorpresas. Cada documento revisado, cada plazo cumplido.',
        benefit: 'Tranquilidad total de inicio a fin.',
        cta: 'Conocer el proceso',
      },
    ],
  },

  // ─── PROPERTIES ─────────────────────────────────────────────
  properties: {
    sectionTitle: 'Propiedades Seleccionadas',
    sectionSubtitle: 'Cada propiedad pasa por mi filtro personal antes de llegar a ti',
    ctaViewAll: 'Explorar catálogo completo',
    items: [
      {
        id: 'pa-001',
        title: 'Sky Penthouse Punta Pacífica',
        location: 'Punta Pacífica, Ciudad de Panamá',
        price: '$1,850,000',
        status: 'Exclusiva',
        type: 'Penthouse',
        image: '/images/property-2.png',
        features: { bedrooms: 4, bathrooms: 5, area: '520 m²', land: null },
        tags: ['Vista al mar 360°', 'Piso completo', 'Amenidades 5 estrellas'],
        featured: true,
      },
      {
        id: 'pa-002',
        title: 'Villa Tropical Coronado',
        location: 'Playa Coronado, Panamá Oeste',
        price: '$695,000',
        status: 'Disponible',
        type: 'Villa',
        image: '/images/property-1.png',
        features: { bedrooms: 3, bathrooms: 3, area: '380 m²', land: '800 m²' },
        tags: ['Frente a la playa', 'Piscina privada', 'Seguridad 24/7'],
        featured: true,
      },
      {
        id: 'pa-003',
        title: 'Loft Casco Viejo',
        location: 'Casco Antiguo, Ciudad de Panamá',
        price: '$420,000',
        status: 'Disponible',
        type: 'Loft',
        image: '/images/property-3.png',
        features: { bedrooms: 2, bathrooms: 2, area: '165 m²', land: null },
        tags: ['Patrimonio histórico', 'Techos dobles', 'Rental turístico'],
        featured: true,
      },
      {
        id: 'pa-004',
        title: 'Apartamento Costa del Este',
        location: 'Costa del Este, Ciudad de Panamá',
        price: '$385,000',
        status: 'Disponible',
        type: 'Apartamento',
        image: '/images/property-4.png',
        features: { bedrooms: 3, bathrooms: 2, area: '190 m²', land: null },
        tags: ['Club de playa', 'Línea de costa', 'Zona ejecutiva'],
        featured: true,
      },
    ],
  },

  // ─── ZONES ──────────────────────────────────────────────────
  zones: {
    sectionTitle: 'Zonas Premium',
    sectionSubtitle: 'Conocimiento profundo de los mercados más exclusivos de Panamá',
    items: [
      {
        name: 'Punta Pacífica',
        slug: 'punta-pacifica',
        image: '/images/zone-escazu.png',
        description: 'El skyline más impresionante de Centroamérica. Torres residenciales de clase mundial, vista al océano y acceso a la mejor infraestructura de la ciudad.',
        idealFor: 'Ejecutivos, inversionistas, residentes internacionales',
        highlights: ['JW Marriott', 'Multiplaza Pacific', 'Balboa Avenue'],
        marketInsight: 'Valorización constante del 6-10% anual en las principales torres.',
      },
      {
        name: 'Costa del Este',
        slug: 'costa-del-este',
        image: '/images/zone-guanacaste.png',
        description: 'La zona residencial más moderna de Panamá. Planificación urbana impecable, parques, colegios internacionales y una comunidad de alto nivel.',
        idealFor: 'Familias, profesionales, estilos de vida activos',
        highlights: ['Town Center', 'Santa María Golf', 'Parque Lineal'],
        marketInsight: 'Demanda sostenida por expatriados y ejecutivos regionales.',
      },
      {
        name: 'Casco Antiguo',
        slug: 'casco-antiguo',
        image: '/images/zone-manuel.png',
        description: 'Patrimonio Mundial de la UNESCO convertido en el barrio más vibrante de la ciudad. Restaurantes, rooftop bars, boutique hotels y propiedades con carácter.',
        idealFor: 'Inversores en hospitalidad, compradores de estilo de vida',
        highlights: ['Plaza Francia', 'American Trade Hotel', 'Teatro Nacional'],
        marketInsight: 'Incentivos fiscales de hasta 30 años por restauración histórica.',
      },
      {
        name: 'Playa Coronado',
        slug: 'playa-coronado',
        image: '/images/zone-nosara.png',
        description: 'El destino de playa más establecido del Pacífico panameño. A solo 90 minutos de la ciudad, con comunidad internacional consolidada y servicios completos.',
        idealFor: 'Retiro, segunda residencia, rental vacacional',
        highlights: ['Coronado Golf & Beach', 'Playa privada', 'Centro comercial'],
        marketInsight: 'Mercado de rental activo todo el año con ROI del 7-9%.',
      },
    ],
  },

  // ─── TESTIMONIALS ───────────────────────────────────────────
  testimonials: {
    sectionTitle: 'Testimonios',
    sectionSubtitle: 'La experiencia que mis clientes comparten',
    items: [
      {
        name: 'Marcos Restrepo',
        initials: 'MR',
        role: 'Inversionista colombiano',
        location: 'Medellín, Colombia',
        text: 'Sofía me ayudó a comprar dos apartamentos en Punta Pacífica para renta. Su conocimiento del mercado panameño y la coordinación legal fueron excepcionales. Ya estoy viendo retorno.',
        result: 'Dos propiedades con rental desde el mes 1',
        photo: null,
      },
      {
        name: 'Emily & James Carter',
        initials: 'EC',
        role: 'Compradores de retiro',
        location: 'Vancouver, Canadá',
        text: 'We were looking for our retirement home in Panama and Sofia made the entire process feel safe and exciting. From property tours to legal closing, everything was handled professionally.',
        result: 'Villa de retiro en Coronado adquirida',
        photo: null,
      },
      {
        name: 'Ana Lucía Vega',
        initials: 'AV',
        role: 'Vendedora',
        location: 'Ciudad de Panamá',
        text: 'Vendí mi penthouse en Costa del Este en 45 días, un 8% por encima de mi expectativa. El marketing que Sofía preparó fue simplemente de otro nivel.',
        result: 'Venta en 45 días sobre precio objetivo',
        photo: null,
      },
    ],
  },

  // ─── PROCESS ────────────────────────────────────────────────
  process: {
    sectionTitle: 'Mi Metodología',
    sectionSubtitle: 'Un proceso estructurado que elimina la incertidumbre',
  },

  // ─── CTA FINAL ──────────────────────────────────────────────
  ctaFinal: {
    title: 'Tu próxima propiedad en Panamá comienza con una conversación',
    subtitle: 'Cuéntame qué buscas y te mostraré las mejores opciones del mercado. Sin compromiso, sin presión.',
    ctaPrimary: {
      text: 'Escribir a Sofía',
      action: 'whatsapp',
    },
    formSubmitText: 'Enviar consulta',
    formSuccessMessage: 'Gracias por tu interés. Sofía te contactará dentro de las próximas 12 horas.',
  },

  // ─── SEO ────────────────────────────────────────────────────
  seo: {
    title: 'Propiedades de Lujo en Panamá | Sofía Inmobiliaria',
    description: 'Asesora inmobiliaria de lujo en Panamá. Compra, venta e inversión en propiedades premium en Punta Pacífica, Costa del Este, Casco Antiguo y más.',
    keywords: 'propiedades de lujo Panamá, penthouse Punta Pacífica, bienes raíces Panamá, inversión inmobiliaria Panamá, apartamentos Costa del Este, asesora inmobiliaria premium',
    canonical: 'https://sofiainmobiliaria.com',
    structuredData: {
      '@type': 'RealEstateAgent',
      name: 'Sofía Inmobiliaria',
      description: 'Asesora inmobiliaria de lujo en Panamá',
      areaServed: ['Punta Pacífica', 'Costa del Este', 'Casco Antiguo', 'Coronado', 'San Francisco'],
      priceRange: '$$$',
    },
  },

  // ─── FOOTER ─────────────────────────────────────────────────
  footer: {
    description: 'Asesoría inmobiliaria premium en Panamá. Más de 12 años conectando personas exigentes con las propiedades que merecen.',
    operatingZones: ['Punta Pacífica', 'Costa del Este', 'Casco Antiguo', 'Coronado', 'San Francisco', 'El Cangrejo', 'Clayton'],
  },

  // ─── NAVIGATION ─────────────────────────────────────────────
  navigation: [
    { text: 'Inicio', href: '#inicio' },
    { text: 'Sobre Sofía', href: '#sobre-mi' },
    { text: 'Servicios', href: '#servicios' },
    { text: 'Propiedades', href: '#propiedades' },
    { text: 'Zonas', href: '#zonas' },
    { text: 'Testimonios', href: '#testimonios' },
    { text: 'Contacto', href: '#contacto' },
  ],

  // ─── UI LABELS (optional overrides) ─────────────────────────
  ui: {
    navCtaText: 'Contactar a Sofía',
    navCtaMobileText: 'Escribir a Sofía',
    whatsappTooltip: 'Escríbeme',
    heroImageAlt: 'Propiedades de lujo en Panamá',
  },
};

export default cliente2;
