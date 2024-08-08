const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({

    members:{
        type: Array,
    }
    
},{timestamps: true, versionKey:false});

const conversationModel = mongoose.model('conversations', conversationSchema);

module.exports = conversationModel;