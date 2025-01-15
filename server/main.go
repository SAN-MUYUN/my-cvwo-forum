package main

import (
	"database/sql"
	"fmt"
	"log"
	"strings"

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

type Post struct {
	Username  string  `json:"username"`
	Title     string  `json:"title"`
	Body      string  `json:"body"`
	CreatedAt float64 `json:"createdAt"`
}

type PostWithTags struct {
	Username  string   `json:"username"`
	Title     string   `json:"title"`
	Body      string   `json:"body"`
	CreatedAt float64  `json:"createdAt"`
	Tags      []string `json:"tags"`
}

type FullPost struct {
	Id        int      `json:"id"`
	Username  string   `json:"username"`
	Title     string   `json:"title"`
	Body      string   `json:"body"`
	CreatedAt float64  `json:"createdAt"`
	Tags      []string `json:"tags"`
}

func main() {
	fmt.Print("Hello World")
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
		AllowHeaders: "Origin, Content-Type, Accept, Cache-Control",
		AllowMethods: "PATCH, POST, GET",
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
			fmt.Println(err.Error())
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

	app.Patch("/api/dashboard/tags", func(c *fiber.Ctx) error {
		var newTags []string
		if err := c.BodyParser(&newTags); err != nil {
			return c.Status(fiber.StatusBadRequest).SendString("Error parsing post: " + err.Error())
		}

		// Map to track existing tags for quick lookup
		existingTags := make(map[string]bool)
		rows, err := db.Query("SELECT body FROM tags")
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error querying database: " + err.Error())
		}
		defer rows.Close()

		var tag string
		for rows.Next() {
			if err := rows.Scan(&tag); err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Error scanning tags: " + err.Error())
			}
			existingTags[tag] = true
		}

		for _, newTag := range newTags {
			if _, exists := existingTags[newTag]; !exists {
				// Insert the tag if it does not exist
				_, err := db.Exec("INSERT INTO tags (body) VALUES (?)", newTag)
				if err != nil {
					return c.Status(fiber.StatusInternalServerError).SendString("Error inserting tag: " + err.Error())
				}
			}
		}

		return c.SendString("Tags updated successfully")
	})

	app.Post("/api/dashboard/posts", func(c *fiber.Ctx) error {
		var post PostWithTags
		if err := c.BodyParser(&post); err != nil {
			fmt.Println(err.Error())
		}
		stringTags := strings.Join(post.Tags, ",")
		fmt.Println("successfully parsed data")
		query := "INSERT INTO posts (username, title, body, created_at, tags) VALUES (?, ?, ?, ?, ?)"
		result, err := db.Exec(query, post.Username, post.Title, post.Body, post.CreatedAt, stringTags)
		if err != nil {
			fmt.Println(err.Error())
		}
		lastId, err := result.LastInsertId()
		if err != nil {
			c.SendString("error getting last id: " + err.Error())
		}

		tags := post.Tags
		for _, tag := range tags {
			query := "INSERT INTO posttag (post, tag) VALUES(?, ?)"
			if _, err := db.Exec(query, lastId, tag); err != nil {
				fmt.Println(err.Error())
			}
		}

		fmt.Println("successfully inserted data")
		return c.SendString("Post inserted Successfully")

	})

	app.Post("/api/dashboard/get", func(c *fiber.Ctx) error {
		fmt.Println(string(c.Body()))
		tags := []string{}
		err := c.BodyParser(&tags)
		fmt.Println(tags)
		if err != nil {
			fmt.Println("error parsing: ", err.Error())
		}

		var posts []FullPost
		var query string = ""
		var results *sql.Rows
		if len(tags) == 0 {
			query = "SELECT * FROM posts"
			results, err = db.Query(query)
		} else {
			placeholders := strings.Repeat("?,", len(tags))
			placeholders = placeholders[:len(placeholders)-1] // Remove the trailing comma

			// Properly parameterized query
			query := fmt.Sprintf("SELECT DISTINCT posts.* FROM posts JOIN posttag ON posts.id = posttag.post WHERE posttag.tag IN (%s)", placeholders)
			args := make([]interface{}, len(tags))
			for i, v := range tags {
				args[i] = v
			}
			// Execute the query with `tags` as variadic arguments
			results, err = db.Query(query, args...)
		}
		// else {
		// 	placeholders := strings.Join(strings.Split(strings.Repeat("?", len(*tags)), ""), ",")
		// 	query = fmt.Sprintf("SELECT DISTINCT posts.* FROM posts JOIN posttag ON posts.id = posttag.post_id WHERE posttag.tag_body IN ()")
		// }
		// queryArgs := []string{}
		// for i, v := range *tags {
		// 	queryArgs[i] = v
		// }
		if err != nil {
			fmt.Println("error executing query: ", err.Error())
			return c.Status(fiber.StatusInternalServerError).SendString("Error executing query.")
		}
		defer results.Close()
		fmt.Println("data retrieved")

		for results.Next() {
			var post FullPost
			var tagString string

			err := results.Scan(&post.Id, &post.Body, &post.Username, &post.CreatedAt, &post.Title, &tagString)
			if err != nil {
				fmt.Println(err.Error())
			}
			post.Tags = strings.Split(tagString, ",")
			// query := "SELECT tag FROM posttag WHERE post = ?"
			posts = append(posts, post)
		}
		return c.JSON(posts)
	})

	var myPosts []FullPost

	app.Post("/api/dashboard/mypost", func(c *fiber.Ctx) error {
		var user string
		newPosts := []FullPost{}
		err := c.BodyParser(&user)
		if err != nil {
			fmt.Println("cannot parse user: ", err.Error())
		}

		results, err := db.Query("SELECT * FROM posts WHERE username = ?", user)
		if err != nil {
			fmt.Println("error selecting my posts: ", err.Error())
		}
		defer results.Close()

		for results.Next() {
			var post FullPost

			var tags string
			err := results.Scan(&post.Id, &post.Body, &post.Username, &post.CreatedAt, &post.Title, &tags)
			if err != nil {
				fmt.Println("error parsing myPost data: ", err.Error())
			}
			post.Tags = strings.Split(tags, ",")
			newPosts = append(newPosts, post)
		}

		myPosts = newPosts

		return c.JSON(myPosts)

	})

	app.Get("api/dashboard/mypost", func(c *fiber.Ctx) error {
		return c.JSON(myPosts)
	})

	log.Fatal(app.Listen(":8000"))

}
