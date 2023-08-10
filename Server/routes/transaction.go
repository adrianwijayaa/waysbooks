package routes

import (
	"waysbooks/handlers"
	"waysbooks/pkg/middleware"
	"waysbooks/pkg/mysql"
	"waysbooks/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transactionbyid/:id", h.GetTransaction)
	e.GET("/transactions", middleware.Auth(h.FindTransaction))
	e.GET("/transactionuser", middleware.Auth(h.GetTransactionByUserId))
	e.DELETE("/transaction/:id", middleware.Auth(h.DeleteTransaction))
	e.POST("/notification", h.Notification)
	e.POST("/payment", h.PaymentTransaction)
}
