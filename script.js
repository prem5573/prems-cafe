(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuPanels = document.querySelectorAll(".menu-panel");
  const orderForm = document.querySelector(".order-form");
  const formStatus = document.getElementById("form-status");

  // Header shadow on scroll
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Mobile navigation
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open", !expanded);
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      });
    });
  }

  // Drink menu tabs
  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const target = tab.dataset.tab;

      menuTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      menuPanels.forEach(function (panel) {
        const isActive = panel.id === "panel-" + target;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });

  // Pickup order form (demo)
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = orderForm.querySelector("#name").value.trim();
      if (!name) return;

      formStatus.textContent = "Thanks, " + name + "! We'll confirm your order shortly.";
      formStatus.classList.add("success");
      orderForm.reset();

      setTimeout(function () {
        formStatus.textContent = "";
        formStatus.classList.remove("success");
      }, 5000);
    });
  }

  // Subtle fade-in on scroll
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".pastry-card, .featured-card, .cake-item").forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
})();
