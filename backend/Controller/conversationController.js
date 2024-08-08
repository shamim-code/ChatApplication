const conversationModel = require("../Model/conversationModel");


const conversationController = async(req, res) => {

    const {user1, user2} = req.params;

    try {
        const newConversation = await conversationModel({members: [user1, user2]});
        await newConversation.save();
        res.send(newConversation);
    } catch (error) {
        res.send(error.message);
    }
};


const getAllConversationsById = async (req, res) => {
    const userId = req.params.id;

    try {
        const conversations = await conversationModel.find({ members: userId });
        const filteredConversations = conversations.map(conversation => {
            const otherMemberId = conversation.members.find(member => member !== userId);
            return {
                _id: conversation._id,
                member: otherMemberId,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt
            };
        });

        res.send(filteredConversations);
    } catch (error) {
        res.send(error.message);
    }
};


module.exports = { conversationController , getAllConversationsById };
