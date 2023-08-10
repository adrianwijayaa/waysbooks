package authregisterdto

type AuthRegisterResponse struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Password string `json:"-"`
}
