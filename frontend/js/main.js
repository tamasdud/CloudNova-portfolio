/**
 * CloudNova Control Center
 * ------------------------
 * Handles all interactive behavior for the portfolio.
 * Clean, state-aware, accessible.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("CloudNova Control Center initialized");

  /* =========================
     Cache DOM elements
     ========================= */

  const sections = {
    overview: document.getElementById("overview"),
    skills: document.getElementById("skills"),
    projects: document.getElementById("projects"),
    architecture: document.getElementById("architecture"),
    devops: document.getElementById("devops"),
    about: document.getElementById("about"),
  };

  const navLinks = document.querySelectorAll("nav a");

  /* =========================
     Navigation click handling
     ========================= */

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* =========================
     Scroll-based section state
     ========================= */

  const observerOptions = {
    root: null,
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Reveal section
      entry.target.classList.add("visible");
      entry.target.classList.add("active-section");

      // Remove focus from others
      Object.values(sections).forEach(section => {
        if (section && section !== entry.target) {
          section.classList.remove("active-section");
        }
      });

      // Sync navigation
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    });
  }, observerOptions);

  Object.values(sections).forEach(section => {
    if (section) observer.observe(section);
  });

  /* =========================
     Keyboard navigation
     ========================= */

  const sectionOrder = Object.values(sections).filter(Boolean);
  let currentIndex = 0;

  document.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    event.preventDefault();

    if (event.key === "ArrowDown") {
      currentIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
    }

    if (event.key === "ArrowUp") {
      currentIndex = Math.max(currentIndex - 1, 0);
    }

    if (event.key === "Home") {
      currentIndex = 0;
    }

    if (event.key === "End") {
      currentIndex = sectionOrder.length - 1;
    }

    const targetSection = sectionOrder[currentIndex];
    targetSection.scrollIntoView({ behavior: "smooth" });
    targetSection.focus({ preventScroll: true });
  });
});
