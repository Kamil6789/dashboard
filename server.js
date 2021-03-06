const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

require("./routes/weather")(app);
require("./routes/todo")(app);

app.use(express.static("frontend/dist"));

app.get("/", (req, res) => {
    res.sendFile("frontend/dist/index.html");
});

app.listen((process.env.PORT || 3000), function() {
    console.log("Express is running.");
});

