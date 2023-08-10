import React from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";

function ShowAdmin() {
  return (
    <div>
      <Container style={{ marginTop: "130px" }}>
        <div>
          <h1 style={{ fontFamily: "Times" }}>Incoming Transaction </h1>
          <div>
            <Table striped variant="dark">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Users</th>
                  <th>Evidence of Transfer</th>
                  <th>Product Purchased</th>
                  <th>Total Payment</th>
                  <th>Status Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Adrian Wijaya</td>
                  <td>bca.png</td>
                  <td>My Own Private Mr Cool</td>
                  <td>Rp. 150.000</td>
                  <td>Approve</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShowAdmin;
