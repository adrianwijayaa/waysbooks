import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/esm/Button";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/Api";

function ModalLogin(props) {
  const switchModal = () => {
    props.onHide();
    props.showregister(true);
  };

  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form, config);
      console.log(response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.users,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.users.role === "admin") {
        navigate("/adminhome");
      } else {
        navigate("/");
      }

      setForm({
        userName: "",
        password: "",
      });
    } catch (err) {
      console.log("login failed : ", err);
    }
  });

  return (
    <div>
      <Modal {...props} show={props.show} onHide={props.onHide} centered>
        <ModalBody>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1 className="p-3" style={{ fontFamily: "Times" }}>
              Login
            </h1>
            <div className="px-3 pb-3">
              <input
                value={form.email}
                onChange={handleChange}
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="px-3 pb-3">
              <input
                value={form.password}
                onChange={handleChange}
                className="form-control"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="px-3 pb-3">
              <Button
                onClick={props.onHide}
                style={{ backgroundColor: "#393939", fontFamily: "Times" }}
                type="submit"
                className="w-100 border-0 mt-3"
              >
                Login
              </Button>
            </div>
          </form>
          <p style={{ fontFamily: "Avenir" }} className="text-center">
            Don't have an account ? Click{" "}
            <span
              onClick={switchModal}
              style={{ cursor: "pointer", fontFamily: "Avenir" }}
            >
              Here
            </span>
          </p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalLogin;
