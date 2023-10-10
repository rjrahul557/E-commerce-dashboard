import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const handleProduct = async() => {
    
    if(!name || !price || !category || !company)
    {
        setError(true);
        return false;
    }
    
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product",{
        method:"post",
        body:JSON.stringify({userID,name, price, category, company}),
        headers : {
            'Content-type' : 'application/json',
             authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    result = await result.json();
    console.log(result);
    navigate('/');
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter your product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    {error && !name && <span className="invalid-input">Enter valid name</span>}
      <input
        type="text"
        placeholder="Enter your product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
    {error && !price && <span className="invalid-input">Enter valid price</span>}
      <input
        type="text"
        placeholder="Enter your product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
    {error && !category && <span className="invalid-input">Enter valid category</span>}
      <input
        type="text"
        placeholder="Enter your product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
    {error && !company && <span className="invalid-input">Enter valid company</span>}
      <button onClick={handleProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
