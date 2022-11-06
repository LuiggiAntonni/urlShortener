const express = require('express');
const router = express.Router();
const UrlSchema = require('../models/urls');

router.post('/', async (req, res, next) => {
    console.log((req.body.fullUrl));
    
    try {
        const Url = await UrlSchema.create({
            full: req.body.fullUrl
        })

        return res.redirect('/')
    } catch (error) {
        res.status(400).send({
            error: 'Url registration failed' + error
        })
    }

});

module.exports = (app) => app.use('/shortUrls', router);