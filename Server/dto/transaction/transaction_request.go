package transactiondto

import "waysbooks/models"

type TransactionRequest struct {
	UserID         int          `json:"user_id" form:"user_id"`
	BookID         int          `json:"book_id" form:"book_id" validate:"required"`
	BooksPurchased models.Books `json:"bookPurchased"`
	Attachment     string       `json:"attachment"`
	TotalPayment   string       `json:"totalPayment"`
}

type TransactionMidtrans struct {
	BookID   int    `json:"book_id"`
	Price    int    `json:"price"`
	FullName string `json:"fullname"`
	Email    string `json:"email"`
}
