package authlogindto

type AuthLoginResponse struct {
	Email    string `json:"email"`
	FullName string `json:"fullName"`
	Token    string `json:"token"`
	Role 	 string `json:"role"`
}
