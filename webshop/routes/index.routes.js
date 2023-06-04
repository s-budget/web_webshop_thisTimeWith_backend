const express = require('express');
const session = require('express-session')

const router = express.Router()
const productData=require('../data/data');
router.get("/",async (req,res)=>
{
    res.render('index',{chosenCat:productData.categories.length-1, data: productData,products:productData.categories[productData.categories.length-1].products,total:req.session.totalProduct,cart:req.session.cart});
});
router.get("/cart",(req,res)=>
{
    res.render('cart',{chosenCat:productData.categories.length-1,data:productData,total:req.session.totalProduct,cart:req.session.cart});
});
router.get("/cart/add/:id",(req,res)=>
{var code=req.params.id;
//update sessions
if(req.session.cart)
{req.session.cart;
    var found=0;
    for(var i=0;i<req.session.cart.length;i++)
    {
        if(req.session.cart[i].code==code)
        {
            req.session.cart[i].quantity=(req.session.cart[i].quantity+1);
            found=1;
            break;
        }
    }
    req.session.totalProduct=(req.session.totalProduct+1);
}
else
{
}
res.redirect(('/cart'));
});
router.get("/cart/remove/:id",(req,res)=>
{var code=req.params.id;
//update sessions
if(req.session.cart)
{req.session.cart;
    var found=0;
    for(var i=0;i<req.session.cart.length;i++)
    {
        if(req.session.cart[i].code==code)
        {
            req.session.cart[i].quantity=(req.session.cart[i].quantity-1);
            found=1;
             if(req.session.cart[i].quantity==0)
             {
               req.session.cart= req.session.cart.slice(0, i).concat(req.session.cart.slice(i+1));
             }

            break;
        }
    }
    req.session.totalProduct=(req.session.totalProduct-1);
}
else
{
}
res.redirect(('/cart'));
});
router.get("/getCategories",(req,res)=>
{//this is useless
    //kategorije se moraju renderati svaki put kada se učitava index stranica, nema smisla ovaj dio odvajati od route za "/"
    res.send(productData.categories);
});
router.get("/getProducts/:id",async (req,res)=>
{
    res.render('index',{chosenCat:req.params.id, data: productData,products:productData.categories[req.params.id].products,total:req.session.totalProduct,cart:req.session.cart});
});
router.get("/getProducts/:id/add/:prodId",async (req,res)=>
{
    var code=req.params.id+" "+req.params.prodId;
    //update sessions
    if(req.session.cart)
    {req.session.cart;
        var found=0;
        for(var i=0;i<req.session.cart.length;i++)
        {
            if(req.session.cart[i].code==code)
            {
                req.session.cart[i].quantity=(req.session.cart[i].quantity+1);
                found=1;
                break;
                
            }
        }
        if(found==0)
        {
            var product ={code:code,quantity:1};
            req.session.cart.push(product);
        }
        req.session.totalProduct=(req.session.totalProduct+1);
    }
    else
    {
        var product ={code:code,quantity:1}
        req.session.cart=[product];
        req.session.totalProduct=1;

    }
 res.redirect(('/getProducts/'+req.params.id));
});

module.exports=router;