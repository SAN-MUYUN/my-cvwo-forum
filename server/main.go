package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Tag struct {
	Id   int    `json:"id"`
	Body string `json:"body"`
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	fmt.Print("Hello World")
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
		AllowHeaders: "Origin, Content-Type, Accept, Cache-Control",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	db, err := sql.Open("mysql", "root:NYJCnyjc@2020@tcp(127.0.0.1:3306)/cvwo")
	if err != nil {
		panic(err)
	}
	defer db.Close()
	fmt.Println("connected to database")

	app.Post("/api/login", func(c *fiber.Ctx) error {
		user := &User{}
		if err := c.BodyParser(user); err != nil {
			fmt.Println("error parsing login info")
		}
		query := "SELECT password FROM users WHERE username = ?"
		result := db.QueryRow(query, user.Username) //making query to fetch the user password from database

		var fetched string
		if err := result.Scan(&fetched); err != nil {
			if err == sql.ErrNoRows {
				// Username not found in the database
				fmt.Println("no such user")
				return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
			} else {
				fmt.Println("error fetching user info")
			}
		}
		fmt.Println("success user data retrieval")

		if user.Password != fetched {
			fmt.Println("wrong cred")
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
		} else {
			fmt.Println("valid cred")
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "OK"})
		}
	})

	app.Post("/api/signUp", func(c *fiber.Ctx) error {
		user := &User{}
		err := c.BodyParser(user)
		if err != nil {
			fmt.Println("cannot parse data")
		}
		query := "INSERT INTO users (username, password) VALUES (?, ?)"
		result, err := db.Query(query, user.Username, user.Password)
		if err != nil {
			fmt.Println("failed to insert data")
		}
		defer result.Close()
		fmt.Println("new user data inserted")
		return c.JSON(result)
	})

	// results, err := db.Query("SELECT * FROM tags")

	// if err != nil {
	// 	panic(err.Error())
	// }
	// defer results.Close()
	// for results.Next() {
	// 	var tag Tag
	// 	err := results.Scan(&tag.id, &tag.body)
	// 	if err != nil {
	// 		panic(err.Error())
	// 	}
	// 	fmt.Println(tag)
	// }
	log.Fatal(app.Listen(":8000"))

}
