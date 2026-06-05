/**
 * ═══════════════════════════════════════════════════════════════
 * RENDERER — Dynamic content rendering from config
 * ═══════════════════════════════════════════════════════════════
 * The core white-label engine. Reads siteConfig and populates
 * all dynamic content throughout the page.
 */

import { getIcon } from './icons.js';

/**
 * Update section headers and other HTML-hardcoded text from config (white-label)
 */
export function renderSectionHeaders(config) {
  const updates = [
    { labelId: 'services-label', titleId: 'services-title', section: config.services },
    { labelId: 'properties-label', titleId: 'properties-title', section: config.properties },
    { labelId: 'zones-label', titleId: 'zones-title', section: config.zones },
    { labelId: 'testimonials-label', titleId: 'testimonials-title', section: config.testimonials },
    { labelId: 'process-label', titleId: 'process-title', section: config.process },
  ];

  updates.forEach(({ labelId, titleId, section }) => {
    const label = document.getElementById(labelId);
    const title = document.getElementById(titleId);
    if (label && section?.sectionTitle) label.textContent = section.sectionTitle;
    if (title && section?.sectionSubtitle) title.textContent = section.sectionSubtitle;
  });

  // Testimonials subtitle (separate from sectionSubtitle)
  const testSubtitle = document.getElementById('testimonials-subtitle');
  if (testSubtitle && config.testimonials?.sectionSubtitle) {
    testSubtitle.textContent = config.testimonials.sectionSubtitle;
  }

  // Hero scroll indicator text
  const scrollText = document.getElementById('hero-scroll-text');
  if (scrollText && config.ui?.heroScrollText) {
    scrollText.textContent = config.ui.heroScrollText;
  }

  // HTML lang attribute
  if (config.brand?.language) {
    document.documentElement.lang = config.brand.language;
  }

  // Theme color meta
  if (config.brand?.colors?.primary) {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = config.brand.colors.primary;
  }
}

/**
 * Apply brand colors and fonts from config to CSS custom properties
 */
