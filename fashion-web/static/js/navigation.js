// Navigation functionality for Fashion Pentagram
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  setupGlobalSearch();
});

function initializeNavigation() {
  // Set active navigation item based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      (currentPath === href || (currentPath === "/" && href === "/home"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Handle dropdown active states
  if (currentPath.startsWith("/category/") || currentPath === "/products") {
    const dropdown = document.querySelector(".nav-link.dropdown-toggle");
    if (dropdown) {
      dropdown.classList.add("active");
    }

    // Set active dropdown item
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      const href = item.getAttribute("href");
      if (href && currentPath === href) {
        item.classList.add("active");
      }
    });
  }
}

function setupGlobalSearch() {
  const searchInput = document.getElementById("globalSearch");
  if (!searchInput) return;

  let searchTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();

    if (query.length < 2) return;

    searchTimeout = setTimeout(() => {
      performGlobalSearch(query);
    }, 500);
  });

  // Handle Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      if (query) {
        performGlobalSearch(query);
      }
    }
  });
}

function performGlobalSearch(query) {
  // Redirect to products page with search
  window.location.href = `/products?search=${encodeURIComponent(query)}`;
}

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Mobile menu handling
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener("click", () => {
    navbarCollapse.classList.toggle("show");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navbarToggler.contains(e.target) &&
      !navbarCollapse.contains(e.target)
    ) {
      navbarCollapse.classList.remove("show");
    }
  });
}

// Global utility functions
window.showToast = (message, type = "info") => {
  const toastHtml = `
        <div class="toast align-items-center text-white bg-${
          type === "error" ? "danger" : type === "success" ? "success" : "info"
        } border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${
                      type === "error"
                        ? "exclamation-circle"
                        : type === "success"
                        ? "check-circle"
                        : "info-circle"
                    } me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  toastContainer.insertAdjacentHTML("beforeend", toastHtml);

  const toastElement = toastContainer.lastElementChild;
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000,
  });
  toast.show();

  toastElement.addEventListener("hidden.bs.toast", function () {
    this.remove();
  });
};
