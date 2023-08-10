import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import On from "../../assest/img/on.png";
import User from "../../assest/img/user.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Send from "../../assest/img/send.png";
import Profile from "../../assest/img/profile.png";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/Api";

function ShowComplainAdmin() {
  // const [username, setUsername] = useState("username");
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  // let allMessages = [];

  // useEffect(() => {
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher("", {
  //     cluster: "",
  //   });

  //   const channel = pusher.subscribe("chat");
  //   channel.bind("message", function (data) {
  //     allMessages.push(data);
  //     setMessages(allMessages);
  //   });
  // }, []);

  // const submit = async (e) => {
  //   e.preventDefault();

  //   await fetch("http://localhost:5003/complain", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username,
  //       message,
  //     }),
  //   });

  //   setMessage("");
  // };

  // let param = useParams();
  // let id = parseInt(param.id);

  // let { data: users } = useQuery("/usersCache", async () => {
  //   const response = await API.get("/users");
  //   console.log("ini log response", response);
  //   return response.data.data.users;
  // });

  return (
    <div style={{ marginTop: "130px" }}>
      <Container className="my-5 rounded-5">
        <h3 style={{ fontFamily: "Times" }}>Customer Complain</h3>
        {/* {users?.map((e, index) => { */}
        <Row xl={12}>
          <Col xl={4}>
            <div
              style={{ backgroundColor: "#C4C4C4" }}
              className="rounded-4 py-1"
            >
              <div className="d-flex align-items-center m-4 pb-4 border-bottom border-black">
                <div>
                  <img src={Profile} alt="profile" className="me-3" />
                </div>
                {/* {e.role === "user" && id == e ? null :  */}
                <div>{/* {e.name} */}</div>
              </div>
            </div>
          </Col>
          <Col xl={8}>
            <div>
              <div
                style={{ backgroundColor: "#C4C4C4" }}
                className="d-flex px-5 py-3 rounded-top-4"
              >
                {/* {e.role === "admin" && id == e ? null : ( */}
                <div>
                  <div className="me-3">
                    <img src={User} alt="user" />
                  </div>
                  <div>
                    <h6>{/* {e.name} */}</h6>
                    <div>
                      <img src={On} alt="on" />
                      Online
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>
              <div
                style={{ backgroundColor: "#DFDFDF" }}
                className="p-5 rounded-bottom-4"
              >
                {/* <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input
                      className="fs-5 fw-semibold"
                      // value={username}
                      // onChange={(e) => setUsername(e.target.value)}
                    />
                  </div> */}
                {/* {messages.map((message) => { */}
                {/* return ( */}
                <Row xl={12} style={{ height: "500px" }}>
                  {/* {e.role === "admin" ? ( */}
                  <Col xl={6} className="mt-3">
                    {/* <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="mb-1">
                                {message.username}
                              </strong>
                            </div> */}
                    <div className="p-3 bg-white mt-5 rounded-3">
                      {/* {message.message} */}
                    </div>
                  </Col>
                  {/* ) : ( */}
                  <Col xl={6}>
                    {/* <div className="d-flex w-100 align-items-center justify-content-between">
                              <strong className="mb-1">
                                {message.username}
                              </strong>
                            </div> */}
                    <div className="p-3 bg-white rounded-3">
                      {/* {message.message} */}
                    </div>
                  </Col>
                  {/* )} */}
                </Row>
                {/* ); */}
                {/* })} */}
                <form className="d-flex">
                  <input
                    // value={message}
                    style={{ backgroundColor: "#C4C4C4", width: "100%" }}
                    placeholder="Write your message here"
                    className="rounded-3 ps-3 me-3"
                  ></input>{" "}
                  <div>
                    <Button
                      // onChange={(e) => setMessage(e.target.value)}
                      style={{ backgroundColor: "#8AD0D0", width: "100px" }}
                      className="border-0 rounded-3 py-2"
                    >
                      <img src={Send} alt="send" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {/* ; */}
          </Col>
        </Row>
        {/* })} */}
      </Container>
    </div>
  );
}

export default ShowComplainAdmin;
