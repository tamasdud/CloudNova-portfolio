/**
 * CloudNova Control Center
 * ------------------------
 * This file will handle all interactive behavior
 * for the portfolio control center.
 *
 * Current stage:
 * - Structure only
 * - No dynamic logic yet
 * - Prepared for future AWS & API integration
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("CloudNova Control Center initialized");

  // Cache DOM elements
  const sections = {
    overview: document.getElementById("overview"),
    skills: document.getElementById("skills"),
    projects: document.getElementById("projects"),
    architecture: document.getElementById("architecture"),
    devops: document.getElementById("devops"),
    about: document.getElementById("about"),
  };

  // Navigation links (future use)
  const navLinks = document.querySelectorAll("nav a");

  // Placeholder for future features
  // - section highlighting
  // - panel transitions
  // - live data updates
    // Handle navigation click state
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
  // Sync navigation with scroll position
  const observerOptions = {
    root: null,
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  Object.values(sections).forEach(section => {
    if (section) observer.observe(section);
  });

});
