const conversationModel = require("../Model/conversationModel");
const messageModel = require("../Model/messageModel");

const sendMessage =async(req, res)=>{

    const conversationId = req.params.id;

    const {message, senderId, receiverId} = req.body;

    try {

        const newConversation = await messageModel({consversationId:conversationId, sender: senderId, receiver: receiverId, message:message});
        await newConversation.save();
        res.send(newConversation);
        
    } catch (error) {
        res.send(error.message);
    }
}


const fetchMessage = async(req, res)=>{

    const user1 = req.params.id1;
    const user2 = req.params.id2;


    try {
        const searchConversation = await conversationModel.findOne({members:[user1,user2]});
        const messages = await messageModel.find({consversationId: searchConversation['_id']});
        res.send(messages);
        
    } catch (error) {
        res.send(error.message);
    }
};


module.exports = {sendMessage, fetchMessage};