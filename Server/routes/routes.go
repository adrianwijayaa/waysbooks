package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	BooksRoutes(e)
	UsersRoutes(e)
	TransactionRoutes(e)
	CartRoutes(e)
}
