const express = require("express");
const app = express();
const port = 3001;
app.use(express.static("static"));
const { engine } = require("express-handlebars");
const fs = require("fs");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/resume", (req, res) => {
  res.render("resume");
});

app.get("/Blog", (req, res) => {
  res.render("blog");
});

app.get("/thingsilike", (req, res) => {
  res.render("thingsilike");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/code", (req, res) => {
  res.render("code");
});

let drinks = [];
fs.readFile("./DATA/drinks.json", (err, data) => {
  if (err) {
    console.log("Failed to Read Drinks, err", err);
  } else {
    drinks = JSON.parse(data);
    console.log("Done getting drinks.");
  }
});

app.post("/drinks", (req, res) => {
  console.log(req.body);
  drinks.push({
    drink: req.body.drink,
    nametag: req.body.nametag,
  });
  res.redirect("/drinks");
  fs.writeFile("./DATA/drinks.json", JSON.stringify(drinks), (err) => {
    if (err) {
      console.log("Failed to Save Drinks, err", err);
    } else {
      console.log("Done saving drinks.");
    }
  });
});

app.get("/drinks", (req, res) => {
  res.render("drinks", {
    drinks,
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.post("/clicked", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on ${port}`);
});
