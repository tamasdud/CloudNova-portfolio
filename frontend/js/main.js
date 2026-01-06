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

  const navLinks = document.querySelectorAll("nav a");

  // Handle navigation click state
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Sync navigation + section visibility with scroll
  const observerOptions = {
    root: null,
    threshold: 0.6,
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("active-section");

          Object.values(sections).forEach(section => {
            if (section && section !== entry.target) {
              section.classList.remove("active-section");
            }
          });

          const id = entry.target.getAttribute("id");

          navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    observerOptions
  );

  Object.values(sections).forEach(section => {
    if (section) observer.observe(section);
  });

  // Keyboard navigation (NOW sections exists)
  const sectionOrder = Object.values(sections).filter(Boolean);
  let currentIndex = 0;

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      currentIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
      sectionOrder[currentIndex].focus({ preventScroll: true });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
      sectionOrder[currentIndex].focus({ preventScroll: true });
    }

    if (event.key === "Home") {
      event.preventDefault();
      currentIndex = 0;
      sectionOrder[0].scrollIntoView({ behavior: "smooth" });
      sectionOrder[currentIndex].focus({ preventScroll: true });
    }

    if (event.key === "End") {
      event.preventDefault();
      currentIndex = sectionOrder.length - 1;
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
      sectionOrder[currentIndex].focus({ preventScroll: true });
    }
  });
});
  // Keyboard navigation between sections
  const sectionOrder = Object.values(sections).filter(Boolean);

  let currentIndex = 0;

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      currentIndex = Math.min(currentIndex + 1, sectionOrder.length - 1);
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
    }

    if (event.key === "Home") {
      event.preventDefault();
      currentIndex = 0;
      sectionOrder[0].scrollIntoView({ behavior: "smooth" });
    }

    if (event.key === "End") {
      event.preventDefault();
      currentIndex = sectionOrder.length - 1;
      sectionOrder[currentIndex].scrollIntoView({ behavior: "smooth" });
    }
  });
