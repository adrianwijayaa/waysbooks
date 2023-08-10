import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Map from "../../assest/img/map.png";
import Call from "../../assest/img/call.png";
import Email from "../../assest/img/email.png";
import Gender from "../../assest/img/gender.png";
import Profile from "../../assest/img/profile2.png";
import Buku1 from "../../assest/img/buku1.png";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/Api";

function ShowProfile() {
  let param = useParams();
  let id = parseInt(param.id);

  const { data: profile } = useQuery("/profileCache", async () => {
    const response = await API.get(`/profile/${id}`);
    console.log("ini log response", response);
    return response.data.data;
  });

  // const { data: myBooks } = useQuery("myBooksCache1", async () => {
  //   const response = await API.get("/booksbyuser");
  //   console.log("ini log books:", response);
  //   return response.data.data;
  // });

  const { data: myBooks } = useQuery("myBooksCache1", async () => {
    const response = await API.get("/transactionuser");
    console.log("ini log books:", response);
    return response.data.data.transaction;
  });

  return (
    <div style={{ marginTop: "130px" }}>
      <Container>
        <div className="mx-5 px-5 mt-4">
          <div className="mb-5">
            <h1 style={{ fontFamily: "Times" }}>Profile</h1>
            <div style={{ backgroundColor: "#FFD9D9" }} className="rounded-3">
              <Row xl={12} className="p-5">
                <Col xl={8}>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src={Email} alt="email" />
                    </div>
                    <div>
                      <h6>{profile?.email}</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Email
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center my-3">
                    <div className="me-3">
                      <img src={Gender} alt="gender" />
                    </div>
                    <div>
                      <h6>{profile?.gender}</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Gender
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <img src={Call} alt="call" />
                    </div>
                    <div>
                      <h6>{profile?.noHandphone}</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Mobile Phone
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="me-3 pe-1">
                      <img src={Map} alt="map" />
                    </div>
                    <div>
                      <h6>{profile?.address}</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Address
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col xl={4}>
                  <img
                    style={{ width: "100%" }}
                    src={Profile}
                    alt="profile"
                    className="rounded-3 mb-3"
                  />
                  <Button style={{ width: "100%" }} variant="danger ">
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            {myBooks?.map((data) => (
              <div>
                <h1 style={{ fontFamily: "Times" }}>My Books</h1>
                <div style={{ width: "200px" }} className="my-4">
                  <img
                    style={{ width: "100%" }}
                    src={data.booksPurchased?.thumbnail}
                    alt="buku1"
                    className="rounded-3 mb-3"
                  />
                  <h3 style={{ fontFamily: "Times" }}>
                    {data.booksPurchased?.title}
                  </h3>
                  <p className="text-body-secondary fst-italic">
                    {data.booksPurchased?.author}
                  </p>
                  <Button variant="dark" style={{ width: "100%" }}>
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShowProfile;
