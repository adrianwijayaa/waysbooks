package authregisterdto

type AuthRegisterRequest struct {
	Email       string `json:"email" validate:"required"`
	Password    string `json:"password" validate:"required"`
	FullName    string `json:"fullName" validate:"required"`
	NoHandphone string `json:"noHandphone" validate:"required"`
	Gender      string `json:"gender" validate:"required"`
	Address     string `json:"address" validate:"required"`
}
