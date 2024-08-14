
const conversationModel = require("../Model/conversationModel");
const messageModel = require("../Model/messageModel");



const sendMessage =async(req, res)=>{


    const {message, senderId, receiverId} = req.body;


    try {
        const conversationId = await conversationModel.aggregate([
            {
                $match: {
                    members: { $all: [senderId, receiverId] },
                    $expr: { $eq: [{ $size: "$members" }, 2] }
                }
            },
            {
                $project: {
                    _id: 1
                }
            }
        ])

        const newConversation = await messageModel({consversationId:conversationId[0]['_id'], sender: senderId, receiver: receiverId, message:message});
        await newConversation.save();

        res.status(201).send(newConversation);


    } catch (error) {
        res.send(error.message);
    }

}


const fetchMessage = async(req, res)=>{

    const user1 = req.params.id1;
    const user2 = req.params.id2;


    try {
        const searchConversation = await conversationModel.aggregate([
            {
                $match: {
                    members: { $all: [user2, user1] },
                    $expr: { $eq: [{ $size: "$members" }, 2] }
                }
            },
            {
                $project: {
                    _id: 1
                }
            }
        ])
        const messages = await messageModel.find({consversationId: searchConversation[0]['_id']});
        res.send(messages);
        
        
    } catch (error) {
        res.send(error.message);
    }
};


module.exports = {sendMessage, fetchMessage};