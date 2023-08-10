package routes

import (
	"waysbooks/handlers"
	"waysbooks/pkg/middleware"
	"waysbooks/pkg/mysql"
	"waysbooks/repositories"

	"github.com/labstack/echo/v4"
)

func BooksRoutes(e *echo.Group) {
	booksRepository := repositories.RepositoryBooks(mysql.DB)
	h := handlers.HandlerBooks(booksRepository)

	e.GET("/books", h.FindBooks)
	e.POST("/book", middleware.Auth(middleware.UploadFile(h.CreateBooks)))
	e.GET("/book/:id", h.GetBooksById)
	e.GET("/booksbyuser", middleware.Auth(h.GetBooksByUserId))
}
