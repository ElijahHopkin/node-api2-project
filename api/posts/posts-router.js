// implement your posts router here
const express = require('express');

const router = express.Router();
const Posts = require('./posts-model')

router.get('/', (req, res) =>{
    Posts.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})

router.get('/:id', (req, res)=> {
    const id= req.params.id
    Posts.findById(id)
        .then(post => {
            if(post) {
                res.status(200).json(post)
            }else{
                res.status(404).json({message: 'the post with the specified ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'The post information could not be retrieved'})
        })
})

router.post('/', (req,res) => {
    const {title, contents} = req.body
    if(!title ||!contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    }else{
        Posts.insert(req.body)
        .then(result => {
            Posts.findById(result.id)
            .then(post => {
                res.status(201).json(post)
            })
        })
        .catch(err => {
            res.status(500).json({message: "There was an error while saving the post to the database"})
        })
    }
})

router.put('/:id', (req,res) => {
    const {title, contents} = req.body
    const id= req.params.id
    if(!title || !contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    }else{
        Posts.update(id, req.body)
        .then(result => {
            if(result){
                Posts.findById(id)
                .then(post => {
                    res.status(200).json(post)
                })
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be modified" })
        })
    }
})




module.exports = router
