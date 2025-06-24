// Category-specific functionality - Visual Fashion Platform
document.addEventListener("DOMContentLoaded", () => {
  // Only run on category pages
  if (!window.location.pathname.startsWith("/category/")) return;

  const category = getCategoryFromUrl();
  if (category) {
    initializeCategoryPage(category);
  }
});

function getCategoryFromUrl() {
  const path = window.location.pathname;
  const matches = path.match(/\/category\/(.+)/);
  return matches ? decodeURIComponent(matches[1]) : "";
}

function initializeCategoryPage(category) {
  updatePageMetadata(category);
  loadCategoryProducts(category);
}

function updatePageMetadata(category) {
  const categoryInfo = getCategoryInfo(category);

  // Update document title
  document.title = `${categoryInfo.name} - Fashion Pentagram`;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", categoryInfo.description);
  }

  // Update page elements
  const titleElement = document.getElementById("categoryTitle");
  const descriptionElement = document.getElementById("categoryDescription");
  const breadcrumbElement = document.getElementById("categoryBreadcrumb");
  const iconElement = document.getElementById("categoryIcon");

  if (titleElement) titleElement.textContent = categoryInfo.name;
  if (descriptionElement)
    descriptionElement.textContent = categoryInfo.description;
  if (breadcrumbElement) breadcrumbElement.textContent = categoryInfo.name;
  if (iconElement)
    iconElement.className = categoryInfo.icon + " fa-5x opacity-50";
}

function getCategoryInfo(category) {
  const categoryMap = {
    Pakaian: {
      name: "Pakaian",
      description:
        "Koleksi visual pakaian trendy dan berkualitas untuk berbagai acara dan gaya hidup",
      icon: "fas fa-tshirt",
    },
    Aksesoris: {
      name: "Aksesoris",
      description:
        "Visual aksesoris premium dan elegan untuk melengkapi dan mempercantik penampilan",
      icon: "fas fa-gem",
    },
    Parfum: {
      name: "Parfum",
      description:
        "Koleksi visual parfum eksklusif dengan inspirasi wangi yang memikat",
      icon: "fas fa-spray-can",
    },
    Desain: {
      name: "Desain",
      description:
        "Inspirasi desain kreatif dan produk visual untuk kebutuhan desain Anda",
      icon: "fas fa-palette",
    },
  };

  return (
    categoryMap[category] || {
      name: category,
      description: `Jelajahi inspirasi visual terbaik dalam kategori ${category}`,
      icon: "fas fa-tag",
    }
  );
}

function loadCategoryProducts(category) {
  // Load products for specific category
  fetch(`/api/products?category=${encodeURIComponent(category)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        renderCategoryProducts(data.data);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function renderCategoryProducts(products) {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  container.innerHTML = products
    .map(
      (product, index) => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card fade-in" style="animation-delay: ${
              index * 0.1
            }s">
                <div class="product-image-container" onclick="viewProductImage('${
                  product.image
                }', '${product.name}')">
                    <img src="${product.image}" alt="${
        product.name
      }" class="product-image" 
                         onerror="this.src='https://via.placeholder.com/400x250?text=Fashion+Image'">
                    <div class="image-overlay">
                        <i class="fas fa-search-plus fa-2x"></i>
                        <p class="mt-2">Lihat Detail</p>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">Rp ${formatPrice(
                      product.price
                    )}</div>
                    <div class="product-actions mt-3">
                        <a href="https://shopee.co.id/search?keyword=${encodeURIComponent(
                          product.name
                        )}" target="_blank" class="btn btn-success w-100">
                            <i class="fas fa-shopping-cart me-2"></i>Beli di Shopee
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

function viewProductImage(imageSrc, imageName) {
  // Implement your viewProductImage logic here, e.g., open a modal
  console.log(`Viewing image: ${imageSrc}, name: ${imageName}`);
  // Example using an alert:
  alert(`Detail Produk:\nNama: ${imageName}\nImage URL: ${imageSrc}`);
}

// Global functions
window.getCategoryFromUrl = getCategoryFromUrl;
window.viewProductImage = viewProductImage;
