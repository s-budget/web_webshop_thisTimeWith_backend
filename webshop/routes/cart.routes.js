const express = require('express');
const session = require('express-session')

const router = express.Router()
const productData=require('../data/data');
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
router.get("/cart/getAll",(req,res)=>
{
     res.send(req.session.cart);
});
module.exports=router;