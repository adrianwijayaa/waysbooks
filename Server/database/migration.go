package database

import (
	"fmt"

	"waysbooks/models"
	"waysbooks/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.Books{},
		&models.Users{},
		&models.Transaction{},
		&models.Cart{},
	)
	if err != nil {
		fmt.Println(err)
		panic("Migration Faiiled")
	}

	fmt.Println("Migration Success")
}
