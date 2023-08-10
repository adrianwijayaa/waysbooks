package transactiondto

import "waysbooks/models"

type TransactionResponse struct {
	ID             int                     `json:"id"`
	UserID         int                     `json:"user_id"`
	User           models.UserCartResponse `json:"user"`
	Attachment     string                  `json:"attachment"`
	BookID         int                     `json:"book_id"`
	BooksPurchased models.Books            `json:"booksPurchased"`
	TotalPayment   string                  `json:"totalPayment"`
	Status         string                  `json:"status"`
}
