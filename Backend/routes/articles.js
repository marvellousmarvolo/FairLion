const express = require("express");
const {
    ErrorHandler
} = require("../helpers/error");
const router = express.Router();
const articleService = require('../services/articleService');

router.get("/", async (req, res, next) => {
    try {
        const response = await articleService.getAllArticles();
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

router.put("/", async (req, res, next) => {
    articleService.updateAllArticles(req.body, (err, articles) => {
        if (err) {
            console.log("ERROR!!!!!"); // ERROR_HANDLER!!!!
        } else {
            res.status(200).send(articles);
        }
    });

    try {
        const response = await articleService.updateAllArticles(req.body);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

router.delete("/", async (req, res, next) => {
    articleService.deleteAllArticles((err, articles) => {
        if (err) {
            console.log(err); // ERROR_HANDLER!!!!
        } else {
            res.status(200).send(articles);
        }
    })

    try {
        const response = await service.deleteAllArticles();
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

module.exports = router;