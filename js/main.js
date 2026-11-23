(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var header = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  // Solid header after scrolling
  function onScroll() {
    header.classList.toggle('is-solid', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Contact form (static site: opens the visitor's email client)
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  var TO = 'doanb5949@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    [form.name, form.email, form.message].forEach(function (f) {
      f.parentElement.classList.remove('has-error');
    });
    var bad = [];
    if (!name) bad.push(form.name);
    if (!emailOk) bad.push(form.email);
    if (!message) bad.push(form.message);

    if (bad.length) {
      bad.forEach(function (f) { f.parentElement.classList.add('has-error'); });
      bad[0].focus();
      note.textContent = 'Please complete all fields with a valid email address.';
      note.classList.add('is-error');
      return;
    }

    note.classList.remove('is-error');
    note.textContent = 'Opening your email app...';
    var subject = 'Website inquiry from ' + name;
    var body = message + '\n\n' + name + '\n' + email;
    window.location.href = 'mailto:' + TO +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
