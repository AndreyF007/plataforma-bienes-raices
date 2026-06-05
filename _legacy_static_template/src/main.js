/**
 * ═══════════════════════════════════════════════════════════════
 * MAIN — Application Entry Point
 * ═══════════════════════════════════════════════════════════════
 * Imports config, applies theme, renders all content, and
 * initializes all interactive modules.
 */

// ── Styles ─────────────────────────────────────────────────────
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/animations.css';
import './styles/responsive.css';

// ── Config ─────────────────────────────────────────────────────
// Uses clientLoader which deep-merges base config + active client overrides
// Switch clients via: ?client=cliente2 or VITE_CLIENT=cliente2
import siteConfig from './config/clientLoader.js';

// ── Modules ────────────────────────────────────────────────────
import {
  applyTheme,
  applySEO,
  initAnalytics,
  renderSectionHeaders,
  renderNavbar,
  renderHero,
  renderTrustBar,
  renderAbout,
  renderServices,
  renderProperties,
  renderZones,
  renderTestimonials,
  renderProcess,
  renderCtaFinal,
  renderFooter,
  renderWhatsAppFloat,
} from './js/renderer.js';

import { initNavigation } from './js/navigation.js';
import { initAnimations } from './js/animations.js';
import { initForm } from './js/form.js';

// ── Initialize ─────────────────────────────────────────────────
function init() {
  // 1. Apply theme (CSS variables from config)
  applyTheme(siteConfig);

  // 2. Apply SEO metadata
  applySEO(siteConfig);

  // 3. Render all sections from config
  renderNavbar(siteConfig);
  renderSectionHeaders(siteConfig);
  renderHero(siteConfig);
  renderTrustBar(siteConfig);
  renderAbout(siteConfig);
  renderServices(siteConfig);
  renderProperties(siteConfig);
  renderZones(siteConfig);
  renderTestimonials(siteConfig);
  renderProcess(siteConfig);
  renderCtaFinal(siteConfig);
  renderFooter(siteConfig);
  renderWhatsAppFloat(siteConfig);

  // 4. Initialize interactive modules
  initNavigation(siteConfig);
  initAnimations();
  initForm(siteConfig);

  // 5. Initialize analytics
  initAnalytics(siteConfig);

  // 6. Mark page as loaded
  document.body.classList.add('loaded');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
