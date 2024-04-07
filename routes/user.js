const express = require('express');
const User = require('../models/user');
const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user");
const router  = express.Router();

router
    .get("/", handleGetAllUsers)
    .post("/",handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;