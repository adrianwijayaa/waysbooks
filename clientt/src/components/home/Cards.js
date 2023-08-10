import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Buku1 from "../../assest/img/buku1.png";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function Cards() {
  const navigate = useNavigate();
  const addToCart = () => navigate("/cart");

  return (
    <div>
      <Card
        style={{
          width: "450px",
          backgroundColor: "transparent",
        }}
        className="border-0"
      >
        <Row xl={2}>
          <Col className="p-0">
            <Card.Img variant="top" src={Buku1} alt="bg1" />
          </Col>
          <Col className="p-0">
            <Card.Body className="bg-white">
              <Card.Title
                style={{ fontFamily: "Times" }}
                className="text-center fw-bold"
              >
                Sebuah Seni Untuk Bersikap Bodo Amat
              </Card.Title>
              <Card.Text
                style={{ fontFamily: "Avenir", fontSize: "12px" }}
                className="text-body-secondary fst-italic"
              >
                By: Mark Manson
              </Card.Text>
              <Card.Text style={{ fontFamily: "Avenir", fontSize: "14px" }}>
                Selama beberapa tahun belakangan, Mark Manson — melalui blognya
                yang sangat populer tel ...
              </Card.Text>
              <Card.Text
                style={{ fontFamily: "Avenir" }}
                className="text-success"
              >
                Rp. 59.000
              </Card.Text>
              <Button onClick={addToCart} variant="dark w-100">
                Add to Cart
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Cards;
