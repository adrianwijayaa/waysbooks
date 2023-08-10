package cartdto

import "waysbooks/models"

type CartResponse struct {
	ID				int 					`json:"id"`
	UserID 			int 					`json:"user_id"`
	User 			models.UserCartResponse `json:"user"`
	TotalPayment 	string 					`json:"totalPayment"`
}