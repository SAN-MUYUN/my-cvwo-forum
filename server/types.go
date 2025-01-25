package main

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

type Comment struct {
	Id        int     `json:"id"`
	Post      int     `json:"post"`
	User      string  `json:"user"`
	Body      string  `json:"body"`
	CreatedAt float64 `json:"createdAt"`
}
