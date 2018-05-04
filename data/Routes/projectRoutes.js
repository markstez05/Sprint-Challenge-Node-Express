const express = require('express');

const db = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(projects  => {
        res.json(projects);
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
})
router.post('/', (req, res, next) => {
    const projectData = req.body;
    console.log('project Data', projectData)
    db
    .insert(projectData)
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

router.put('/',)

// router.get('/actions:id', (req, res) => {
//     let id;
//     db
//     .get(id)
//     .then(foundId => {
//         id = { ...foundId[0]}
//     db
//     .getProjectActions(projectId)
//     .then(actions =>{
//         res.json(actions);
//     })
//     })
//     .catch(err => {
//         res.status(500).json({ error: err })
//     })
// })



module.exports = router;