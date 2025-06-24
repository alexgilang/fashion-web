// KONFIGURASI E-COMMERCE LINK
const ECOMMERCE_CONFIG = {
  baseUrl: "https://shopee.co.id/search?keyword=",

  buttonText: "Beli di Shopee",
  buttonIcon: "fas fa-shopping-cart",
};

const SITE_CONFIG = {
  siteName: "Fashion Pentagram",
  tagline: "Platform visual fashion untuk inspirasi gaya dan tren terkini",

  emptyStateText: {
    title: "Belum Ada Produk",
    description: "Produk dalam kategori ini sedang dalam proses penambahan.",
    buttonText: "Lihat Semua Produk",
  },

  modalText: {
    closeButton: "Tutup",
    buyButton: "Beli Sekarang",
  },
};

const CATEGORY_CONFIG = {
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

function getEcommerceLink(productName) {
  return ECOMMERCE_CONFIG.baseUrl + encodeURIComponent(productName);
}

function getButtonText() {
  return ECOMMERCE_CONFIG.buttonText;
}

function getButtonIcon() {
  return ECOMMERCE_CONFIG.buttonIcon;
}

window.ECOMMERCE_CONFIG = ECOMMERCE_CONFIG;
window.SITE_CONFIG = SITE_CONFIG;
window.CATEGORY_CONFIG = CATEGORY_CONFIG;
window.getEcommerceLink = getEcommerceLink;
window.getButtonText = getButtonText;
window.getButtonIcon = getButtonIcon;
