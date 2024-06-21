const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const path = require("path");
const hbs = require("hbs");

//public static path
const static_path = path.join(__dirname,"../public");
const templete_path = path.join(__dirname, "../templetes/views")
const partials_path = path.join(__dirname, "../templetes/partials")


app.set('view engine', 'hbs');
app.set('views', templete_path);
hbs.registerPartials(partials_path);


app.use(express.static(static_path))



app.get("/", (req,res)=>{
  res.render("index");
  // res.send("h");
})

app.get("/about", (req,res)=>{
  res.render("about");
})

app.get("/weather", (req,res)=>{
  res.render("weather");
})

app.get("*", (req,res)=>{
  res.render("404error");
})



app.listen(port,()=>{
  console.log(`listining port number ${port}`);
})