package controllers

import (
	"encoding/json"
	"net/http"

	"fashion-web/config"
	"fashion-web/models"
)

type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	category := r.URL.Query().Get("category")

	var query string
	var args []interface{}

	if category != "" {
		query = "SELECT id, name, description, price, category, image, created_at, updated_at FROM products WHERE category = $1 ORDER BY created_at DESC"
		args = append(args, category)
	} else {
		query = "SELECT id, name, description, price, category, image, created_at, updated_at FROM products ORDER BY created_at DESC"
	}

	rows, err := config.DB.Query(query, args...)
	if err != nil {
		response := Response{
			Success: false,
			Message: "Failed to fetch products",
			Data:    nil,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	defer rows.Close()

	var products []models.Product
	for rows.Next() {
		var product models.Product
		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Category,
			&product.Image,
			&product.CreatedAt,
			&product.UpdatedAt,
		)
		if err != nil {
			continue
		}
		products = append(products, product)
	}

	response := Response{
		Success: true,
		Message: "Products fetched successfully",
		Data:    products,
	}
	json.NewEncoder(w).Encode(response)
}
