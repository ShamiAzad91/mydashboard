import React, { useState } from "react";
import "../style/AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("narzo");
  const [price, setPrice] = useState(122);
  const [category, setCategory] = useState("mobile");
  const [company, setCompany] = useState("realme");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id; // ✅ Corrected (was user?.id)

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // ✅ Validation check
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/product/add", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("auth")}`
        },
      });

      const result = await response.json();
      console.log("Response:", response);
      console.log("Result:", result);

      if (response.ok) {
        alert(`${result?.msg || "Product added successfully!"}`);
        navigate("/");
      } else {
        alert(result.msg || "Failed to add product");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* ✅ Show error dynamically */}
        {error && !name && <span className="error">Enter valid name</span>}

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {error && !price && <span className="error">Enter valid price</span>}

        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {error && !category && (
          <span className="error">Enter valid category</span>
        )}

        <label>Company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter company name"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
        {error && !company && (
          <span className="error">Enter valid company</span>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
