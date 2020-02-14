// implement your API here
const express = require('express');

const server = express();
const db = require('./data/db')
const port = 5000;

server.use(express.json());

server.get("/", (req, res) => {
    db.find()
    .then(char => {
        console.log(char);
        res.json(char);
    })
    .catch(err=> {res.status(500).json({err:err})})
})

server.post("/", (req, res) => {
    const newHub = req.body;
    
    db.insert(newHub)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(err=>{res.status(500).json({err: err})})
})

server.get("/:id", (req, res) => {
    const {id} = req.params;
    
    db.findById(id)
    .then(char => {
        console.log(char);
        res.json(char);
    })
})

server.delete("/:id", (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(char => {
        res.status(201).json(char)
    })
})

server.put("/:id", (req, res) => {
    const {id} = req.params;
    
    db.update(id, req.body)
    .then(char => {
        res.status(200).json(char)
    })
})


server.listen(port, () => {
    console.log(`listening on port ${port}`)
}
);