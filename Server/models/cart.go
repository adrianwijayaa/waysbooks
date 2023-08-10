package models

type Cart struct {
	ID int `json:"id" gorm:"primaryKey:autoIncrement"`
	UserID int `json:"user_id"`
	Users UserCartResponse `json:"users" gorm:"foreignKey:UserID"`
	TotalPayment string `json:"totalPayment" form:"total "`
}