package usersdto

import "waysbooks/models"

type UserProfileResponse struct {
	ID       		int    			`json:"id"`
	FullName 		string 			`json:"name"`
	Email    		string 			`json:"email"`
	Gender   		string 			`json:"gender"`
	Address 		string 			`json:"address"`
	NoHandphone 	string 			`json:"noHandphone"`
	BookID 			int 			`json:"book_id"`
	BooksPurchased 	models.Books	`json:"booksPurchased" gorm:"foreignKey:BookID"`
}