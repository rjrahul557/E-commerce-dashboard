const express = require("express");
require("./db/config");
const user = require("./db/user");
const product = require("./db/product");
const cors = require("cors");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-commerce";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  let data = new user(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password
  Jwt.sign({result},jwtKey,{expiresIn : "2h"},(err,token)=>{
    if(err)
    {
      res.send({results : "Something went Wrong"})
    }
    
      res.send({result,auth:token});
    
  })
});


app.post('/login',async(req,res) =>{

  console.log(req.body);
  if(req.body.email && req.body.password)
  {
    let users = await user.findOne(req.body).select("-password");
    if(users)
    {
      Jwt.sign({users},jwtKey,{expiresIn : "2h"},(err,token)=>{
        if(err)
        {
          res.send({results : "Something went Wrong"})
        }
        
          res.send({users,auth:token});
        
      })
      
    }else{
      res.send({results : "No such user found"});
    }
  }
  else {
    res.send({results : "No such user found"});
  }
  
  
});


app.post('/add-product',verifyToken,async(req,res) => {
  let data = new product(req.body);
  let result = await data.save();
  res.send(result);
})

app.get('/products',verifyToken,async(req,res) =>{
  let products = await product.find();
  if(products.length > 0)
  {
    res.send(products);
  }else{
    res.send({result:"No products found"});
  }
})

app.delete('/product/:id',verifyToken,async(req,res) =>{
  const result = await product.deleteOne({_id:req.params.id});
  res.send(result);
})

app.get('/product/:id',verifyToken,async(req,res) =>{
  let result  = await product.findOne({_id:req.params.id});
  if(result)
  {
    res.send(result);
  }
  else{
    res.send({result : "No such product found"});
  }
})

app.put('/product/:id',verifyToken,async(req,res) => {
  let result = await product.updateOne(
    {_id:req.params.id},
    {
      $set : req.body
    }
  )
  res.send(result);
})

app.get('/search/:key',verifyToken,async(req,res) =>{
  let result = await product.find({
    "$or" : [
      {name : {$regex:req.params.key}},
      {price : {$regex:req.params.key}},
      {category : {$regex:req.params.key}},
      {company: {$regex:req.params.key}},
    ]
  });
  res.send(result);
})


function verifyToken(req,res,next) {
  let token = req.headers['authorization'];
  if(token)
  {
    token = token.split(' ')[1];
    Jwt.verify(token,jwtKey,(err,valid) => {
      if(err)
      {
        res.send({result:"Please provide valid token"})
      }
      else{
        next();
      }
    })
  }else{
    res.send({result:"please Add token with header"})
  }

}
app.listen(5000);
