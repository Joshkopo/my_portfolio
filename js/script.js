/* ================================
     SMOOTH SCROLLING SYSTEM
     Handles heavy smooth scrolling
  ==================================*/
class SmoothScroll {
  constructor() {
    this.scrollElement = document.getElementById("smooth-content");

    // Scrolling properties
    this.targetY = 0;
    this.currentY = 0;
    this.ease = 0.08; // Adjust for heaviness (lower = heavier)
    this.isScrolling = false;
    this.scrollTimeout = null;

    // Get total scrollable height
    this.maxScroll = this.scrollElement.scrollHeight - window.innerHeight;

    // Bind events and start
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    /* Mouse wheel scrolling with momentum */
    window.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = e.deltaY * 1.2; // heaviness multiplier
        this.targetY += delta;
        this.targetY = Math.max(0, Math.min(this.maxScroll, this.targetY));
        this.isScrolling = true;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
        }, 100);
      },
      { passive: false }
    );

    /* Touch scrolling for mobile devices */
    let touchStartY = 0;
    window.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        const touchDeltaY = touchStartY - e.touches[0].clientY;
        this.targetY += touchDeltaY * 2;
        this.targetY = Math.max(0, Math.min(this.maxScroll, this.targetY));
        touchStartY = e.touches[0].clientY;
        this.isScrolling = true;
      },
      { passive: false }
    );

    window.addEventListener("touchend", () => {
      setTimeout(() => (this.isScrolling = false), 150);
    });

    /* Keyboard navigation (Arrow keys, Home/End, Space) */
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
        case " ":
          e.preventDefault();
          this.targetY += window.innerHeight * 0.8;
          break;
        case "ArrowUp":
          e.preventDefault();
          this.targetY -= window.innerHeight * 0.8;
          break;
        case "Home":
          e.preventDefault();
          this.targetY = 0;
          break;
        case "End":
          e.preventDefault();
          this.targetY = this.maxScroll;
          break;
      }
      this.targetY = Math.max(0, Math.min(this.maxScroll, this.targetY));
    });

    /* Window resize (recalculate scroll area) */
    window.addEventListener("resize", () => {
      this.maxScroll = this.scrollElement.scrollHeight - window.innerHeight;
    });
  }

  render() {
    // Smooth interpolation (easing)
    const diff = this.targetY - this.currentY;
    this.currentY += diff * this.ease;

    // Apply transform to smooth-content
    this.scrollElement.style.transform = `translate3d(0, -${this.currentY}px, 0)`;

    // Loop continuously
    requestAnimationFrame(() => this.render());
  }
}

/* ================================
     SCROLL ANIMATIONS (Fade-in)
     Uses IntersectionObserver
  ==================================*/
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -280px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

/* ================================
     INITIALIZATION ON DOM LOAD
  ==================================*/
document.addEventListener("DOMContentLoaded", () => {
  // Start custom smooth scroll
  new SmoothScroll();

  // Apply animations on scroll
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));
});

/* Prevent default browser scrolling */
document.addEventListener("wheel", (e) => e.preventDefault(), {
  passive: false,
});

/* ================================
     BOOTSTRAP TOOLTIPS INITIALIZATION
  ==================================*/
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});

/* ================================
     PRELOADER & HOME ANIMATIONS
  ==================================*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Fade out after 4.5s
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
      startHomeAnimations(); // trigger home section
    }, 800);
  }, 4500);
});

// Safety fallback: hide preloader after 6s
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
      startHomeAnimations();
    }, 800);
  }
}, 6000);

/* HOME SECTION ANIMATIONS */
function startHomeAnimations() {
  const secondCol = document.querySelector(".second-col");
  const role = document.querySelector(".role");
  const title = document.querySelector("#home h2");
  const tagline = document.querySelector(".tagline");
  const buttonsContainer = document.querySelector(".buttons-container");
  const buttons = document.querySelectorAll(".btn");
  const image = document.querySelector(".image-box img");
  const imageWrapper = document.querySelector(".image-wrapper");

  // Animate column
  if (secondCol) {
    setTimeout(() => secondCol.classList.add("animate-second-col"), 100);
  }

  // Animate image
  if (image) {
    setTimeout(() => image.classList.add("animate-image"), 300);
  }

  // Animate role with line effect
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

  // Animate image wrapper
  if (imageWrapper) {
    setTimeout(() => imageWrapper.classList.add("animate-wrapper"), 200);
  }

  // Animate title
  if (title) {
    setTimeout(() => title.classList.add("animate-title"), 900);
  }

  // Animate tagline with shimmer
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

  // Animate button container
  if (buttonsContainer) {
    setTimeout(() => buttonsContainer.classList.add("animate-buttons"), 1700);
  }

  // Animate buttons individually
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add(index === 0 ? "animate-btn-1" : "animate-btn-2");
    }, 1800 + index * 200);
  });
}
