const express=require("express");
const app =express();
const PORT =3001;

app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/",(req,res)=>
{
    res.render('index',{});
});
app.get("/cart",(req,res)=>
{
    res.render('cart',{});
});

app.listen(PORT,()=>
{
    console.log('server is at: '+PORT);
});