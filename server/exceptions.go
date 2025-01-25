package main

import "github.com/gofiber/fiber/v2"

type ErrorResponse struct {
	Message string `json:"message"`
}

// sendError utility function to send error responses
func badRequestError(c *fiber.Ctx, message string) error {
	return c.Status(fiber.ErrBadRequest.Code).JSON(ErrorResponse{
		Message: message,
	})
}
