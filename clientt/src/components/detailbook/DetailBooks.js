import React, { useContext, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Buku3 from "../../assest/img/buku3.png";
import Button from "react-bootstrap/esm/Button";
import CartP from "../../assest/img/cartp.png";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/Api";
import { UserContext } from "../../context/UserContext";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";

function DetailBooks() {
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  let param = useParams();
  let id = parseInt(param.id);

  let { data: books } = useQuery("/booksCache2", async () => {
    const response = await API.get(`/book/${id}`);
    console.log("ini log response", response);
    return response.data.data.books;
  });

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };

  const addBook = useMutation(async (id) => {
    try {
      if (state.isLogin) {
        console.log("ini jalan");
        let form = new FormData();
        form.set("book_id", id);
        const response = await API.post("/transaction", form, config);
        navigate(`/cart`);
        return response.data.data;
      } else {
        setShowLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="my-4 px-5 pb-5" style={{ width: "900px" }}>
        <div style={{ marginTop: "130px" }}>
          <Row md={2}>
            <Col className="m-0 p-0">
              <img
                style={{ width: "300px" }}
                src={books?.thumbnail}
                alt="buku3"
                className="rounded-4"
              />
            </Col>
            <Col className="m-0 p-0">
              <div>
                <h1>{books?.title}</h1>
                <p className="text-body-secondary fst-italic">
                  {books?.author}
                </p>
              </div>
              <div>
                <h4>Publication Date</h4>
                <p className="text-body-secondary">{books?.publicationDate}</p>
              </div>
              <div>
                <h4>pages</h4>
                <p className="text-body-secondary">{books?.pages}</p>
              </div>
              <div>
                <h4 className="text-danger">ISBN</h4>
                <p className="text-body-secondary">{books?.ISBN}</p>
              </div>
              <div>
                <h4>Price</h4>
                <p className="text-success">{books?.price}</p>
              </div>
            </Col>
          </Row>
          <div className="mt-5 pt-4 d-flex flex-column">
            <h1>About This Book</h1>
            <p className="text-body-secondary mt-3">{books?.description}</p>
            <div className="ms-auto">
              <Button
                onClick={() => {
                  return addBook.mutate(id);
                }}
                variant="dark"
                className="mt-3"
              >
                Add Cart <img src={CartP} alt="cart" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <ModalLogin
        show={showLogin}
        showLogin={setShowLogin}
        onHide={() => setShowLogin(false)}
        showRegister={setShowRegister}
      ></ModalLogin>
      <ModalRegister
        show={showRegister}
        showLogin={setShowLogin}
        onHide={() => setShowRegister(false)}
      />
    </div>
  );
}

export default DetailBooks;
