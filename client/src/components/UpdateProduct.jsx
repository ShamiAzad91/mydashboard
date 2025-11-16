import React, { useEffect, useState } from "react";
import "../style/AddProduct.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  const [originalData, setOriginalData] = useState({});

  const navigate = useNavigate();

  const param = useParams();


//   console.log("hii",param);
  

useEffect(()=>{
getProductDetails();
},[]);


const getProductDetails = async()=>{
    try {
        const response = await fetch(`http://localhost:8000/api/v1/product/single/${param.id}`);
        if(!response.ok){
             throw new Error("Failed to fetch product details");
        }
        let  result = await response.json();
        // console.log("hi shhamii",result);
       result = result.data;
       setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        //   // Store original data
        setOriginalData(result)


        
    } catch (error) {
              console.error("Network Error:", error);
      alert("Something went wrong. Please try again.");
    }
}


 const handleUpdateProduct = async(e)=>{
    e.preventDefault();
    
  // Detect no changes
  if (
    name === originalData.name &&
    price === originalData.price &&
    category === originalData.category &&
    company === originalData.company
  ) {
    alert("⚠ No changes detected!");
    return; // stop function, don't call API
  }
    try {
        // console.log(name,price,category,company);
        const response = await fetch(`http://localhost:8000/api/v1/product/update/${param.id}`,{
          method:'PUT',
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type':'application/json',
             "authorization": `Bearer ${localStorage.getItem("auth")}`
          }
        });
          if(!response.ok){
             throw new Error("Failed to update the product ");
        }

        let result = await response.json();
        // console.log(`shamiiii`,result);
       
    if (result?.status === "success") {
      alert("✔ Product updated successfully!");
      navigate("/")
    } else {
      alert("✖ Unable to update the product. Please try again.");
    }
        

        
        
        
    } catch (error) {
           console.error("Network Error:", error);
      alert("Something went wrong. Please try again.");
    }

 }

  return (
    <div className="addproduct-container">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* ✅ Show error dynamically */}

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
      

        <label>Company</label>
        <input
          type="text"
          name="company"
          placeholder="Enter company name"
          onChange={(e) => setCompany(e.target.value)}
          value={company}
        />
      

        <button type="submit">update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
