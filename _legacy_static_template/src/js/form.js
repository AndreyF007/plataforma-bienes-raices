/**
 * ═══════════════════════════════════════════════════════════════
 * FORM — Contact form validation & submission
 * ═══════════════════════════════════════════════════════════════
 */

export function initForm(config) {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMessage = config.ctaFinal?.formSuccessMessage || 'Gracias por tu mensaje.';
  const ui = config.ui || {};

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.style.borderColor = '';
    });

    // Validate
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    let isValid = true;

    // Required field validation
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        showError(field, ui.formRequiredError || 'Este campo es obligatorio');
        isValid = false;
      }
    });

    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
      showError(emailField, ui.formEmailError || 'Ingresa un correo electrónico válido');
      isValid = false;
    }

    if (!isValid) return;

    // Submit
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = ui.formSubmittingText || 'Enviando...';
    submitBtn.disabled = true;

    try {
      // Simulate submission — replace with actual webhook/API
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Track conversion event
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'contact',
          event_label: data.interest || 'general',
        });
      }

      // Show success
      form.innerHTML = `
        <div class="form-success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" style="margin: 0 auto var(--space-sm);">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <p style="font-weight: 600; margin-bottom: 0.5rem;">${ui.formSuccessTitle || '¡Mensaje enviado!'}</p>
          <p>${successMessage}</p>
        </div>
      `;

      // Log form data (for debugging — remove in production)
      console.log('Form submission data:', data);
    } catch (error) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      showError(submitBtn, ui.formGenericError || 'Error al enviar. Intenta de nuevo.');
      console.error('Form submission error:', error);
    }
  });

  function showError(field, message) {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
    field.style.borderColor = '#e53e3e';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
