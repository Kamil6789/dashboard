const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


app.listen((process.env.PORT || 3000), function() {
    console.log("Express is running.");
});

app.get("/api/example", async function(req, res) {
    res.json({success: true});
});