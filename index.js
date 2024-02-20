const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const {product,category}=require('./const')

const base_url='/api/v1';

app.get(`${base_url}/get/home`,(req,res)=>{
res.status(200).json({massge:"hello vaibhav"});
});

app.get(`${base_url}/get/category`,(req,res)=>{
    res.status(200).json({data:category,massge:"All category fetch succesfully"});
});

app.get(`${base_url}/get/category-by-id/:id`,(req,res)=>{
    // const {id} = req.params
    console.log(req.params.id);
    const result = category.find((element) => element.id == req.params.id );
    if(!result){
    res.status(404).json({data:'',massge:`Category with categoryId:${req.params.id} Not found `});
    return 
    }
    res.status(200).json({data:result,massge:`Category with categoryId:${req.params.id} found succesfuly`});
});



app.get(`${base_url}/get/product`, (Req, res)=>{
    res.status(200).json({data:product,massge:"All product fetch are succesfully"});
});

app.get(`${base_url}/get/product-by-id/:id`,(req,res)=>{
    // const {id} = req.params
    console.log(req.params.id);
    const result = product.find((element) => element.id == req.params.id );
    if(!result){
    res.status(404).json({data:'',massge:`Product with productId:${req.params.id} Not found `});
    return 
    }
    res.status(200).json({data:result,massge:`Product with productId:${req.params.id} found succesfuly`});
});

app.get(`${base_url}/get/product-by-categoryId/:categoryId`,(req,res)=>{
    // const {id} = req.params
    console.log(req.params.id);
    const result = product.filter((element) => element.categoryId == req.params.categoryId);
    if(!result){
    res.status(404).json({data:'',massge:`Product with categoryId:${req.params.categoryId} Not found `});
    return 
    }
    res.status(200).json({data:result,massge:`Product with categoryId:${req.params.categoryId} found succesfuly`});
});

app.post(`${base_url}/add/product`,(req,res)=>{
    // const {id} = req.params
    console.log(req.body);
    product.push(req.body);
    res.status(200).json({data:req.body,massge:`Product added succesfuly`});
});

app.delete(`${base_url}/delete/product/:id`, (req, res) => {
    console.log(req.params.id);
    const idToDelete = parseInt(req.params.id);
    const updatedProduct = req.body;
    const indexToDelete = product.findIndex(product => product.id === idToDelete);
    if (indexToDelete === -1) {
        res.status(404).json({data:'', message: `Product with ID ${idToDelete} not found` });
    } else {
        product.splice(indexToDelete, 1);
        res.status(200).json({ data: updatedProduct, message: `Product with ID ${idToDelete} deleted successfully` });
    }
});


app.put(`${base_url}/update/product/:id`, (req, res) => {
    console.log(req.params.id);
    const idToUpdate = parseInt(req.params.id);
    const updatedProduct = {
        id:req.body.id,
        categoryId:req.body.categoryId,
        imageUrl:req.body.imageUrl,
        name:req.body.name,
        description:req.body.description, 
        price:req.body.price
    }

    const indexToUpdate = product.findIndex(product => product.id === idToUpdate);
    if (indexToUpdate === -1) {
        res.status(404).json({data:'', message: `Product with ID ${idToUpdate} not found` });
    } else {
        product[indexToUpdate] = {
            id:product[indexToUpdate].id = req.body.id != undefined ? req.body.id:product[indexToUpdate].id,
            categoryId:product[indexToUpdate].categoryId = req.body.categoryId != undefined ? req.body.categoryId:product[indexToUpdate].categoryId,
            name:product[indexToUpdate].name = req.body.name != undefined ? req.body.name:product[indexToUpdate].name,
            description:product[indexToUpdate].description = req.body.description != undefined ? req.body.description:product[indexToUpdate].description,
            price:product[indexToUpdate].price = req.body.price != undefined ? req.body.price:product[indexToUpdate].price,


        };
        res.status(200).json({ data: updatedProduct, message: `Product with ID ${idToUpdate} updated successfully` });
    }
});

app.listen(8000,()=>{
    console.log("Server Started at: http://localhost:8000");
});

