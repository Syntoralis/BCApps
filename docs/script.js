/**
 * SYNTORALIS - Core Script (v11.0 - Clean & Optimized)
 * Handles: Theme, Multi-language Legal Loading, Forms (hCaptcha), Navigation, Print.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CONFIGURATION & TRANSLATIONS
     ========================================================================== */
  const pageLang = document.documentElement.lang || 'fr';
  
  const texts = {
    fr: {
      themeLight: 'Mode clair',
      themeDark: 'Mode sombre',
      loading: 'Chargement...',
      loadError: 'Erreur de chargement. Veuillez réessayer.',
      printPrepare: 'Préparation de l\'impression...',
      errScript: 'Erreur : Module de sécurité introuvable.',
      errCaptchaExpired: 'Le captcha a expiré. Veuillez le valider à nouveau.',
      errCaptchaTech: 'Erreur technique avec le captcha.',
      errDataAccept: 'Veuillez accepter le traitement de vos données.',
      errCaptchaValidate: 'Veuillez valider le captcha de sécurité.',
      errSelectValue: 'Veuillez sélectionner une option pour : ',
      errCorrectField: 'Veuillez corriger le champ : ',
      btnSending: 'Envoi en cours...',
      successMsg: '✅ Message envoyé avec succès ! Réponse sous 24h.',
      errSendGeneric: 'Erreur lors de l\'envoi. ',
      errFormNotActive: '⚠️ Formulaire inactif. Vérifiez vos emails (Spam).',
      errCode: 'Code: '
    },
    en: {
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
      loading: 'Loading...',
      loadError: 'Loading error. Please try again later.',
      printPrepare: 'Preparing print...',
      errScript: 'Error: Security module not found.',
      errCaptchaExpired: 'Captcha expired. Please validate again.',
      errCaptchaTech: 'Technical error with captcha.',
      errDataAccept: 'Please accept data processing.',
      errCaptchaValidate: 'Please validate the security captcha.',
      errSelectValue: 'Please select an option for: ',
      errCorrectField: 'Please correct the field: ',
      btnSending: 'Sending...',
      successMsg: '✅ Message sent successfully! Response within 24h.',
      errSendGeneric: 'Error sending message. ',
      errFormNotActive: '⚠️ Form inactive. Check your emails (Spam).',
      errCode: 'Code: '
    }
  };

  const t = texts[pageLang] || texts.fr;

  /* ==========================================================================
     2. THEME MANAGEMENT
     ========================================================================== */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeText = document.getElementById('themeText');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  const ecoBadge = document.getElementById('ecoindex-badge');

  // New function to generate/update the EcoIndex badge
  const renderEcoBadge = (themeMode) => {
    if (!ecoBadge) return;

    const currentUrl = encodeURIComponent(window.location.href);
    
    // Build the HTML directly
    ecoBadge.innerHTML = `
      <a href="https://bff.ecoindex.fr/redirect/?url=${currentUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;">
        <img src="https://bff.ecoindex.fr/badge/?theme=${themeMode}&url=${currentUrl}" 
             alt="EcoIndex Badge" 
             style="border:0; max-width:200px; width:100%; height:auto;">
      </a>
    `;
  };

  const applyTheme = (theme) => {
    if (!body) return;
    const isDark = theme === 'dark';
    const themeMode = isDark ? 'dark' : 'light'; // Determine 'light' or 'dark' for the badge
    
    body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (!isDark) body.removeAttribute('data-theme');

    if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
    if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
    if (themeText) themeText.textContent = isDark ? t.themeLight : t.themeDark;
    
    // Update the EcoIndex badge with the new theme
    renderEcoBadge(themeMode);
    
    // Save preference unless overridden by URL
    if (!window.location.search.includes('theme=')) {
      localStorage.setItem('theme', themeMode);
    }
  };

  // Init Theme
  const urlParams = new URLSearchParams(window.location.search);
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (urlParams.get('theme')) applyTheme(urlParams.get('theme'));
  else if (savedTheme) applyTheme(savedTheme);
  else applyTheme(prefersDark ? 'dark' : 'light');

  // Toggle Event
  themeToggle?.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });

  // System Change Listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ==========================================================================
     3. DYNAMIC LEGAL CONTENT LOADER (FR/EN)
     ========================================================================== */
  const legalSections = [
    { id: 'mentions-legales', file: 'mentions-legales-content' },
    { id: 'cgv-b2b', file: 'cgv-b2b-content' },
    { id: 'cgv-b2c', file: 'cgv-b2c-content' }
  ];

  let currentOpenSection = null;
  let lastTriggerElement = null;

  const loadLegalContent = async (sectionId, fileName) => {
    const section = document.getElementById(sectionId);
    const container = section?.querySelector('.container');
    if (!section || !container) return;

    if (section.getAttribute('data-loaded') === 'true') {
      // Si déjà chargé, on passe directement à l'ouverture
      return; 
    }

    // 1. Afficher le chargement
    container.innerHTML = `<p>${t.loading}</p>`;
    const suffix = pageLang === 'en' ? '-en' : '';
    
    try {
      const response = await fetch(`${fileName}${suffix}.html`);
      if (!response.ok) throw new Error('Fetch failed');
      
      const htmlContent = await response.text();
      
      // 2. Injecter le contenu
      container.innerHTML = htmlContent;
      section.setAttribute('data-loaded', 'true');
      
      // 3. Réattacher les événements (Boutons fermer/imprimer)
      bindDynamicEvents(section);

      // 4. CORRECTION DU FOCUS : Attendre que le navigateur ait rendu le contenu
      // On utilise requestAnimationFrame deux fois pour être sûr que le layout est fini
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const title = section.querySelector('h2');
          if (title) {
            title.setAttribute('tabindex', '-1');
            title.focus({ preventScroll: true }); // On focus d'abord sans scroller
            title.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Ensuite on scrole
          }
        });
      });

    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="error-message">${t.loadError}</p>`;
    }
  };

  const openSection = (id, trigger) => {
    const section = document.getElementById(id);
    if (!section) return;

    if (currentOpenSection && currentOpenSection !== section) {
      currentOpenSection.style.display = 'none';
      currentOpenSection.setAttribute('aria-hidden', 'true');
    }

    currentOpenSection = section;
    lastTriggerElement = trigger;
    
    section.style.display = 'block';
    section.setAttribute('aria-hidden', 'false');
    history.pushState(null, null, `#${id}`);

    // Focus & Scroll
    requestAnimationFrame(() => {
      const title = section.querySelector('h2');
      if (title) {
        title.setAttribute('tabindex', '-1');
        title.focus();
        title.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const closeSection = () => {
    if (!currentOpenSection) return;
    
    currentOpenSection.style.display = 'none';
    currentOpenSection.setAttribute('aria-hidden', 'true');
    history.pushState(null, null, ' ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (lastTriggerElement) {
      setTimeout(() => lastTriggerElement.focus(), 300);
    }
    currentOpenSection = null;
    lastTriggerElement = null;
  };

  const bindDynamicEvents = (section) => {
    if (!section) return;

    // Close Button
    const closeBtn = section.querySelector('button[id^="close-"]');
    closeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      closeSection();
    });

    // Print Buttons
    section.querySelectorAll('button[data-action="print"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        handlePrint(section);
      });
    });
  };

  // Init Legal Links
  document.querySelectorAll('.legal-toggle-link, .cgvb2b-toggle-link, .cgvb2c-toggle-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const config = legalSections.find(s => s.id === targetId);
      
      if (config) {
        loadLegalContent(targetId, config.file);
        openSection(targetId, link);
      }
    });
  });

  // Escape Key & Hash Handling
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSection(); });
  
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    if (legalSections.some(s => s.id === targetId)) {
      const link = document.querySelector(`a[href="#${targetId}"]`);
      if (link) setTimeout(() => link.click(), 100);
    }
  }

  /* ==========================================================================
     4. CONTACT FORM & HCAPTCHA
     ========================================================================== */
  const form = document.getElementById('contactForm');
  const msgDiv = document.getElementById('form-message');
  const rgpdCheck = document.getElementById('rgpdaccept');
  const hcaptchaContainer = document.getElementById('hcaptcha-container');
  const SITE_KEY = "43889eea-5a58-4e80-93b8-25de84be8284";
  
  let hcaptchaVerified = false;
  let hcaptchaWidgetId = null;
  let isScriptLoaded = false;

  const setMessage = (msg, type) => {
    if (!msgDiv) return;
    msgDiv.textContent = msg;
    msgDiv.className = type === 'error' ? 'error-message' : 'success-message';
    msgDiv.style.display = 'block';
    msgDiv.setAttribute('role', type === 'error' ? 'alert' : 'status');
    msgDiv.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  };

  const loadHCaptcha = () => {
    if (isScriptLoaded) return;
    const script = document.createElement('script');
    script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isScriptLoaded = true;
      if (rgpdCheck?.checked) renderHCaptcha();
    };
    script.onerror = () => setMessage(t.errScript, 'error');
    document.head.appendChild(script);
  };

  const renderHCaptcha = () => {
    if (!hcaptchaContainer || !window.hcaptcha || hcaptchaWidgetId !== null) return;
    
    hcaptchaWidgetId = window.hcaptcha.render(hcaptchaContainer, {
      sitekey: SITE_KEY,
      callback: (token) => {
        hcaptchaVerified = true;
        let hidden = document.getElementById('h-captcha-response');
        if (!hidden) {
          hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.id = 'h-captcha-response';
          hidden.name = 'h-captcha-response';
          form.appendChild(hidden);
        }
        hidden.value = token;
      },
      'expired-callback': () => {
        hcaptchaVerified = false;
        const hidden = document.getElementById('h-captcha-response');
        if (hidden) hidden.value = "";
        setMessage(t.errCaptchaExpired, 'error');
        window.hcaptcha.reset(hcaptchaWidgetId);
      },
      'error-callback': () => setMessage(t.errCaptchaTech, 'error')
    });
  };

  window.loadHCaptchaIfNeeded = () => {
    if (!rgpdCheck || !hcaptchaContainer) return;
    if (rgpdCheck.checked) {
      loadHCaptcha();
      if (isScriptLoaded && window.hcaptcha) setTimeout(renderHCaptcha, 100);
    } else {
      hcaptchaVerified = false;
      const hidden = document.getElementById('h-captcha-response');
      if (hidden) hidden.value = "";
      if (window.hcaptcha && hcaptchaWidgetId !== null) {
        window.hcaptcha.reset(hcaptchaWidgetId);
        hcaptchaWidgetId = null;
        hcaptchaContainer.innerHTML = '';
      }
    }
  };

  form?.addEventListener('submit', function(e) {
    e.preventDefault();
    setMessage('', 'success'); // Clear
    
    const token = document.getElementById('h-captcha-response')?.value || "";
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };

    let errorField = null;
    let errorMsg = '';

    // Validation
    if (!fields.name?.value.trim()) { errorField = fields.name; errorMsg = t.errCorrectField; }
    else if (!fields.email?.value.includes('@')) { errorField = fields.email; errorMsg = t.errCorrectField; }
    else if (!fields.subject?.value) { errorField = fields.subject; errorMsg = t.errSelectValue; }
    else if (!fields.message?.value.trim()) { errorField = fields.message; errorMsg = t.errCorrectField; }
    else if (!rgpdCheck?.checked) { errorField = rgpdCheck; errorMsg = t.errDataAccept; }
    else if (!hcaptchaVerified || token.length < 10) { errorField = hcaptchaContainer; errorMsg = t.errCaptchaValidate; }

    if (errorField) {
      setMessage(errorMsg, 'error');
      if (errorField.focus) errorField.focus();
      else errorField.setAttribute('tabindex', '-1'); errorField.focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = t.btnSending;
    btn.disabled = true;

    const formData = new FormData(form);
    formData.set('h-captcha-response', token);

    fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
      .then(res => res.text().then(txt => ({ status: res.status, ok: res.ok, txt, json: (() => { try { return JSON.parse(txt); } catch { return null; } })() })))
      .then(result => {
        if (result.ok && result.json?.success) {
          setMessage(t.successMsg, 'success');
          form.reset();
          hcaptchaVerified = false;
          if (window.hcaptcha && hcaptchaWidgetId !== null) {
            window.hcaptcha.reset(hcaptchaWidgetId);
            hcaptchaWidgetId = null;
            hcaptchaContainer.innerHTML = '';
          }
        } else {
          throw new Error(result.json?.errors?.[0]?.message || (result.txt.includes("activated") ? t.errFormNotActive : t.errSendGeneric + t.errCode + result.status));
        }
      })
      .catch(err => setMessage("❌ " + err.message, 'error'))
      .finally(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });

  /* ==========================================================================
     5. NAVIGATION & UTILS
     ========================================================================== */
  // Mobile Menu
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('mainNav');
  
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    mainNav?.classList.toggle('active');
  });

  mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Language Switcher (Preserve Theme)
  document.querySelectorAll('.lang-toggle-container a.flag-item').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') return; // Active lang
      const url = new URL(link.href, window.location.origin);
      url.searchParams.set('theme', body.getAttribute('data-theme') || 'light');
      link.href = url.toString();
    });
  });

  /* ==========================================================================
     6. PRINT FUNCTIONALITY
     ========================================================================== */
  let isPrinting = false;

  const handlePrint = (section) => {
    if (isPrinting || !section) return;
    isPrinting = true;

    const clone = section.cloneNode(true);
    clone.querySelectorAll('button, .no-print, script, style').forEach(el => el.remove());
    
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html><html lang="${pageLang}"><head><meta charset="UTF-8"><title>Print</title>
      <style>body{font-family:sans-serif;line-height:1.6;color:#000;padding:20px;font-size:12pt;background:#fff;}
      h2{border-bottom:2px solid #000;padding-bottom:10px;} h3,h4{page-break-after:avoid;} @media print{body{padding:0;}}</style>
      </head><body>${clone.innerHTML}</body></html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
        isPrinting = false;
      }, 2000);
    }, 500);
  };

  // Bind initial print buttons (static content)
  document.querySelectorAll('button[data-action="print"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePrint(btn.closest('section'));
    });
  });
});