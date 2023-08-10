import React from "react";
import Card from "react-bootstrap/Card";
import Buku2 from "../../assest/img/buku2.png";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/Api";
import Container from "react-bootstrap/esm/Container";

function Books() {
  const navigate = useNavigate();

  let { data: books } = useQuery("/booksCache", async () => {
    const response = await API.get("/books");
    console.log("ini log response", response);
    return response.data.data.books;
  });

  const detailBook = async (id) => {
    try {
      const response = await API.get(`/book/${id}`);
      console.log(response.data);
      navigate(`/detailbook/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pb-5">
      <div className="d-flex justify-content-center gap-3 row">
        {books?.map((e, index) => {
          return (
            <div className="col" key={index}>
              <Card
                onClick={() => detailBook(e.id)}
                style={{
                  width: "230px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                className="border-0 pt-5"
              >
                <Card.Img src={e.thumbnail} alt="buku2"></Card.Img>
                <Card.Body>
                  <Card.Title
                    style={{ fontFamily: "Times" }}
                    className="text-center fw-bold fs-5"
                  >
                    {e.title}
                  </Card.Title>
                  <Card.Text
                    style={{ fontFamily: "Avenir", fontSize: "12px" }}
                    className="text-body-secondary fst-italic"
                  >
                    {e.author}
                  </Card.Text>
                  <Card.Text
                    style={{ fontFamily: "Avenir" }}
                    className="text-success"
                  >
                    {e.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Books;
