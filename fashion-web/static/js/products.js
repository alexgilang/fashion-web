// Products page functionality - Visual Fashion Platform
document.addEventListener("DOMContentLoaded", () => {
  loadAllProducts();
  setupSearchFunctionality();
});

let allProducts = [];
let filteredProducts = [];

async function loadAllProducts() {
  try {
    showLoading();
    const response = await fetch("/api/products");
    const data = await response.json();

    if (data.success) {
      allProducts = data.data;
      filteredProducts = [...allProducts];
      renderProducts(filteredProducts);
      updateProductCount(filteredProducts.length);
    } else {
      showError("Gagal memuat produk");
    }
  } catch (error) {
    console.error("Error loading products:", error);
    showError("Terjadi kesalahan saat memuat produk");
  } finally {
    hideLoading();
  }
}

function renderProducts(products) {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = getEmptyStateHtml();
    return;
  }

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

function viewProductImage(imageUrl, productName) {
  const modalHtml = `
        <div class="modal fade" id="imageModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${productName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-0">
                        <img src="${imageUrl}" alt="${productName}" class="img-fluid w-100" 
                             style="max-height: 70vh; object-fit: contain;"
                             onerror="this.src='https://via.placeholder.com/600x400?text=Fashion+Image'">
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-2"></i>Tutup
                        </button>
                        <a href="https://shopee.co.id/search?keyword=${encodeURIComponent(
                          productName
                        )}" target="_blank" class="btn btn-success">
                            <i class="fas fa-shopping-cart me-2"></i>Beli di Shopee
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Remove existing modal
  const existingModal = document.getElementById("imageModal");
  if (existingModal) existingModal.remove();

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Show modal
  const modalElement = document.getElementById("imageModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  // Cleanup
  document
    .getElementById("imageModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

function showLoading() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) {
    spinner.style.display = "block";
  }
}

function hideLoading() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) {
    spinner.style.display = "none";
  }
}

// Global functions
window.viewProductImage = viewProductImage;

function setupSearchFunctionality() {}
function updateProductCount(count) {}
function showError(message) {}
function getEmptyStateHtml() {
  return "";
}
const bootstrap = {};
