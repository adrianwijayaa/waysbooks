package models

type Transaction struct {
	ID             int              `json:"id"`
	UserID         int              `json:"user_id"`
	User           UserCartResponse `json:"user" gorm:"foreignKey:UserID"`
	Attachment     string           `json:"attachment" gorm:"type: varchar(255)"`
	BookID         int              `json:"book_id"`
	BooksPurchased Books            `json:"booksPurchased" gorm:"foreignKey:BookID"`
	TotalPayment   string           `json:"totalPayment" form:"total"`
	Qty 		   string           `json:"qty" gorm:"default:'1'"`
	Status         string           `json:"status" gorm:"default:'pending'"`
}
