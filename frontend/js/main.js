/**
 * CloudNova Control Center
 * Interaction logic (stable, non-jumping)
 */

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  /* =========================
     Utility helpers
     ========================= */

  function clearActive() {
    sections.forEach(s => s.classList.remove("active-section"));
    navLinks.forEach(l => l.classList.remove("active"));
  }

  function activateSection(section) {
    if (!section) return;

    clearActive();
    section.classList.add("active-section");

    const id = section.getAttribute("id");
    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }

  /* =========================
     Desktop: mouseover highlight
     ========================= */

  sections.forEach(section => {
    section.addEventListener("mouseenter", () => {
      activateSection(section);
    });
  });

  /* =========================
     Mobile: scroll-based highlight
     ========================= */

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activateSection(entry.target);
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* =========================
     Nav click behavior
     ========================= */

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.replace("#", "");
      const target = document.getElementById(id);
      if (target) activateSection(target);
    });
  });
});
const observerOptions = {
  root: null,
  threshold: 0.45,
};
