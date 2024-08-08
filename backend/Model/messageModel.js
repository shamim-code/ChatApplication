
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    consversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'conversations',
        required: true
    },
    message:{
        type: String,
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfos',
        required: true
    }
},{timestamps:true, versionKey:false})

const messageModel = mongoose.model('messages', messageSchema);

module.exports = messageModel;