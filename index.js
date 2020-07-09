const express = require("express");
const shortid = require("shortid")

const server = express();

let users = [];
const PORT = 5000;

server.use(express.json());

server.post("/api/users", (req,res)=>{
    const userInfo = req.body;
    userInfo.id = shortid.generate();

    try {
        if(userInfo.name && userInfo.bio) {
            users.push(userInfo);
            res.status(201).json(userInfo);
    
        } else {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }

    } catch (err) {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database", err})
    }

    
})

server.get("/api/users", (req,res)=>{
    try {
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved.", err})
    }
})

server.get("/api/users/:id", (req,res)=>{
    const {id} = req.params;
    const reqUser = users.find(user => user.id === id)

    try {
        if (reqUser) {
            res.status(200).json(reqUser);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    } catch(err) {
        res.status(500).json({errorMessage: "The user information could not be retrieved.", err})
    }

    
})

server.delete("/api/users/:id", (req,res)=>{
    const {id} = req.params;
    const deleteUser = users.find(user => user.id === id)

    try {
        if (deleteUser) {
            users = users.filter(user=>user.id !== id);
            res.status(200).json(deleteUser);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({errorMessage: "The user could not be removed"})
    }

    
})

server.listen(PORT, ()=>{
    console.log("listening on localhost:", PORT);
})