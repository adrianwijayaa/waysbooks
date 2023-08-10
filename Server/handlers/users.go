package handlers

import (
	"log"
	"net/http"
	"time"
	dto "waysbooks/dto/result"
	usersdto "waysbooks/dto/users"
	authlogindto "waysbooks/dto/users/auth/authLogin"
	authregisterdto "waysbooks/dto/users/auth/authRegister"
	"waysbooks/models"
	bcrypt "waysbooks/pkg/bycrypt"
	jwtToken "waysbooks/pkg/jwt"
	"waysbooks/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

type dataUser struct {
	User interface{} `json:"users"`
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authregisterdto.AuthRegisterRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.Users{
		Email:       request.Email,
		Password:    password,
		FullName:    request.FullName,
		NoHandphone: request.NoHandphone,
		Gender:      request.Gender,
		Address:     request.Address,
	}

	dataRegister, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: dataRegister}})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authlogindto.AuthLoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.Users{
		Email:    request.Email,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "wrong username or password"})
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.Id
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authlogindto.AuthLoginResponse{
		Email:    user.Email,
		FullName: user.FullName,
		Token:    token,
		Role:     user.Role,	
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: loginResponse}})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}

func (h *handlerAuth) Profile(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.Profile(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(user)})
}

func convertResponse(u models.UserProfileResponse) usersdto.UserProfileResponse {
	return usersdto.UserProfileResponse{
	  ID:       u.ID,
	  FullName: u.FullName,
	  Email:    u.Email,
	  Gender: u.Gender,
	  Address: u.Address,
	  NoHandphone: u.NoHandphone,
	  BookID: u.BookID,
	  BooksPurchased: u.BooksPurchased,
	}
  }

  func (h *handlerAuth) FindUsers(c echo.Context) error {
	users, err := h.AuthRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: users}})
}