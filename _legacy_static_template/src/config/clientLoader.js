/**
 * ═══════════════════════════════════════════════════════════════
 * CLIENT LOADER — Multi-client configuration system
 * ═══════════════════════════════════════════════════════════════
 *
 * This module loads the active client config and deep-merges it
 * with the base siteConfig defaults. This means clients only
 * need to override the fields they want to change — everything
 * else inherits from the base.
 *
 * HOW TO USE:
 * 1. Create a new file in /src/clients/ (e.g., cliente3.js)
 * 2. Export an object with only the fields you want to override
 * 3. Set ACTIVE_CLIENT below to point to your new client
 * 4. Run `npm run dev` — done.
 *
 * HOW TO DEPLOY MULTIPLE CLIENTS:
 * Option A: Change ACTIVE_CLIENT and build separately per client
 * Option B: Use env variables: VITE_CLIENT=cliente2 npm run build
 * Option C: Host all configs and load dynamically via URL param
 */

import baseConfig from './siteConfig.js';

// ── Client imports ──────────────────────────────────────────────
// Add new client imports here as they are created
import cliente1Overrides from '../clients/cliente1.js';
import cliente2Overrides from '../clients/cliente2.js';

// ── Client registry ─────────────────────────────────────────────
const clients = {
  cliente1: cliente1Overrides,
  cliente2: cliente2Overrides,
};

// ── Active client selection ─────────────────────────────────────
// Change this to switch between clients, or use URL param ?client=X
function getActiveClientId() {
  // Priority 1: URL parameter (for preview/testing)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlClient = params.get('client');
    if (urlClient && clients[urlClient]) return urlClient;
  }

  // Priority 2: Vite env variable (for build-time selection)
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLIENT) {
    const envClient = import.meta.env.VITE_CLIENT;
    if (clients[envClient]) return envClient;
  }

  // Priority 3: Default client
  return 'cliente1';
}

// ── Deep merge utility ──────────────────────────────────────────
function deepMerge(target, source) {
  const output = { ...target };

  for (const key of Object.keys(source)) {
    if (source[key] === null || source[key] === undefined) {
      // Explicit null = remove/clear the field
      output[key] = source[key];
      continue;
    }

    if (
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key]) &&
      target[key] !== null
    ) {
      // Recursively merge nested objects
      output[key] = deepMerge(target[key], source[key]);
    } else {
      // Overwrite everything else (arrays, primitives)
      output[key] = source[key];
    }
  }

  return output;
}

// ── Build final config ──────────────────────────────────────────
const activeClientId = getActiveClientId();
const clientOverrides = clients[activeClientId] || {};
const resolvedConfig = deepMerge(baseConfig, clientOverrides);

// Log active client in dev mode
if (import.meta.env?.DEV) {
  console.log(`%c[White-Label] Active client: ${activeClientId}`, 'color: #C4956A; font-weight: bold;');
}

export default resolvedConfig;
