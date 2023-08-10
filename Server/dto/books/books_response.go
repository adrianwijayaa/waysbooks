package booksdto

type Books struct {
	ID              int    `json:"id"`
	Title           string `json:"title"`
	PublicationDate string `json:"publicationDate"`
	Pages           int    `json:"pages"`
	ISBN            int    `json:"ISBN"`
	Author          string `json:"author"`
	Price           string `json:"price"`
	Description     string `json:"description"`
	BookAttachment  string `json:"bookAttachment"`
	Thumbnail       string `json:"thumbnail"`
}
