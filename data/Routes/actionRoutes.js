const express = require('express');

const db = require('../helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(actions  => {
        res.json(actions);
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
})
router.post('/', (req, res, next) => {
    const actionData = req.body;
    console.log('action Data',actionData)
    db
    .insert(actionData)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
            res.status(400).json({ msg: 'Please provide all required fields' })
        } else {
            res.status(500).json({ error: "There was an error while saving your project" })
        }
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db
    .update(id, changes)
    .then(count => {
        if(count > 0) {
        db.get(id).then(actions => {
            res.status(200).json(actions[0]);
        })
    } else {
        res.status(404).json({ msg: 'user not found' });
    }
})
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;