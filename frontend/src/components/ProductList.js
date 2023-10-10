import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
const ProductList = () => {

    const [products ,setProducts] = useState([]);

    useEffect(()=>{
        getProductList();
    },[]);

    const getProductList = async() =>{
        let result = await fetch("http://localhost:5000/products",{
          headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })
        result = await result.json();
        setProducts(result);
    }

    const handleOperation = async(id) => {
      let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:'delete',
        headers : {
          authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })

      result = await result.json();
      if(result)
      {
        getProductList();
      }
    } 

    const handleSearch = async (event)=>{
      let key = event.target.value;
      if(key)
      {
        let result =  await fetch(`http://localhost:5000/search/${key}`,{
          headers : {
            authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        });
        result = await result.json();
        if(result)
        {
          setProducts(result);
        }
      }else{
        getProductList();
      }
      

    }
    console.log("products" , products);
  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <input type="text" placeholder='Search for products' className='searchProducts'
      onChange = {handleSearch}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        products.length > 0 ? products.map((item,index)=>
        <ul key = {item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick = {() => {handleOperation(item._id)}}>Delete</button>
            <Link to={"/update/"+ item._id}>update</Link></li>
        </ul>
        
        )
        :<h1>No Product Found</h1>
      }
    </div>
  )
}

export default ProductList;
