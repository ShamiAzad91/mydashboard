import React, { useEffect, useState } from "react";
import "../style/ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/product/all");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();

      if (!result.product || result.product.length === 0) {
        alert("No product found in DB");
        setProducts([]);
      } else {
        setProducts(result.product);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    // console.log("delte is here ",id);
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/remove/${id}`,
        {
          method: "DELETE",
         headers:{
            'Content-Type':'application/json',
             "authorization": `Bearer ${localStorage.getItem("auth")}`
          }
        }
      );

      const result = await response.json();
      // console.log(`hiii dlete api`,result);
      if (result.status === "success") {
        alert(" Product deleted successfully!");
        getProducts();
      } else {
        alert(result.msg || "Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="productlist-container">
      <h2>All Products</h2>

      <ul className="product-header">
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul className="product-row" key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>₹{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>

            <li className="action-buttons">
              <Link to={`/update/${item._id}`} className="update-btn">
              Update 
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      ) : (
        <p className="no-data">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
