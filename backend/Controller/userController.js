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

  const myFriends = await conversationModel.aggregate(
    [
      {
        $match:{members:{$in:[userId]}}
      },
      {
          $project: {
              members: {
                  $filter: {
                      input: "$members",
                      as: "member",
                      cond: { $ne: ["$$member", userId] }
                  }
              },
              _id: 0
          }
      },
      {
          $unwind:"$members"
      }
    ]
  )

  const myFriendsId = myFriends.map(friend => new mongoose.Types.ObjectId(friend.members));
  // Convert the specific ID to ObjectId
const userIdToExclude = new mongoose.Types.ObjectId(userId);

  const otherUser = await userModel.aggregate([
    {
        $project:{_id:1}
    },
    {
      $match: {
        _id: { $nin: [...myFriendsId,userIdToExclude] }
      }
    }
])


  res.send(otherUser);
 
};

const login = async (req, res) => {
  try {
     const email = req.body.email;

     const user = await userModel.findOne({email: req.body.email , password:req.body.password});

    if (!user) {
      return res.status(400).json({ status: "error", data: "Enter valid email" });
    }else{
      res.send({status: "success", data:user});
    }
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "error", data: "An unexpected error occurred" });
  }
};


module.exports = { register, login , getSingleUser, getOthersPeople};
