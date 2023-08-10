package booksdto

type CreateBooksRequest struct {
	Title           string `json:"title" form:"title" validate:"required"`
	PublicationDate string `json:"publicationDate" form:"publicationDate" validate:"required"`
	Pages           int    `json:"pages" form:"pages" validate:"required"`
	ISBN            int    `json:"ISBN" form:"ISBN" validate:"required"`
	Author          string `json:"author" form:"author" validate:"required"`
	Price           string `json:"price" form:"price" validate:"required"`
	Description     string `json:"description" form:"description" validate:"required"`
	BookAttachment  string `json:"bookAttachment" form:"bookAttachment" validate:"required"`
	Thumbnail       string `json:"thumbnail" form:"thumbnail" validate:"required"`
}
