import "../home.css";
import React from "react";
import Navbars from "../components/Navbars";
import Carousels from "../components/home/Carousels";
import ListBook from "../components/home/ListBook";

function Home() {
  return (
    <div
      id="satu"
      className="bg-white"
      style={{ height: "600px", paddingTop: "15px" }}
    >
      <Navbars />
      <Carousels />
      <ListBook />
    </div>
  );
}

export default Home;
