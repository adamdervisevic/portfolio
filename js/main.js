// ===== Modern portfolio — vanilla JS =====
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  // Sticky nav background on scroll
  function onScroll() {
    if (window.scrollY > 30) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile menu
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  });

  // Active link highlighting
  var sections = document.querySelectorAll("section[id]");
  var linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
    linkMap[a.getAttribute("href").slice(1)] = a;
  });

  var spy = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.values(linkMap).forEach(function (l) {
            l.classList.remove("active");
          });
          var link = linkMap[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (s) {
    spy.observe(s);
  });

  // Reveal on scroll
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  // Animated counters
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-num"), 10) || 0;
    var start = 0;
    var duration = 1400;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".num[data-num]").forEach(function (el) {
    countObserver.observe(el);
  });

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
