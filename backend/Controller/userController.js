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
      res.send({ status: "error", data:"Please enter valid password"});
    }
  } else {
    res.send({ status: "error", data:"Enter valid email"});
  }
};

module.exports = { register, login , getSingleUser, getOthersPeople};
