import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../assest/img/Frame.png";
import Button from "react-bootstrap/Button";
import ModalLogin from "./modal/ModalLogin";
import ModalRegister from "./modal/ModalRegister";
import Cart from "../assest/img/cart.png";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Complain from "../assest/img/complain.png";
import Out from "../assest/img/out.png";
import addBook from "../assest/img/addbook.png";
import Profile from "../assest/img/profile.png";
import "../App.css";

function Navbars() {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const navigate = useNavigate();

  const home = () => navigate("/");
  const addBooks = () => navigate("/addbook");
  const toCart = () => navigate("/cart");
  const toComplain = () => navigate("/complainadmin");
  const toProfile = () => navigate("/profile");
  const toComplainUser = () => navigate("/complain");

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    setOpen(false);
    dispatch({
      type: "LOGOUT",
    });
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div>
      <Navbar
        className={colorChange ? "navbar colorChange" : "navbar"}
        fixed="top"
      >
        <Container className="mt-4 pb-4">
          <img
            style={{ cursor: "pointer" }}
            onClick={home}
            src={logo}
            alt="logo"
          />
          {state.isLogin ? (
            <div>
              {state.user.role === "admin" ? (
                <div className="position-relative">
                  <div>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={setOpen}
                      src={Profile}
                      alt="profile"
                    />
                  </div>
                  {open && (
                    <Dropdown
                      style={{
                        backgroundColor: "#E8E8E8",
                        position: "absolute",
                        right: "0px",
                      }}
                      className="p-3 mt-1 rounded-3 pe-5"
                    >
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={addBooks}
                      >
                        <img src={addBook} alt="tiket" className="me-3" />
                        <div className="fw-bold">Add Book</div>
                      </DropdownItem>
                      <DropdownItem
                        className="d-flex align-items-center my-3"
                        onClick={toComplain}
                      >
                        <img src={Complain} alt="tiket" className="me-3" />
                        <div className="fw-bold">Complain</div>
                      </DropdownItem>
                      <hr />
                      <DropdownItem className="px-3 d-flex align-items-center">
                        <img src={Out} alt="logout" className="me-3" />
                        <div className="fw-bold" onClick={logout}>
                          Logout
                        </div>
                      </DropdownItem>
                    </Dropdown>
                  )}
                </div>
              ) : (
                <div className="d-flex align-items-center position-relative">
                  <div className="me-3">
                    <img
                      onClick={toCart}
                      style={{ cursor: "pointer" }}
                      src={Cart}
                      alt="cart"
                    />
                  </div>
                  <div>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={setOpen2}
                      src={Profile}
                      alt="profile"
                    />
                  </div>
                  {open2 && (
                    <Dropdown
                      style={{
                        backgroundColor: "#E8E8E8",
                        position: "absolute",
                        right: "0px",
                        top: "70px",
                      }}
                      className="p-3 mt-1 rounded-3 pe-5"
                    >
                      <DropdownItem
                        className="d-flex align-items-center"
                        onClick={toProfile}
                      >
                        <img src={addBook} alt="tiket" className="me-3" />
                        <div className="fw-bold">Profile</div>
                      </DropdownItem>
                      <DropdownItem
                        className="d-flex align-items-center my-3"
                        onClick={toComplainUser}
                      >
                        <img src={Complain} alt="tiket" className="me-3" />
                        <div className="fw-bold">Complain</div>
                      </DropdownItem>
                      <hr />
                      <DropdownItem className="px-3 d-flex align-items-center">
                        <img src={Out} alt="logout" className="me-3" />
                        <div className="fw-bold" onClick={logout}>
                          Logout
                        </div>
                      </DropdownItem>
                    </Dropdown>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Button
                onClick={handleShowLogin}
                className="me-3 px-5 py-1 border-3"
                variant="outline-dark"
              >
                Login
              </Button>
              <Button
                onClick={handleShowRegister}
                className="px-5"
                variant="dark"
              >
                Register
              </Button>
            </div>
          )}
        </Container>
      </Navbar>
      <ModalLogin
        show={showLogin}
        onHide={() => setShowLogin(false)}
        showregister={setShowRegister}
      ></ModalLogin>
      <ModalRegister
        show={showRegister}
        showlogin={setShowLogin}
        onHide={() => setShowRegister(false)}
      />
    </div>
  );
}

export default Navbars;
