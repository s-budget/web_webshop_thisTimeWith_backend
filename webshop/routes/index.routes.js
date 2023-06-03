const express = require('express');
const session = require('express-session')

const router = express.Router()
const productData=require('../data/data');
router.get("/",async (req,res)=>
{
    res.render('index',{chosenCat:productData.categories.length-1, data: productData,products:productData.categories[productData.categories.length-1].products});
});
router.get("/cart",(req,res)=>
{
    res.render('cart',{data:productData});
});
router.get("/getCategories",(req,res)=>
{//this is useless
    //kategorije se moraju renderati svaki put kada se učitava index stranica, nema smisla ovaj dio odvajati od route za "/"
    res.send(productData.categories);
});
router.get("/getProducts/:id",async (req,res)=>
{console.log(req.params.id);
    res.render('index',{chosenCat:req.params.id, data: productData,products:productData.categories[req.params.id].products});
});

module.exports=router;