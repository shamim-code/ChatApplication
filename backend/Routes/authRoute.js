const { register, getSingleUser, login } = require("../Controller/userController");

const authRuter = require("express").Router();

authRuter.post("/register",register);

authRuter.get("/getSingleUser/:id", getSingleUser);

authRuter.post("/login",login);


module.exports = authRuter;