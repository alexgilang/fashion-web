package routes

import (
	"net/http"
	"path/filepath"

	"fashion-web/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes(router *mux.Router) {
	// API routes
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/products", controllers.GetProducts).Methods("GET")

	// Page routes
	router.HandleFunc("/", serveHome).Methods("GET")
	router.HandleFunc("/home", serveHome).Methods("GET")
	router.HandleFunc("/about", serveAbout).Methods("GET")
	router.HandleFunc("/products", serveProducts).Methods("GET")

	// Category pages
	router.HandleFunc("/aksesoris", serveAksesoris).Methods("GET")
	router.HandleFunc("/pakaian", servePakaian).Methods("GET")
	router.HandleFunc("/desain", serveDesain).Methods("GET")
	router.HandleFunc("/parfum", serveParfum).Methods("GET")

	// Legacy category routes (for backward compatibility)
	router.HandleFunc("/category/{category}", serveCategory).Methods("GET")
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "home.html"))
}

func serveAbout(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "about.html"))
}

func serveProducts(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "products.html"))
}

func serveAksesoris(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "aksesoris.html"))
}

func servePakaian(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "pakaian.html"))
}

func serveDesain(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "desain.html"))
}

func serveParfum(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "parfum.html"))
}

func serveCategory(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join("views", "category.html"))
}
