import React from "react";
import Cards from "./Cards";
import Container from "react-bootstrap/esm/Container";
import Carousel from "react-grid-carousel";
import "../../App.css";

function Carousels() {
  return (
    <div className="py-5">
      <Container className="py-5">
        <div
          style={{ fontFamily: "Vollkorn" }}
          className="text-center my-5 py-5 zoom-in-zoom-out"
        >
          <h3>With us, you can shop online & help</h3>
          <h3>save your high street at the same time</h3>
        </div>
        <div style={{ width: "100%" }} className="pt-3">
          <Carousel
            cols={2}
            rows={1}
            gap={12}
            autoplay={2000}
            loop
            className="d-flex mt-5 pt-2"
          >
            <Carousel.Item>
              <div className="ms-5">
                <Cards />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="ms-4">
                <Cards />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="ms-5">
                <Cards />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </Container>
    </div>
  );
}

export default Carousels;
