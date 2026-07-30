/**

 * Elyce WMS v4.3 — Landing editorial (GSAP + whitelist Supabase + Fase 1)

 */

(function () {

  'use strict';



  var SUPABASE_URL = 'https://ujmzpgcvxpcqmjemlnan.supabase.co';

  var SUPABASE_KEY = 'sb_publishable_5eVcO5pf0UND4D1-f1iu8A_EfDYiULA';



  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-reveal');
  document.documentElement.classList.toggle('reduce-motion', prefersReduced);



  /* Nav móvil */

  var toggle = document.querySelector('.nav-toggle');

  var mobileNav = document.querySelector('.nav-mobile');



  function setMobileNavOpen(open) {

    if (!mobileNav || !toggle) return;

    mobileNav.classList.toggle('open', open);

    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    document.body.classList.toggle('nav-open', open);

  }



  if (toggle && mobileNav) {

    toggle.addEventListener('click', function () {

      setMobileNavOpen(!mobileNav.classList.contains('open'));

    });

    mobileNav.querySelectorAll('a').forEach(function (link) {

      link.addEventListener('click', function () {

        setMobileNavOpen(false);

      });

    });

    document.addEventListener('keydown', function (e) {

      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {

        setMobileNavOpen(false);

      }

    });

  }



  /* Barra progreso lectura */

  var progressBar = document.querySelector('.read-progress-bar');

  function updateReadProgress() {

    if (!progressBar) return;

    var doc = document.documentElement;

    var scrollTop = doc.scrollTop || document.body.scrollTop;

    var height = doc.scrollHeight - doc.clientHeight;

    var pct = height > 0 ? (scrollTop / height) * 100 : 0;

    progressBar.style.width = pct + '%';

  }



  /* Header scroll + nav activo */

  var header = document.getElementById('site-header');

  var navLinks = document.querySelectorAll('.nav-desktop a[data-nav]');

  var sections = [];



  navLinks.forEach(function (link) {

    var id = link.getAttribute('data-nav');

    var section = document.getElementById(id);

    if (section) sections.push({ id: id, el: section, link: link });

  });



  var stickyCta = document.getElementById('sticky-cta');

  var stickyDismiss = document.getElementById('sticky-cta-dismiss');

  var heroSection = document.getElementById('hero');

  var whitelistSection = document.getElementById('whitelist');

  var stickyDismissed = false;



  if (stickyDismiss) {

    stickyDismiss.addEventListener('click', function () {

      stickyDismissed = true;

      if (stickyCta) {

        stickyCta.classList.remove('is-visible');

        stickyCta.hidden = true;

        document.body.classList.remove('has-sticky-cta');

      }

    });

  }



  function updateStickyCta() {

    if (!stickyCta || stickyDismissed || window.innerWidth > 768) {

      if (stickyCta) {

        stickyCta.classList.remove('is-visible');

        stickyCta.hidden = true;

        document.body.classList.remove('has-sticky-cta');

      }

      return;

    }



    var y = window.scrollY;

    var heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 400;

    var inWhitelist = false;

    if (whitelistSection) {

      var rect = whitelistSection.getBoundingClientRect();

      inWhitelist = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;

    }



    var show = y > heroBottom - 120 && !inWhitelist;

    stickyCta.classList.toggle('is-visible', show);

    stickyCta.hidden = !show;

    document.body.classList.toggle('has-sticky-cta', show);

  }



  function onScroll() {

    if (header) {

      header.classList.toggle('is-scrolled', window.scrollY > 24);

    }



    updateReadProgress();

    updateStickyCta();



    if (!sections.length) return;

    var scrollPos = window.scrollY + (header ? header.offsetHeight + 40 : 80);

    var current = sections[0].id;



    sections.forEach(function (item) {

      if (item.el.offsetTop <= scrollPos) {

        current = item.id;

      }

    });



    navLinks.forEach(function (link) {

      link.classList.toggle('is-active', link.getAttribute('data-nav') === current);

    });

  }



  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('resize', onScroll, { passive: true });

  onScroll();



  /* FAQ acordeón */

  document.querySelectorAll('.faq-question').forEach(function (btn) {

    btn.addEventListener('click', function () {

      var item = btn.closest('.faq-item');

      var wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (el) {

        el.classList.remove('open');

        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');

      });

      if (!wasOpen) {

        item.classList.add('open');

        btn.setAttribute('aria-expanded', 'true');

      }

    });

  });



  /* Whitelist — envío compartido */

  var whitelistForm = document.getElementById('whitelist-form');
  var heroEmailBridge = document.getElementById('hero-email-bridge');
  var heroEmailInput = document.getElementById('hero-email-input');
  var formSuccess = document.getElementById('whitelist-success');
  var formError = document.getElementById('whitelist-error');
  var submitBtn = document.getElementById('whitelist-submit');
  var emailMain = document.getElementById('whitelist-email');
  var nombreMain = document.getElementById('whitelist-nombre');
  var prefillBanner = document.getElementById('whitelist-prefill-banner');
  var formWrap = document.querySelector('.whitelist-form-wrap');
  var cameFromHeroBridge = false;



  function hideFormMessages() {
    if (formSuccess) formSuccess.hidden = true;
    if (formError) formError.hidden = true;
  }



  function showFormSuccess(text) {

    hideFormMessages();

    if (formSuccess) {

      formSuccess.textContent = text;

      formSuccess.hidden = false;

    }

  }



  function showFormError(text) {

    hideFormMessages();

    if (formError) {

      formError.textContent = text;

      formError.hidden = false;

    }

  }



  function scrollToWhitelistForm(prefillEmail) {
    if (prefillEmail && emailMain) {
      emailMain.value = prefillEmail;
      cameFromHeroBridge = true;
    }
    if (prefillBanner) prefillBanner.hidden = false;
    if (formWrap) {
      formWrap.classList.add('is-highlight');
      setTimeout(function () {
        formWrap.classList.remove('is-highlight');
      }, 2400);
    }
    if (whitelistSection) {
      whitelistSection.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
    var focusTarget = nombreMain && !nombreMain.value.trim() ? nombreMain : emailMain;
    if (focusTarget) {
      setTimeout(function () {
        focusTarget.focus({ preventScroll: true });
      }, prefersReduced ? 0 : 450);
    }
  }

  function payloadFromForm(form) {

    var fd = new FormData(form);

    var email = String(fd.get('email') || '').trim().toLowerCase();

    var nombre = String(fd.get('nombre') || '').trim();

    if (!nombre && email) {

      var local = email.split('@')[0] || 'Contacto';

      nombre = local.replace(/[._-]+/g, ' ').replace(/\b\w/g, function (c) {

        return c.toUpperCase();

      });

    }

    return {

      nombre: nombre,

      email: email,

      empresa: String(fd.get('empresa') || '').trim() || null,

      telefono: String(fd.get('telefono') || '').trim() || null,

      rubro: String(fd.get('rubro') || '').trim() || null,

      mensaje: String(fd.get('mensaje') || '').trim() || null,
      origen: cameFromHeroBridge ? 'experiencia_hero' : 'experiencia'
    };

  }



  function validatePayload(payload, fullForm) {

    if (!payload.nombre || !payload.email) {

      return 'Nombre y correo son obligatorios.';

    }

    if (fullForm && (!payload.empresa || !payload.telefono || !payload.rubro)) {

      return 'Empresa, teléfono y rubro son obligatorios.';

    }

    return null;

  }



  function clearFieldErrors(form) {

    if (!form) return;

    form.querySelectorAll('.whitelist-field.is-invalid').forEach(function (field) {

      field.classList.remove('is-invalid');

      var err = field.querySelector('.whitelist-field-error');

      if (err) err.textContent = '';

    });

  }



  function markFieldErrors(form) {

    if (!form || form !== whitelistForm) return false;

    clearFieldErrors(form);

    var ok = true;

    var rules = [

      { name: 'nombre', msg: 'Ingresa tu nombre.' },

      { name: 'email', msg: 'Ingresa un correo válido.' },

      { name: 'empresa', msg: 'Ingresa el nombre de tu empresa.' },

      { name: 'telefono', msg: 'Ingresa un teléfono de contacto.' },

      { name: 'rubro', msg: 'Selecciona un rubro.' }

    ];



    rules.forEach(function (rule) {

      var input = form.querySelector('[name="' + rule.name + '"]');

      if (!input) return;

      var val = String(input.value || '').trim();

      var invalid = !val || (rule.name === 'email' && input.validity && !input.validity.valid);

      if (invalid) {

        ok = false;

        var field = input.closest('.whitelist-field');

        if (field) {

          field.classList.add('is-invalid');

          var errEl = field.querySelector('.whitelist-field-error');

          if (errEl) errEl.textContent = rule.msg;

        }

      }

    });



    if (!ok) {

      var firstBad = form.querySelector('.whitelist-field.is-invalid input, .whitelist-field.is-invalid select');

      if (firstBad) firstBad.focus();

    }

    return ok;

  }



  function submitWhitelist(form, btn, onDone) {

    hideFormMessages();



    if (typeof supabase === 'undefined') {

      var err = 'No pudimos conectar. Intenta de nuevo en unos minutos.';

      if (onDone) onDone(err, true);

      else showFormError(err);

      return;

    }



    var payload = payloadFromForm(form);

    var isFull = form === whitelistForm;

    if (isFull && !markFieldErrors(form)) {

      showFormError('Revisa los campos marcados en rojo.');

      return;

    }

    var validationErr = validatePayload(payload, isFull);

    if (validationErr) {

      if (onDone) onDone(validationErr, true);

      else showFormError(validationErr);

      return;

    }



    if (btn) {

      btn.disabled = true;

    }



    var client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    client

      .from('whitelist_landing')

      .insert(payload)

      .then(function (result) {

        if (result.error) {

          var msg = result.error.message || '';

          if (result.error.code === '23505' || msg.indexOf('duplicate') !== -1 || msg.indexOf('unique') !== -1) {

            if (onDone) onDone('Este correo ya está en la lista. Te avisaremos cuando abramos cupos.', false);

            else showFormError('Este correo ya está en la lista de espera. Te avisaremos cuando abramos cupos.');

          } else {

            if (onDone) onDone('No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.', true);

            else showFormError('No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos.');

          }

          return;

        }

        form.reset();
        clearFieldErrors(form);
        cameFromHeroBridge = false;
        if (prefillBanner) prefillBanner.hidden = true;

        var ok = '¡Listo! Te avisaremos cuando abramos cupos de early access o piloto.';

        if (onDone) onDone(ok, false);

        else showFormSuccess(ok);

      })

      .catch(function () {

        if (onDone) onDone('Error de conexión. Revisa tu internet e intenta de nuevo.', true);

        else showFormError('Error de conexión. Revisa tu internet e intenta de nuevo.');

      })

      .finally(function () {

        if (btn) {

          btn.disabled = false;

          if (btn === submitBtn) btn.textContent = 'Unirme a la lista de espera';

        }

      });

  }



  if (whitelistForm) {

    whitelistForm.addEventListener('submit', function (e) {

      e.preventDefault();

      if (submitBtn) submitBtn.textContent = 'Enviando…';

      submitWhitelist(whitelistForm, submitBtn, null);

    });



    whitelistForm.querySelectorAll('input, select, textarea').forEach(function (el) {

      el.addEventListener('input', function () {

        var field = el.closest('.whitelist-field');

        if (field && field.classList.contains('is-invalid')) {

          field.classList.remove('is-invalid');

          var err = field.querySelector('.whitelist-field-error');

          if (err) err.textContent = '';

        }

      });

    });

  }



  if (heroEmailBridge) {
    heroEmailBridge.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = heroEmailInput ? String(heroEmailInput.value || '').trim().toLowerCase() : '';
      if (email && heroEmailInput && heroEmailInput.validity && !heroEmailInput.validity.valid) {
        heroEmailInput.focus();
        return;
      }
      scrollToWhitelistForm(email);
    });
  }

  document.querySelectorAll('a[href="#whitelist"]').forEach(function (link) {
    if (link.closest('#hero-email-bridge')) return;
    link.addEventListener('click', function () {
      cameFromHeroBridge = false;
    });
  });

  if (prefersReduced) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;



  gsap.registerPlugin(ScrollTrigger);



  /* Hero entrance */

  var heroCopy = document.querySelector('.hero-v4-copy');

  var heroVisual = document.querySelector('.hero-v4-visual');



  if (heroCopy) {

    gsap.to(heroCopy.children, {

      y: 0,

      opacity: 1,

      duration: 0.75,

      stagger: 0.09,

      ease: 'power3.out',

      delay: 0.15

    });

  }



  if (heroVisual) {

    gsap.to(heroVisual, {

      y: 0,

      opacity: 1,

      duration: 0.9,

      ease: 'power3.out',

      delay: 0.3

    });

  }



  if (window.innerWidth > 768) {

    var heroBgImg = document.querySelector('.hero-v4-bg img');

    if (heroBgImg) {

      gsap.to(heroBgImg, {

        y: -20,

        ease: 'none',

        scrollTrigger: {

          trigger: '#hero',

          start: 'top top',

          end: 'bottom top',

          scrub: true

        }

      });

    }

  }



  /* Reveals genéricos */

  gsap.utils.toArray('.reveal-item').forEach(function (el) {

    if (el.closest('#hero')) return;

    gsap.to(el, {

      scrollTrigger: {

        trigger: el,

        start: 'top 88%',

        once: true

      },

      y: 0,

      opacity: 1,

      duration: 0.7,

      ease: 'power2.out'

    });

  });



  gsap.utils.toArray('.section-header').forEach(function (headerEl) {

    gsap.from(headerEl, {

      scrollTrigger: {

        trigger: headerEl,

        start: 'top 85%',

        once: true

      },

      y: 28,

      opacity: 0,

      duration: 0.65,

      ease: 'power2.out'

    });

  });



  /* Métricas count-up */

  document.querySelectorAll('.metrica-v4-value[data-count]').forEach(function (el) {

    var target = parseInt(el.getAttribute('data-count'), 10);

    var prefix = el.getAttribute('data-prefix') || '';

    var suffix = el.getAttribute('data-suffix') || '';

    var obj = { val: 0 };



    gsap.to(obj, {

      val: target,

      duration: 1.8,

      ease: 'power2.out',

      scrollTrigger: {

        trigger: el.closest('.metricas-v4'),

        start: 'top 80%',

        once: true

      },

      onUpdate: function () {

        el.textContent = prefix + Math.round(obj.val) + suffix;

      }

    });

  });



  /* Pasos — parallax sutil en imágenes (solo desktop) */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.paso-media img').forEach(function (img) {
      gsap.to(img, {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.paso'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }



  var resizeTimer;

  window.addEventListener('resize', function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {

      ScrollTrigger.refresh();

      updateStickyCta();

    }, 200);

  });



  window.addEventListener('load', function () {

    ScrollTrigger.refresh();

    updateReadProgress();

  });

})();


