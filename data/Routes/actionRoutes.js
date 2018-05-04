const express = require('express');
const actions = require('../helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    actions
    .get()
    .then(actions  => {
        res.json(actions);
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
})

router.get('/:id', (req, res) => {
    actions.get(req.params.id).then(action =>res.json(action));
// })
// .catch (err => {
//     res.status(500).json({ err: error})
})

router.delete('/:id', (req, res) => {
    actions
    .remove(req.params.id)
    .then(count => res.json({ deleted: count }))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res, next) => {
    const actionData = req.body;
    console.log('action Data',actionData)
    actions
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
    actions
    .update(id, req.body)
    .then(action => {
        if (action != null) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'There is no action with that id'})
        }
    })
    .catch(error => res.json(error))
})


module.exports = router;