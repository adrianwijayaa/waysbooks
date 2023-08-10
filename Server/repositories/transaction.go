package repositories

import (
	"waysbooks/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	GetTransactionByUserId(UserID int) ([]models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	PaymentTransaction(payment models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Preload("User").Preload("BooksPurchased").First(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Where("book_id = ?", ID).Preload("User").Preload("BooksPurchased").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransactionByUserId(UserID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Where("user_id = ?", UserID).Preload("User").Preload("BooksPurchased").Find(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("BooksPurchased").Find(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) PaymentTransaction(payment models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&payment).Error
	return payment, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Product").Preload("Buyer").Preload("Seller").First(&transaction, orderId)
  
	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
  }