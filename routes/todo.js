const express = require("express");

module.exports = function(app) {
    app.get("/api/todo", function(req, res) {
        res.json({success: true})
    });
}