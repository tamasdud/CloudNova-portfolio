/**
 * CloudNova Control Center
 * ------------------------
 * Single-source-of-truth section state.
 * Active section = closest to viewport center.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("CloudNova Control Center initialized");

  /* =========================
     Cache DOM elements
     ========================= */

  const sections = Array.from(document.querySelectorAll("main section"));
  const navLinks = Array.from(document.querySelectorAll("nav a"));

  if (!sections.length) return;

  let currentIndex = 0;

  /* =========================
     Active section resolver
     ========================= */

  function updateActiveSection() {
    const viewportCenter = window.innerHeight / 2;

    let closestSection = null;
    let smallestDistance = Infinity;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestSection = section;
      }
    });

    if (!closestSection) return;

    sections.forEach(section => {
      section.classList.toggle(
        "active-section",
        section === closestSection
      );

      section.classList.toggle(
        "visible",
        section.getBoundingClientRect().top < window.innerHeight
      );
    });

    const id = closestSection.id;

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });

    currentIndex = sections.indexOf(closestSection);
  }

  /* =========================
     Scroll handling
     ========================= */

  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateActiveSection);
  });

  updateActiveSection();

  /* =========================
     Navigation clicks
     ========================= */

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth" });
      target.focus({ preventScroll: true });
    });
  });

  /* =========================
     Keyboard navigation
     ========================= */

  document.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    event.preventDefault();

    if (event.key === "ArrowDown") {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    }

    if (event.key === "ArrowUp") {
      currentIndex = Math.max(currentIndex - 1, 0);
    }

    if (event.key === "Home") {
      currentIndex = 0;
    }

    if (event.key === "End") {
      currentIndex = sections.length - 1;
    }

    const target = sections[currentIndex];
    target.scrollIntoView({ behavior: "smooth" });
    target.focus({ preventScroll: true });
  });
});
