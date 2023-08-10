package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	booksdto "waysbooks/dto/books"
	dto "waysbooks/dto/result"
	"waysbooks/models"
	"waysbooks/repositories"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerBooks struct {
	BooksRepository repositories.BooksRepository
}

type dataBooks struct {
	Books interface{} `json:"books"`
}

func HandlerBooks(BooksRepository repositories.BooksRepository) *handlerBooks {
	return &handlerBooks{BooksRepository}
}

func (h *handlerBooks) FindBooks(c echo.Context) error {
	books, err := h.BooksRepository.FindBooks()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataBooks{Books: books}})
}

func (h *handlerBooks) CreateBooks(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	var err error
	dataFile := c.Get("dataFile").(string)
	fmt.Println(dataFile)
	fmt.Println(CLOUD_NAME)
	fmt.Println(API_KEY)
	fmt.Println(API_SECRET)
	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "waysbooks"})
	
	if err != nil {
		fmt.Println(err.Error())
	}
	
	pages, _ := strconv.Atoi(c.FormValue("pages"))
	ISBN, _ := strconv.Atoi(c.FormValue("ISBN"))
	
	request := booksdto.CreateBooksRequest{
		Title: c.FormValue("title"),
		PublicationDate: c.FormValue("publicationDate"),
		Pages: pages,
		ISBN: ISBN,
		Author: c.FormValue("author"),
		Price: c.FormValue("price"),
		Description: c.FormValue("description"),
		BookAttachment: c.FormValue("bookAttachment"),
		Thumbnail: resp.SecureURL,
	}

	fmt.Println(request)

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	
	books := models.Books{
		Title:           request.Title,
		PublicationDate: request.PublicationDate,
		Pages:           request.Pages,
		ISBN:            request.ISBN,
		Author:          request.Author,
		Price:           request.Price,
		Description:     request.Description,
		BookAttachment:  request.BookAttachment,
		Thumbnail:       resp.SecureURL,
		UserID: 		 int(userId),
	}

	DataBooks, err := h.BooksRepository.CreateBooks(books)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataBooks{Books: DataBooks}})

}

func (h *handlerBooks) GetBooksById(c echo.Context) error {
	Id, _ := strconv.Atoi(c.Param("id"))

	books, err := h.BooksRepository.GetBooksById(Id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataBooks{Books: books}})
}

func (h *handlerBooks) GetBooksByUserId(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))
	books, err := h.BooksRepository.GetBooksByUserId(userId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: books,
		
	})
}
