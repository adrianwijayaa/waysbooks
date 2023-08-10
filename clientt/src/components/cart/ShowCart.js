import React, { useEffect, useState } from "react";
import Buku1 from "../../assest/img/buku1.png";
import Trash from "../../assest/img/trash.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Pay from "../../assest/img/pay.png";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/Api";
import { Modal } from "react-bootstrap";

function ShowCart() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // const [form, setForm] = useState({
  //   id: "",
  //   fullname: "",
  //   email: "",
  //   price: "",
  // });

  const [open3, setOpen3] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    console.log("delete id", deleteId);
    setOpen3(true);
  };

  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/transaction/${id}`);
      console.log(response);
      refetch();
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  });

  const handleDeleteId = () => {
    setDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteConfirm) {
      deleteById.mutate(deleteId);
      setDeleteConfirm(null);
      setOpen3(false);
    }
  }, [deleteConfirm]);

  let { data: myBooks, refetch } = useQuery("myBooksCache2", async () => {
    const response = await API.get(`/transactionuser`);
    console.log("ini coba response my books user : ", response);
    console.log("ini response data data:", response.data.data);
    return response.data.data;
  });

  let param = useParams();
  let id = parseInt(param.id);

  let { data: profile } = useQuery("/profileCache32", async () => {
    const response = await API.get(`/transactionbyid/${id}`);
    console.log("ini log response profile: ", response);
    return response.data.data;
  });

  const totalPrice = myBooks?.transaction
    ? myBooks?.transaction.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.booksPurchased?.price),
        0
      )
    : 0;

  const getID = myBooks?.transaction
    ? myBooks?.transaction.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.id),
        0
      )
    : 0;

  // targetName

  // const getEmail = myBooks?.transaction ? myBooks?.transaction.reduce((accumulator, currentEmail) => {
  //   if (currentEmail. === targetName) {
  //     return currentPerson;
  //   } else {
  //     return accumulator;
  //   }
  // }, null);

  // const fullName = strings.reduce((accumulator, currentString) => {
  //   if (currentString.startsWith(targetLetter) && accumulator === null) {
  //     return currentString;
  //   } else {
  //     return accumulator;
  //   }
  // }, null);

  console.log("ini total price : ", totalPrice);
  const totalQty = myBooks?.transaction
    ? myBooks?.transaction.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.qty),
        0
      )
    : 0;

  let ID = myBooks;
  console.log("ini my books :", ID);

  // const form = {
  //   id: myBooks?.id,
  //   fullname: myBooks?.user,
  //   email: myBooks?.user,
  //   price: myBooks?.booksPurchased,
  // };

  console.log("ini total price", totalPrice);
  console.log(myBooks?.transaction);

  // const handleSetForm = () => {
  //   setForm({
  //     id: myBooks?.transaction.id,
  //     fullname: myBooks?.transaction?.user?.name,
  //     email: myBooks?.transaction?.user?.email,
  //     price: totalPrice,
  //   });
  // };

  let cobaid = myBooks?.transaction?.book_id;
  console.log("ini coba id: ", cobaid);

  const handleBuy = useMutation(async () => {
    try {
      const form = {
        id: profile.id,
        fullname: profile?.name,
        email: profile?.email,
        price: totalPrice,
      };
      console.log("ini form :", form);

      const response = await API.post("/payment", form);
      console.log("transaction success :", response);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/cart");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/cart");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/cart");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // useEffect(() => {
  //   handleSetForm();
  //   console.log(form);
  // }, []);

  return (
    <div>
      <Container style={{ marginTop: "130px" }}>
        <Row xl={12}>
          <Col xs={8}>
            <h1 style={{ fontFamily: "Times" }}>My Cart</h1>
            <h4>Review Your Order</h4>
            <div className="mt-4 pt-4 border-top border-bottom border-black">
              {myBooks?.transaction?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex pb-4 justify-content-between"
                  >
                    <div className="d-flex">
                      <img
                        style={{ width: "150px" }}
                        src={data.booksPurchased?.thumbnail}
                        alt="buku1"
                        className="me-3"
                      />
                      <div>
                        <h3 style={{ fontFamily: "Times" }}>
                          {data.booksPurchased?.title}
                        </h3>
                        <p className="text-body-secondary fst-italic">
                          {data.booksPurchased?.author}
                        </p>
                        <h5 className="text-success">
                          {data.booksPurchased?.price}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <img
                        onClick={() => handleDelete(data.id)}
                        style={{ cursor: "pointer" }}
                        src={Trash}
                        alt="trash"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={4}>
            <br />
            <br />
            <br />
            <br />
            <div className="border-top border-bottom border-black mt-3 pt-3 mb-3">
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>Rp. {totalPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Qty</p>
                <p>{totalQty}</p>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p className="text-success ">Rp. {totalPrice}</p>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <img style={{ width: "50%" }} src={Pay} alt="pay" />
            </div>
            <div className="d-flex justify-content-end">
              <Button
                onClick={(e) => handleBuy.mutate(e)}
                style={{ width: "50%" }}
                variant="dark"
              >
                Pay
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      {open3 && (
        <Modal show={open3}>
          <Modal.Body>
            <div>
              <div>Delete Transaction</div>
              <div>Are you sure to delete this Transaction?</div>
              <div>
                <Button onClick={handleDeleteId}>Yes, Delete</Button>
                <Button onClick={() => setOpen3(false)}>No</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default ShowCart;
