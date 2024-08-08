const mongoose = require("mongoose");
const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const conversationModel = require("../Model/conversationModel");

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await userModel({ username, email, password });
    newUser.save();

    res.status(200).send({ status: "Success", data: newUser });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
    const userId = req.params.id;
    
    try {

        const user = await userModel.findById(userId);
        res.send(user);
        
    } catch (error) {
        res.send(error.message);
    }
  
};


const getOthersPeople = async (req, res) => {

  const userId = req.params.id;

  const conversations = await conversationModel.find({ members: userId });
  
  res.send(conversations);


};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const validEmail = await userModel.findOne({ email: email });
  const validPassword = await userModel.findOne({ password: password });

  if (validEmail) {
    if (validPassword) {
      const token = jwt.sign(
        { email: req.body.email, id: validEmail._id },
        "secretKey",
        { expiresIn: "24h", algorithm: "HS512" }
      );
      res
        .cookie("chatapp", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .status(200)
        .send({ status: "success", data: validEmail });
    } else {
      res.status(401).send("Please enter valid password");
    }
  } else {
    res.status(401).send("Enter valid email");
  }
};

module.exports = { register, login , getSingleUser, getOthersPeople};
