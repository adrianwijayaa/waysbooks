import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/esm/Button";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/Api";

function ModalRegister(props) {
  const switchModal = () => {
    props.onHide();
    props.showlogin(true);
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    noHandphone: "",
    gender: "",
    address: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      console.log("register success : ", response);

      setForm({
        email: "",
        password: "",
        fullName: "",
        noHandphone: "",
        gender: "",
        address: "",
      });
      navigate("/");
    } catch (error) {
      console.log("Register Failed : ", error);
    }
  });

  return (
    <div>
      <Modal {...props} show={props.show} onHide={props.onHide} centered>
        <ModalBody>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1 className="p-3" style={{ fontFamily: "Times" }}>
              Daftar
            </h1>
            <div className="p-3">
              <input
                onChange={handleChange}
                value={form.email}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="px-3 pb-3">
              <input
                onChange={handleChange}
                value={form.password}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="px-3 pb-3">
              <input
                onChange={handleChange}
                value={form.fullName}
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Full Name"
              />
            </div>
            <div className="px-3 pb-3">
              <input
                onChange={handleChange}
                value={form.noHandphone}
                type="text"
                name="noHandphone"
                className="form-control"
                placeholder="No Handphone"
              />
            </div>
            <div className="px-3 pb-3">
              <select
                onChange={handleChange}
                value={form.gender}
                type="select"
                name="gender"
                style={{ width: "100%", border: "0", padding: "10px" }}
              >
                <option hidden>Gender</option>
                <option>Laki - Laki</option>
                <option>Perempuan</option>
              </select>
            </div>
            <div className="px-3 pb-3">
              <input
                onChange={handleChange}
                value={form.address}
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="px-3 pb-3 mt-3">
              <Button
                onClick={props.onHide}
                style={{ backgroundColor: "#393939", fontFamily: "Times" }}
                type="submit"
                className="w-100"
              >
                Register
              </Button>
            </div>
          </form>
          <p style={{ fontFamily: "Avenir" }} className="text-center">
            Already have an account ? Click{" "}
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

export default ModalRegister;
