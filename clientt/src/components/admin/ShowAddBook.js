import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Attach from "../../assest/img/attach.png";
import Button from "react-bootstrap/esm/Button";
import Book from "../../assest/img/book.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/Api";

function ShowAddBook() {
  let navigate = useNavigate();

  // const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    ISBN: "",
    author: "",
    price: "",
    description: "",
    bookAttachment: "",
    thumbnail: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    // if (e.target.type === "file") {
    //   let url = URL.createObjectURL(e.target.files[0]);
    //   setPreview(url);
    // }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("ISBN", form.ISBN);
      formData.set("author", form.author);
      formData.set("price", form.price);
      formData.set("description", form.description);
      formData.set("bookAttachment", form.bookAttachment);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);

      // Insert product data
      const response = await API.post("/book", formData, config);
      console.log("add product success : ", response);

      navigate("/");
    } catch (error) {
      console.log("add product failed : ", error);
    }
  });

  return (
    <div>
      <Container
        className="px-5"
        style={{ marginTop: "130px", marginBottom: "50px" }}
      >
        <div className="px-5">
          <h1 style={{ fontFamily: "Times" }}>Add Book</h1>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="Title"
            ></input>
            <input
              name="publicationDate"
              value={form.publicationDate}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3 my-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="Publication Date"
            ></input>
            <input
              value={form.pages}
              name="pages"
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="Pages"
            ></input>
            <input
              name="ISBN"
              value={form.ISBN}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3 my-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="ISBN"
            ></input>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3 mb-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="Author"
            ></input>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="Price"
            ></input>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              cols="40"
              className="w-100 p-2 rounded-3 border-0 ps-3 my-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="About This Book"
            ></textarea>
            <input
              name="bookAttachment"
              value={form.bookAttachment}
              onChange={handleChange}
              className="w-100 p-2 rounded-3 border-0 ps-3 mb-3"
              style={{ backgroundColor: "#EEEEEE" }}
              placeholder="BookAttachment"
            ></input>
            <input
              hidden
              onChange={handleChange}
              type="file"
              id="upload"
              name="thumbnail"
            />

            <Button
              style={{ backgroundColor: "#EEEEEE" }}
              className="text-secondary border-0"
            >
              <label style={{ cursor: "pointer" }} htmlFor="upload">
                Upload file
              </label>
              <img className="ms-3" src={Attach} alt="attach" />
            </Button>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="dark">
                Add Book
                <img className="ms-2" src={Book} alt="book" />
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ShowAddBook;
