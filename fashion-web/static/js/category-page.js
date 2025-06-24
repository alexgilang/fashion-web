async function loadCategoryProducts(category) {
  try {
    showLoading();
    const response = await fetch(
      `/api/products?category=${encodeURIComponent(category)}`
    );
    const data = await response.json();

    if (data.success) {
      renderCategoryProducts(data.data);
      updateProductCount(data.data.length);
    } else {
      showError("Gagal memuat produk kategori");
    }
  } catch (error) {
    console.error("Error loading category products:", error);
    showError("Terjadi kesalahan saat memuat produk");
  } finally {
    hideLoading();
  }
}

function renderCategoryProducts(products) {
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
                        <a href="${getEcommerceLink(
                          product.name
                        )}" target="_blank" class="btn btn-success w-100">
                            <i class="fas fa-shopping-cart me-2"></i>Beli Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function getEmptyStateHtml() {
  return `
        <div class="col-12 text-center py-5">
            <div class="empty-state">
                <i class="fas fa-images fa-4x text-muted mb-4"></i>
                <h3 class="text-muted mb-3">Belum Ada Produk</h3>
                <p class="text-muted mb-4">Produk dalam kategori ini sedang dalam proses penambahan.</p>
                <a href="/products" class="btn btn-primary">
                    <i class="fas fa-images me-2"></i>Lihat Semua Produk
                </a>
            </div>
        </div>
    `;
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
                        <a href="${getEcommerceLink(
                          productName
                        )}" target="_blank" class="btn btn-success">
                            <i class="fas fa-shopping-cart me-2"></i>Beli Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

  const existingModal = document.getElementById("imageModal");
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modal = new bootstrap.Modal(document.getElementById("imageModal"));
  modal.show();

  document
    .getElementById("imageModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

function updateProductCount(count) {
  const countElement = document.getElementById("productCount");
  if (countElement) {
    countElement.textContent = count;
  }
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

function showError(message) {
  const container = document.getElementById("productsContainer");
  if (container) {
    container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h4 class="text-muted">${message}</h4>
                <button class="btn btn-primary mt-3" onclick="location.reload()">
                    <i class="fas fa-redo me-2"></i>Coba Lagi
                </button>
            </div>
        `;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

function getEcommerceLink(productName) {
  return `https://example.com/buy/${productName
    .replace(/\s+/g, "-")
    .toLowerCase()}`;
}

window.loadCategoryProducts = loadCategoryProducts;
window.viewProductImage = viewProductImage;
