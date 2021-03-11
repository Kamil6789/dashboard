const express = require("express");
const axios = require("axios");
require("dotenv").config();

module.exports = function(app) {
    app.get("/api/todo/:type", async function(req, res) {
        if (req.params.type == "projects") {
            axios.get(`https://api.todoist.com/rest/v1/projects`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "project" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/projects/${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "sections" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/sections?project_id=${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "section" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/sections/${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "tasks") {
            axios.get(`https://api.todoist.com/rest/v1/tasks`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "task" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/tasks/${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "comments" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/comments?task_id=${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "comment" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/comments/${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "labels") {
            axios.get(`https://api.todoist.com/rest/v1/labels`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        } else if (req.params.type == "label" && req.query.id) {
            axios.get(`https://api.todoist.com/rest/v1/labels/${req.query.id}`, { "headers": { "Authorization": `Bearer ${process.env.todoistkey}` } })
            .then(function (response) {
                res.json({
                    success: true,
                    data: response.data
                });
            }).catch(function (error) {
                res.json({ success: false });
                console.log(error);
            });
        }
    });
}