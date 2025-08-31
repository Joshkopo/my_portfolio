/* ================================
   SCROLL ANIMATIONS (IntersectionObserver)
==================================*/
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -200px 0px" }
);

/* ================================
   DOM INITIALIZATION
==================================*/
document.addEventListener("DOMContentLoaded", () => {
  // Apply scroll animations
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => scrollObserver.observe(el));

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});

/* ================================
   PRELOADER & HOME ANIMATIONS
==================================*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    // Fade out after 4.5s
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
        startHomeAnimations();
      }, 800);
    }, 4500);

    // Safety fallback after 6s
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
        startHomeAnimations();
      }, 800);
    }, 6000);
  } else {
    startHomeAnimations(); // Run immediately if no preloader
  }
});

/* ================================
   HOME SECTION ANIMATIONS
==================================*/
function startHomeAnimations() {
  const secondCol = document.querySelector(".second-col");
  const role = document.querySelector(".role");
  const title = document.querySelector("#home h2");
  const tagline = document.querySelector(".tagline");
  const buttonsContainer = document.querySelector(".buttons-container");
  const buttons = document.querySelectorAll(".btn");
  const image = document.querySelector(".image-box img");
  const imageWrapper = document.querySelector(".image-wrapper");

  if (secondCol)
    setTimeout(() => secondCol.classList.add("animate-second-col"), 100);
  if (image) setTimeout(() => image.classList.add("animate-image"), 300);
  if (imageWrapper)
    setTimeout(() => imageWrapper.classList.add("animate-wrapper"), 200);

  if (role) {
    setTimeout(() => {
      role.classList.add("animate-role");
      setTimeout(() => {
        const style = document.createElement("style");
        style.textContent = `.role::after { animation: lineExpand 0.8s ease-out forwards; }`;
        document.head.appendChild(style);
      }, 800);
    }, 600);
  }

  if (title) setTimeout(() => title.classList.add("animate-title"), 900);

  if (tagline) {
    setTimeout(() => {
      tagline.classList.add("animate-tagline");
      setTimeout(() => {
        const style = document.createElement("style");
        style.textContent = `.tagline::before { animation: shimmer 2s infinite; }`;
        document.head.appendChild(style);
      }, 800);
    }, 1500);
  }

  if (buttonsContainer)
    setTimeout(() => buttonsContainer.classList.add("animate-buttons"), 1700);

  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add(index === 0 ? "animate-btn-1" : "animate-btn-2");
    }, 1800 + index * 200);
  });
}
