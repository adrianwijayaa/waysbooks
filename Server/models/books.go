package models

type Books struct {
	ID              int              `json:"id" gorm:"primaryKey:autoIncrement"`
	Title           string           `json:"title" gorm:"type: varchar(255)"`
	PublicationDate string           `json:"publicationDate" gorm:"type: varchar(255)"`
	Pages           int              `json:"pages"`
	ISBN            int              `json:"ISBN"`
	Author          string           `json:"author" gorm:"type: varchar(255)"`
	Price           string           `json:"price" gorm:"type: varchar(255)"`
	Description     string           `json:"description" gorm:"type: varchar(255)"`
	BookAttachment  string           `json:"bookAttachment" gorm:"type: varchar(255)"`
	Thumbnail       string           `json:"thumbnail" gorm:"type: varchar(255)"`
	UserID          int              `json:"user_id"`
	User            UserCartResponse `json:"user" gorm:"foreignKey:UserID"`
}
