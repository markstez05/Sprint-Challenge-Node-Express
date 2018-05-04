const express = require('express');

const projects = require('../helpers/projectModel');

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

router.get('/:id', (req, res) => {
    projects.get(req.params.id).then(projects => res.json(projects))
})

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id).then(actions => res.json(actions));
});

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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    projects
    .update(id, req.body)
    .then(projects => {
        if (projects != null) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ message: "There is no project with that Id"})
        }
    })
    .catch(error => res.json(error))
})

router.delete('/:id', (req,res) => {
    projects
    .remove(req.params.id)
    .then(count => res.json({ deleted: count }))
    .catch(error => res.status(500).json(error));
});
module.exports = router;