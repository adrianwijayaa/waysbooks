import React from "react";
import Container from "react-bootstrap/esm/Container";
import On from "../../assest/img/on.png";
import User from "../../assest/img/user.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Send from "../../assest/img/send.png";

function ShowComplain() {
  return (
    <div style={{ marginTop: "130px" }}>
      <Container className="my-5 rounded-5">
        <div>
          <div
            style={{ backgroundColor: "#C4C4C4" }}
            className="d-flex px-5 py-3 rounded-top-4"
          >
            <div className="me-3">
              <img src={User} alt="user" />
            </div>
            <div>
              <h6>Admin Si Paling Cepat</h6>
              <div>
                <img src={On} alt="on" />
                Online
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#DFDFDF" }}
            className="p-5 rounded-bottom-4"
          >
            <Row xl={12} style={{ height: "500px" }}>
              <Col xl={6} className="mt-3">
                <div className="p-3 bg-white mt-5 rounded-3">
                  Halo kak Radif, besok, mohon ditunggu yaa
                </div>
              </Col>
              <Col xl={6}>
                <div className="p-3 bg-white rounded-3">
                  Halo Admin pengiriman buku berapa lama ya?
                </div>
              </Col>
            </Row>
            <div className="d-flex">
              <input
                style={{ backgroundColor: "#C4C4C4", width: "100%" }}
                placeholder="Write your message here"
                className="rounded-3 ps-3 me-3"
              ></input>{" "}
              <div>
                <Button
                  style={{ backgroundColor: "#8AD0D0", width: "100px" }}
                  className="border-0 rounded-3 py-2"
                >
                  <img src={Send} alt="send" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShowComplain;
