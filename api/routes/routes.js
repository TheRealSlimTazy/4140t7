const express = require("express");

const usersObj = require("../database/users");

var { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get("/", (req,res) => {
    res.send("Hello World")
});

//GET API for all users
router.get("/users", (req,res) => {
    try{
        if(!usersObj || !usersObj.length) {
            return res.status(404).json({success: false, data: "users not found!"})
        }
    }catch(err) {
        return res.status(500).json({message:"Internal server error!"})
    }
    return res.status(200).json({message:"Users retrieved", success: true, users: usersObj});
});

//GET API for specific user
router.get("/user/:id", (req,res) => {
    const userId = req.params.id;
    let userFound = false;
    for(individualItem in usersObj) {
        if(usersObj [individualItem].id ==userId) {
            userFound = true;
            const currentUser = usersObj[individualItem];
            const individualUserObject = {
                email: currentUser.email,
                firstName: currentUser.firstName,
                id: currentUser.id
            }
            return res.status(200).json({success: true, user: individualUserObject});
        }
    }

    if(!userFound) {
        return res.status(404).json({success: false, data: "user not found!"})
    }
});

//PUT API for updating user
router.put("/update/:id", (req,res) => {
    const userId = req.params.id;
    const body = req.body;
    let userFound = false;
    try {
        if(Object.keys(body).length == 0) {
            return res.status(400).json({success: false, data: "Incorrect Request!"})
        }
    }
    catch(err) {
        return res.status(500).json({message: "Internal server error!"})
    }
    for(individualItem in usersObj) {
        if(usersObj[individualItem].id == userId) {
            userFound = true;
            if("email" in body) {
                usersObj[individualItem].email = body.email;
            }
            if("firstName" in body) {
                usersObj[individualItem].firstName = body.firstName;
            }
            return res.status(200).json({success: true, message: "User updated"});
        }
    }

    if(!userFound) {
        return res.status(404).json({success: false, data: "user not found!"})
    }
});

//POST API to add user
router.post("/add", (req,res) => {
    const body = req.body;
    const id = uuidv4();

    try {
        if(Object.keys(body).length == 0) {
            return res.status(400).json({success: false, data: "Incorrect Request!"})
        }
    }
    catch(err) {
        return res.status(500).json({message: "Internal server error!"})
    }

    body.id = id;
    usersObj.push(body);
    return res.status(200).json({message: "User added", success: true, id: id});
})
module.exports = router;