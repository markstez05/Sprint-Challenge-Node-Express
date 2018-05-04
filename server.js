const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const actionRoutes = require('./data/Routes/actionRoutes');
const projectRoutes = require('./data/Routes/projectRoutes');
// const project = require('./data/helpers/projectModel')
// const action = require('./data/helpers/actionModel')
const server = express();


server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/actions', actionRoutes);
server.use('/project', projectRoutes);

server.get('/', (req, res) => {
    res.json({ api: 'RUNNING' })
})
const port = 8000;

server.listen(port, () => console.log(`\n== API RUNNING ON PORT ${port} ==\n`))