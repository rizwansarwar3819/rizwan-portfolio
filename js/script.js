// ============================================
// Rizwan — Personal Portfolio
// script.js (simple, beginner-friendly version)
// ============================================

// Wait until the whole HTML page has loaded before running any code
document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     1. Dark / Light mode toggle (all pages)
     ============================================ */
  var themeButton = document.querySelector('.theme-toggle');
  var htmlTag = document.documentElement;

  // Check if the user already picked a theme last time (saved in the browser)
  var savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    htmlTag.setAttribute('data-theme', 'light');
    if (themeButton) {
      themeButton.textContent = '☀️';
    }
  }

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var currentTheme = htmlTag.getAttribute('data-theme');

      if (currentTheme === 'light') {
        // Currently light, so switch back to dark
        htmlTag.removeAttribute('data-theme');
        themeButton.textContent = '🌙';
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        // Currently dark, so switch to light
        htmlTag.setAttribute('data-theme', 'light');
        themeButton.textContent = '☀️';
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }

  /* ============================================
     2. Hamburger menu (mobile navigation, all pages)
     ============================================ */
  var hamburgerBtn = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-links');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open');
    });

    // Close the menu automatically once a link is clicked (nice on mobile)
    var allNavLinks = navMenu.querySelectorAll('a');
    for (var i = 0; i < allNavLinks.length; i++) {
      allNavLinks[i].addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
      });
    }
  }

  /* ============================================
     3. Typing effect in the homepage terminal box
     ============================================ */
  var typedOutput = document.getElementById('typed-output');

  if (typedOutput) {
    var phrases = [
      'Information Security student',
      'Networking & Flask enthusiast',
      'Curious about how systems break (and how to fix them)'
    ];

    var phraseNumber = 0;    // which phrase from the list we are showing
    var letterCount = 0;     // how many letters of it are shown right now
    var isDeleting = false;  // true = we are erasing, false = we are typing

    function typeEffect() {
      var currentPhrase = phrases[phraseNumber];

      if (isDeleting) {
        letterCount = letterCount - 1;
      } else {
        letterCount = letterCount + 1;
      }

      // Show only the first "letterCount" letters of the phrase
      typedOutput.textContent = currentPhrase.substring(0, letterCount);

      var speed = isDeleting ? 40 : 60; // deleting is a little faster than typing

      // Finished typing the whole phrase? Wait, then start deleting it
      if (!isDeleting && letterCount === currentPhrase.length) {
        isDeleting = true;
        speed = 1200;
      }

      // Finished deleting? Move on to the next phrase in the list
      if (isDeleting && letterCount === 0) {
        isDeleting = false;
        phraseNumber = phraseNumber + 1;
        if (phraseNumber === phrases.length) {
          phraseNumber = 0; // start again from the first phrase
        }
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  /* ============================================
     4. Accordion (Skills page)
     ============================================ */
  var accordionButtons = document.querySelectorAll('.accordion-trigger');

  for (var a = 0; a < accordionButtons.length; a++) {
    accordionButtons[a].addEventListener('click', function () {
      var clickedButton = this;
      var panelId = clickedButton.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      var wasAlreadyOpen = clickedButton.getAttribute('aria-expanded') === 'true';

      // Step 1: close every panel first
      for (var b = 0; b < accordionButtons.length; b++) {
        accordionButtons[b].setAttribute('aria-expanded', 'false');
        var otherPanelId = accordionButtons[b].getAttribute('aria-controls');
        document.getElementById(otherPanelId).style.maxHeight = null;
      }

      // Step 2: if the clicked panel was closed, open it now
      if (!wasAlreadyOpen) {
        clickedButton.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  /* ============================================
     5. Contact form validation (Contact page)
     ============================================ */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var subjectInput = document.getElementById('subject');
    var messageInput = document.getElementById('message');
    var statusBox = document.getElementById('form-status');

    // Simple email check: text must have an "@", then later a "." with
    // at least one character after it. No regex needed.
    function looksLikeEmail(value) {
      var atPosition = value.indexOf('@');
      var dotPosition = value.lastIndexOf('.');
      var hasAt = atPosition > 0;
      var hasDotAfterAt = dotPosition > atPosition + 1;
      var hasTextAfterDot = dotPosition < value.length - 1;
      return hasAt && hasDotAfterAt && hasTextAfterDot;
    }

    function checkName() {
      var isOk = nameInput.value.trim().length >= 2;
      nameInput.closest('.form-group').classList.toggle('invalid', !isOk);
      return isOk;
    }

    function checkEmail() {
      var isOk = looksLikeEmail(emailInput.value.trim());
      emailInput.closest('.form-group').classList.toggle('invalid', !isOk);
      return isOk;
    }

    function checkSubject() {
      var isOk = subjectInput.value.trim().length >= 3;
      subjectInput.closest('.form-group').classList.toggle('invalid', !isOk);
      return isOk;
    }

    function checkMessage() {
      var isOk = messageInput.value.trim().length >= 10;
      messageInput.closest('.form-group').classList.toggle('invalid', !isOk);
      return isOk;
    }

    // Check each field live, while typing and when leaving the field
    nameInput.addEventListener('input', checkName);
    nameInput.addEventListener('blur', checkName);
    emailInput.addEventListener('input', checkEmail);
    emailInput.addEventListener('blur', checkEmail);
    subjectInput.addEventListener('input', checkSubject);
    subjectInput.addEventListener('blur', checkSubject);
    messageInput.addEventListener('input', checkMessage);
    messageInput.addEventListener('blur', checkMessage);

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // stop the page from reloading / submitting anywhere

      var nameOk = checkName();
      var emailOk = checkEmail();
      var subjectOk = checkSubject();
      var messageOk = checkMessage();

      if (nameOk && emailOk && subjectOk && messageOk) {
        statusBox.textContent = '✓ Message sent! (Demo only — no backend is connected, as required for this static-site assignment.)';
        statusBox.className = 'form-status show success';
        contactForm.reset();
      } else {
        statusBox.textContent = '✗ Please fix the highlighted fields above.';
        statusBox.className = 'form-status show';
        statusBox.style.background = 'rgba(229,72,77,0.1)';
        statusBox.style.color = 'var(--danger)';
        statusBox.style.border = '1px solid rgba(229,72,77,0.3)';
      }
    });
  }

  /* ============================================
     Footer year (small extra touch)
     ============================================ */
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
