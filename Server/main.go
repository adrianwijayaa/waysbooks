package main

import (
	"fmt"

	"waysbooks/database"
	"waysbooks/pkg/mysql"
	"waysbooks/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// pusherClient := pusher.Client{
	// 	AppID: "",
	// 	Key: "",
	// 	Secret: "",
	// 	Cluster: "",
	// 	Secure: true,
	//   }

	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	// e.POST("/complain", func(c echo.Context) error {
	// 	var data map[string]string
	// 	errV := c.Bind(data)
	// 	if errV != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	// 	}

	// 	err := pusherClient.Trigger("my-channel", "my-event", data)
	// 	if err != nil {
	// 		fmt.Println(err.Error())
	// 	  }

	// 	  return c.JSON(http.StatusOK, data)
	// })

	// var PORT = os.Getenv("PORT");

	mysql.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("/api/v1"))

	fmt.Println("Server Running on Localhost : 5000 ")
	e.Logger.Fatal(e.Start("localhost:5008"))
}
