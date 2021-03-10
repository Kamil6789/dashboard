const express = require("express");
const axios = require("axios");
require("dotenv").config()

module.exports = function(app) {
    app.get("/api/weather/:type", async function(req, res) {
        if(req.params.type == "city") {
            if(req.query.q) {
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&units=metric&lang=pl&appid=${process.env.weatherkey}`)
                .then(function(response) {
                    res.json({
                        success: true,
                        data: response.data
                    });
                }).catch(function (error) {
                    res.json({success: false});
                    console.log(error);
                });
            } else {
                res.json({success: false});
            }
        } else if(req.params.type == "location") {
            if(req.query.lat && req.query.lon) {
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&lang=pl&appid=${process.env.weatherkey}`)
                .then(function(response) {
                    res.json({
                        success: true,
                        data: response.data
                    });
                }).catch(function (error) {
                    res.json({success: false});
                    console.log(error);
                });
            } else {
                res.json({success: false});
            }
        }
    });
}