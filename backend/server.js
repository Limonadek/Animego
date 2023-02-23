'use strict';
require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const db = require('./model/querys.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3002;

app.get('/api/contents', async (req, res) => {
    try {
        const result = await db.getAllContent();
        
        if (result.length === 0) {
            res.status(500).end();
        }

        res.status(200).json(result);
    } catch(error) {
        res.status(500).end();
    }
});

app.get('/api/contents/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            res.status(400).end();
        }

        const result = await db.getById(id);
        if (result.length !== 1) {
            res.status(404).end();
        }
        res.status(200).json(result);
    } catch(error) {
        res.status(500).end();
    }
})


app.post('/animeContents', async (req, res) => {
    if (Object.keys(req.body).length != 12) {
        res.status(400).end();
    }

    const object = ['urlImage', 'urlAnime', 'nameAnime', 'urlWatch', 'categoryAnime', 'ageAnime', 'descriptionAnime', 'episode', 'status', 'categories', 'originalSource', 'fullDescription'];

    Object.keys(req.body).some((elem) => {
        if (!object.includes(elem)) {
            res.status(400).end();
        };
    })

    try {
        const { urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription} = req.body;
        const id = await db.create(urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription);
        if (!id) {
            res.status(400).end();
        } 
        res.status(201).json({id});
    } catch(error) {
        res.status(500).end();
    }
})

app.put('/animeContents', async (req, res) => {
    if (Object.keys(req.body).length != 13) {
        res.status(400).end();
    }

    const object = ['id', 'urlImage', 'urlAnime', 'urlWatch', 'nameAnime', 'categoryAnime', 'ageAnime', 'descriptionAnime', 'episode', 'status', 'categories', 'originalSource', 'fullDescription'];

    Object.keys(req.body).some((elem) => {
        if (!object.includes(elem)) {
            res.status(400).end();
        };
    })

    try {
        const { id, urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription} = req.body;
        const updateId = await db.update(id, urlImage, urlAnime, urlWatch, nameAnime, categoryAnime, ageAnime, descriptionAnime, episode, status, categories, originalSource, fullDescription);
        if (!updateId) {
            res.status(500).end();
        } 
        res.status(200).json({updateId});
    } catch(error) {
        res.status(500).end();
    }
})


app.delete('/animeContents', async (req, res) => {
    if (Object.keys(req.body).length != 1) {
        res.status(400).end();
    }

    const object = ['id'];

    Object.keys(req.body).some((elem) => {
        if (!object.includes(elem)) {
            res.status(400).end();
        };
    })

    try {
        const { id } = req.body;
        await db.deleteContent(id);
        res.status(200).end();
    } catch(TypeError) {
        res.status(500).end();
    }
})

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
