package repositories

import (
	"waysbooks/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	AddToCart(cart models.Cart) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func(r *repository) AddToCart (cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Preload("User").First(&cart).Error

	return cart, err
}