export function applyTheme(config) {
  const root = document.documentElement;
  const colors = config.brand?.colors;

  if (colors) {
    if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
    if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
    if (colors.cream) root.style.setProperty('--color-cream', colors.cream);
    if (colors.gray100) root.style.setProperty('--color-gray-100', colors.gray100);
    if (colors.gray300) root.style.setProperty('--color-gray-300', colors.gray300);
    if (colors.gray600) root.style.setProperty('--color-gray-600', colors.gray600);
    if (colors.gray800) root.style.setProperty('--color-gray-800', colors.gray800);
    if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
    if (colors.accentDark) root.style.setProperty('--color-accent-dark', colors.accentDark);
    if (colors.accentRgb) root.style.setProperty('--color-accent-rgb', colors.accentRgb);
  }

  const fonts = config.brand?.fonts;
  if (fonts) {
    if (fonts.heading) root.style.setProperty('--font-heading', fonts.heading);
    if (fonts.body) root.style.setProperty('--font-body', fonts.body);

    // Dynamically load custom Google Fonts if specified in config
    [fonts.headingUrl, fonts.bodyUrl].forEach(url => {
      if (url && !document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }
}

/**
 * Generate WhatsApp URL
 */
export function getWhatsAppUrl(config, customMessage) {
  const phone = (config.contact?.whatsapp || '').replace(/[^0-9+]/g, '');
  const message = encodeURIComponent(customMessage || config.contact?.whatsappMessage || '');
  return `https://wa.me/${phone.replace('+', '')}?text=${message}`;
}

/**
 * Handle CTA action
 */
export function handleCTA(cta, config) {
  if (!cta) return '#';

  switch (cta.action) {
    case 'whatsapp':
      return getWhatsAppUrl(config);
    case 'scroll':
      return cta.target || '#contacto';
    case 'url':
      return cta.target || '#';
    case 'phone':
      return `tel:${config.contact?.phone || ''}`;
    case 'email':
      return `mailto:${config.contact?.email || ''}`;
    default:
      return cta.target || '#';
  }
}

/**
 * Render the navbar
 */
export function renderNavbar(config) {
  const container = document.getElementById('navbar-content');
  if (!container) return;

  const brand = config.brand;
  const nav = config.navigation || [];

  const logoHTML = brand.logo
    ? `<img src="${brand.logo}" alt="${brand.name}" class="navbar__logo" />`
    : `<div>
         <span class="navbar__brand-text">${brand.name}</span>
         <span class="navbar__tagline">${brand.tagline}</span>
       </div>`;

  const linksHTML = nav.map(item =>
    `<a href="${item.href}" class="navbar__link">${item.text}</a>`
  ).join('');

  const mobileLinksHTML = nav.map(item =>
    `<a href="${item.href}" class="mobile-menu__link">${item.text}</a>`
  ).join('');

  container.innerHTML = `
    <a href="#inicio" class="navbar__brand" aria-label="${brand.name} - Inicio">
      ${logoHTML}
    </a>
    <nav class="navbar__menu" aria-label="Navegación principal">
      ${linksHTML}
      <a href="${getWhatsAppUrl(config)}" target="_blank" rel="noopener" class="btn btn--primary btn--sm navbar__cta navbar__cta--desktop">${config.ui?.navCtaText || 'Contactar'}</a>
    </nav>
    <button class="navbar__toggle" id="navbar-toggle" aria-label="Menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;

  // Render mobile menu
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.innerHTML = `
      ${mobileLinksHTML}
      <a href="${getWhatsAppUrl(config)}" target="_blank" rel="noopener" class="btn btn--primary" style="margin-top: var(--space-md);">${config.ui?.navCtaMobileText || 'Contactar por WhatsApp'}</a>
    `;
  }
}

/**
 * Render the hero section
 */
export function renderHero(config) {
  const container = document.getElementById('hero-content');
  if (!container) return;

  const hero = config.hero;
  const bg = document.getElementById('hero-bg');

  // Set background
  if (bg) {
    if (hero.backgroundVideo) {
      bg.innerHTML = `<video autoplay muted loop playsinline><source src="${hero.backgroundVideo}" type="video/mp4" /></video>`;
    } else if (hero.backgroundImage) {
      // Try png version first, fall back to jpg
      const imgSrc = hero.backgroundImage.replace('.jpg', '.png');
      bg.innerHTML = `<img src="${imgSrc}" alt="${config.ui?.heroImageAlt || config.brand?.name || 'Premium Real Estate'}" />`;
    }
  }

  const ctaPrimaryUrl = handleCTA(hero.ctaPrimary, config);
  const ctaSecondaryUrl = handleCTA(hero.ctaSecondary, config);
  const ctaPrimaryTarget = hero.ctaPrimary?.action === 'whatsapp' ? ' target="_blank" rel="noopener"' : '';

  container.innerHTML = `
    <div class="hero__badge">${hero.badge}</div>
    <h1 class="hero__title">${hero.title}</h1>
    <p class="hero__subtitle">${hero.subtitle}</p>
    <div class="hero__actions">
      <a href="${ctaPrimaryUrl}" class="btn btn--primary btn--lg"${ctaPrimaryTarget}>
        ${hero.ctaPrimary?.action === 'whatsapp' ? getIcon('whatsapp').replace('viewBox', 'class="btn__icon" viewBox') : ''}
        ${hero.ctaPrimary.text}
      </a>
      <a href="${ctaSecondaryUrl}" class="btn btn--secondary btn--lg">
        ${hero.ctaSecondary.text}
      </a>
    </div>
  `;
}

/**
 * Render trust bar
 */
export function renderTrustBar(config) {
  const container = document.getElementById('trust-bar-grid');
  if (!container) return;

  container.innerHTML = config.trustBar.map(item => `
    <div class="trust-bar__item">
      <div class="trust-bar__value">${item.value}</div>
      <div class="trust-bar__label">${item.label}</div>
    </div>
  `).join('');
}

/**
 * Render about section
 */
export function renderAbout(config) {
  const container = document.getElementById('about-content');
  if (!container) return;

  const about = config.about;
  const ctaUrl = getWhatsAppUrl(config);

  const paragraphsHTML = about.paragraphs.map(p => `<p class="about__paragraph">${p}</p>`).join('');

  const highlightsHTML = about.highlights.map(h => `
    <div class="about__highlight">
      <div class="about__highlight-value">${h.value}</div>
      <div class="about__highlight-label">${h.label}</div>
    </div>
  `).join('');

  // Image: agent photo, about photo, or placeholder
  const imageUrl = about.photo || config.agent?.photo;
  const imageHTML = imageUrl
    ? `<img src="${imageUrl}" alt="${config.agent.name}" class="about__image" loading="lazy" />`
    : `<div class="about__image" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-gray-800) 100%); display: flex; align-items: center; justify-content: center;">
         <span style="font-family: var(--font-heading); font-size: 4rem; color: var(--color-accent); opacity: 0.3;">${config.agent?.initials || 'AR'}</span>
       </div>`;

  container.innerHTML = `
    <div class="about__grid">
      <div class="about__image-wrapper reveal reveal--left">
        ${imageHTML}
      </div>
      <div class="about__content reveal reveal--right">
        <span class="section__label">${about.sectionTitle}</span>
        <h2 class="section__title">${about.sectionSubtitle}</h2>
        <div class="divider divider--left"></div>
        ${paragraphsHTML}
        <div class="about__highlights">
          ${highlightsHTML}
        </div>
        <a href="${ctaUrl}" target="_blank" rel="noopener" class="btn btn--primary">
          ${getIcon('whatsapp').replace('viewBox', 'class="btn__icon" viewBox')}
          ${about.ctaText}
        </a>
      </div>
    </div>
  `;
}

/**
 * Render services
 */
export function renderServices(config) {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const services = config.services;

  container.innerHTML = services.items.map(service => `
    <div class="service-card">
      <div class="service-card__icon">${getIcon(service.icon)}</div>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__description">${service.description}</p>
      <p class="service-card__benefit">${service.benefit}</p>
      <a href="${getWhatsAppUrl(config, (config.ui?.whatsappServiceMsg || 'Hola, me interesa el servicio: {service}').replace('{service}', service.title))}" target="_blank" rel="noopener" class="service-card__cta">
        ${service.cta} ${getIcon('arrowRight')}
      </a>
    </div>
  `).join('');
}

/**
 * Render properties
 */
export function renderProperties(config) {
  const container = document.getElementById('properties-grid');
  if (!container) return;

  const properties = config.properties;

  container.innerHTML = properties.items.map(prop => {
    // Use png extension
    const imgSrc = prop.image.replace('.jpg', '.png');

    const featuresHTML = [];
    if (prop.features.bedrooms) featuresHTML.push(`<div class="card__feature">${getIcon('bed')} ${prop.features.bedrooms} ${config.ui?.propertyBedrooms || 'Hab.'}</div>`);
    if (prop.features.bathrooms) featuresHTML.push(`<div class="card__feature">${getIcon('bath')} ${prop.features.bathrooms} ${config.ui?.propertyBathrooms || 'Baños'}</div>`);
    if (prop.features.area) featuresHTML.push(`<div class="card__feature">${getIcon('area')} ${prop.features.area}</div>`);
    if (prop.features.land) featuresHTML.push(`<div class="card__feature">${getIcon('land')} ${prop.features.land}</div>`);

    const tagsHTML = prop.tags?.map(tag => `<span class="card__tag">${tag}</span>`).join('') || '';

    return `
      <article class="card" id="${prop.id}">
        <div class="card__image-wrapper">
          <img src="${imgSrc}" alt="${prop.title} - ${prop.location}" class="card__image" loading="lazy" />
          <span class="card__badge">${prop.status}</span>
        </div>
        <div class="card__body">
          <div class="card__type">${prop.type}</div>
          <h3 class="card__title">${prop.title}</h3>
          <div class="card__location">${getIcon('mapPin')} ${prop.location}</div>
          <div class="card__features">${featuresHTML.join('')}</div>
          <div class="card__tags">${tagsHTML}</div>
        </div>
        <div class="card__footer">
          <div class="card__price">${prop.price}</div>
          <a href="${getWhatsAppUrl(config, (config.ui?.whatsappPropertyMsg || 'Hola, me interesa la propiedad: {property} ({id})').replace('{property}', prop.title).replace('{id}', prop.id))}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">${config.ui?.propertyCtaText || 'Consultar'}</a>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Render zones
 */
export function renderZones(config) {
  const container = document.getElementById('zones-grid');
  if (!container) return;

  container.innerHTML = config.zones.items.map(zone => {
    const imgSrc = zone.image.replace('.jpg', '.png');
    return `
      <div class="zone-card">
        <img src="${imgSrc}" alt="${(config.ui?.zoneImageAlt || '{zone} — {country}').replace('{zone}', zone.name).replace('{country}', config.brand?.country || '')}" class="zone-card__image" loading="lazy" />
        <div class="zone-card__overlay"></div>
        <div class="zone-card__content">
          <h3 class="zone-card__name">${zone.name}</h3>
          <p class="zone-card__ideal">${zone.idealFor}</p>
          <p class="zone-card__description">${zone.description}</p>
          <p class="zone-card__insight">${zone.marketInsight}</p>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render testimonials
 */
export function renderTestimonials(config) {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = config.testimonials.items.map(t => {
    const avatarHTML = t.photo
      ? `<img src="${t.photo}" alt="${t.name}" />`
      : t.initials;

    return `
      <div class="testimonial-card">
        <div class="testimonial-card__quote">"</div>
        <p class="testimonial-card__text">${t.text}</p>
        <div class="testimonial-card__result">${t.result}</div>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${avatarHTML}</div>
          <div>
            <div class="testimonial-card__name">${t.name}</div>
            <div class="testimonial-card__role">${t.role} · ${t.location}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render process steps
 */
export function renderProcess(config) {
  const container = document.getElementById('process-grid');
  if (!container) return;

  container.innerHTML = config.process.steps.map(step => `
    <div class="process-step">
      <div class="process-step__number">${step.number}</div>
      <div class="process-step__content">
        <h3 class="process-step__title">${step.title}</h3>
        <p class="process-step__description">${step.description}</p>
      </div>
    </div>
  `).join('');
}

/**
 * Render CTA Final section
 */
export function renderCtaFinal(config) {
  const contentContainer = document.getElementById('cta-final-content');
  const formContainer = document.getElementById('cta-final-form');
  if (!contentContainer || !formContainer) return;

  const cta = config.ctaFinal;
  const ctaPrimaryUrl = handleCTA(cta.ctaPrimary, config);

  contentContainer.innerHTML = `
    <h2 class="cta-final__title">${cta.title}</h2>
    <p class="cta-final__subtitle">${cta.subtitle}</p>
    <div class="cta-final__actions">
      <a href="${ctaPrimaryUrl}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg">
        ${getIcon('whatsapp').replace('viewBox', 'class="btn__icon" viewBox')}
        ${cta.ctaPrimary.text}
      </a>
    </div>
  `;

  // Build form
  const fieldsHTML = cta.formFields.map(field => {
    let inputHTML;

    switch (field.type) {
      case 'select':
        const optionsHTML = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
        inputHTML = `<select name="${field.name}" id="form-${field.name}" class="form-select" ${field.required ? 'required' : ''}>
          <option value="">${config.ui?.formSelectPlaceholder || 'Seleccionar...'}</option>
          ${optionsHTML}
        </select>`;
        break;
      case 'textarea':
        inputHTML = `<textarea name="${field.name}" id="form-${field.name}" class="form-textarea" placeholder="${field.label}" ${field.required ? 'required' : ''}></textarea>`;
        break;
      default:
        inputHTML = `<input type="${field.type}" name="${field.name}" id="form-${field.name}" class="form-input" placeholder="${field.label}" ${field.required ? 'required' : ''} />`;
    }

    return `
      <div class="form-group">
        <label for="form-${field.name}" class="form-label">${field.label}${field.required ? ' *' : ''}</label>
        ${inputHTML}
      </div>
    `;
  }).join('');

  formContainer.innerHTML = `
    <form id="contact-form" novalidate>
      ${fieldsHTML}
      <button type="submit" class="btn btn--primary" style="width: 100%; margin-top: var(--space-sm);">${cta.formSubmitText}</button>
    </form>
  `;
}

/**
 * Render footer
 */
export function renderFooter(config) {
  const container = document.getElementById('footer-content');
  if (!container) return;

  const footer = config.footer;
  const brand = config.brand;
  const contact = config.contact;
  const social = config.social;

  // Social links
  const socialLinks = Object.entries(social)
    .filter(([_, url]) => url)
    .map(([platform, url]) => `
      <a href="${url}" target="_blank" rel="noopener" class="footer__social-link" aria-label="${platform}">
        ${getIcon(platform)}
      </a>
    `).join('');

  // Quick links
  const quickLinksHTML = footer.quickLinks.map(link =>
    `<a href="${link.href}" class="footer__link">${link.text}</a>`
  ).join('');

  // Operating zones
  const zonesHTML = footer.operatingZones.map(zone =>
    `<span class="footer__link">${zone}</span>`
  ).join('');

  // Legal text with dynamic year
  const legalText = footer.legalText
    .replace('{year}', new Date().getFullYear())
    .replace('{brandName}', brand.name);

  container.innerHTML = `
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand-text">${brand.name}</div>
            <p class="footer__description">${footer.description}</p>
            <div class="footer__social">${socialLinks}</div>
          </div>
          <div>
            <h4 class="footer__heading">${config.ui?.footerNavHeading || 'Navegación'}</h4>
            <div class="footer__links">${quickLinksHTML}</div>
          </div>
          <div>
            <h4 class="footer__heading">${config.ui?.footerZonesHeading || 'Zonas'}</h4>
            <div class="footer__links">${zonesHTML}</div>
          </div>
          <div>
            <h4 class="footer__heading">${config.ui?.footerContactHeading || 'Contacto'}</h4>
            <div class="footer__contact-item">${getIcon('mapPin')} <span>${contact.address}</span></div>
            <div class="footer__contact-item">${getIcon('phone')} <a href="tel:${contact.phone}">${contact.phone}</a></div>
            <div class="footer__contact-item">${getIcon('email')} <a href="mailto:${contact.email}">${contact.email}</a></div>
            <div class="footer__contact-item">${getIcon('whatsapp')} <a href="${getWhatsAppUrl(config)}" target="_blank" rel="noopener">${config.ui?.footerWhatsappLabel || 'WhatsApp'}</a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-inner">
          <span>${legalText}</span>
          <div class="footer__legal-links">
            <a href="${footer.privacyUrl}">${config.ui?.footerPrivacyText || 'Privacidad'}</a>
            <a href="${footer.termsUrl}">${config.ui?.footerTermsText || 'Términos'}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render WhatsApp floating button
 */
export function renderWhatsAppFloat(config) {
  const container = document.getElementById('whatsapp-float');
  if (!container) return;

  const url = getWhatsAppUrl(config);

  container.href = url;
  container.innerHTML = `
    ${getIcon('whatsapp')}
    <span class="whatsapp-float__tooltip">${config.ui?.whatsappTooltip || '¿Hablamos?'}</span>
  `;
}

/**
 * Apply SEO metadata
 */
export function applySEO(config) {
  const seo = config.seo;
  const brand = config.brand;

  document.title = seo.title;

  // Meta tags
  setMeta('description', seo.description);
  setMeta('keywords', seo.keywords);

  // Open Graph
  setMeta('og:title', seo.title, 'property');
  setMeta('og:description', seo.description, 'property');
  setMeta('og:type', seo.ogType, 'property');
  setMeta('og:url', seo.canonical, 'property');
  setMeta('og:image', brand.ogImage, 'property');
  setMeta('og:locale', 'es_CR', 'property');

  // Twitter
  setMeta('twitter:card', seo.twitterCard);
  setMeta('twitter:title', seo.title);
  setMeta('twitter:description', seo.description);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;

  // Schema.org JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': seo.structuredData['@type'],
    name: seo.structuredData.name || brand.name,
    description: seo.structuredData.description || seo.description,
    url: seo.canonical,
    telephone: config.contact?.phone,
    email: config.contact?.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.contact?.address,
      addressCountry: brand.country,
    },
    areaServed: seo.structuredData.areaServed,
    priceRange: seo.structuredData.priceRange,
    image: brand.ogImage,
    sameAs: Object.values(config.social).filter(Boolean),
  };

  let scriptTag = document.getElementById('schema-org');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'schema-org';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(schema);
}

function setMeta(name, content, attrName = 'name') {
  if (!content) return;
  let tag = document.querySelector(`meta[${attrName}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Initialize analytics if configured
 */
export function initAnalytics(config) {
  const analytics = config.analytics;
  if (!analytics) return;

  // Google Analytics 4
  if (analytics.googleAnalyticsId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', analytics.googleAnalyticsId);
  }

  // Track all CTA clicks
  document.addEventListener('click', (e) => {
    const cta = e.target.closest('.btn');
    if (cta && typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: cta.textContent.trim(),
        value: 1,
      });
    }
  });
}
