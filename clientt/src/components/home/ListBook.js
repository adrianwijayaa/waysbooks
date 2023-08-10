import React from "react";
import Books from "./Books";
import Container from "react-bootstrap/esm/Container";

function ListBook() {
  return (
    <div>
      <Container className="my-5">
        <h1 style={{ fontFamily: "Times New Roman" }}>List Book</h1>
        <div>
          <Books />
        </div>
      </Container>
    </div>
  );
}

export default ListBook;
