const { conversationController, getAllConversationsById } = require("../Controller/conversationController");
const { sendMessage, fetchMessage } = require("../Controller/messageController");
const { getOthersPeople } = require("../Controller/userController");

const conversationRoute = require("express").Router();

conversationRoute.post("/conversation/create/:user1/:user2",conversationController);

conversationRoute.get("/getAllConversationsById/:id", getAllConversationsById);

conversationRoute.get("/getMessagesById/:id1/:id2", fetchMessage);

conversationRoute.post("/send/message/:id",sendMessage);

conversationRoute.get("/getOthersPeople/:id", getOthersPeople);


module.exports = conversationRoute;