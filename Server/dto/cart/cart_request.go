package cartdto

type CartRequest struct {
	UserID         int          `json:"user_id" form:"user_id"`
	TotalPayment   string       `json:"totalPayment"`
}