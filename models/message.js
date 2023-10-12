
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    member_Username: {type: Schema.Types.ObjectId, ref: 'Member', required: true},
    message_title: {type: String, required: true, maxlength: 100},
    message_text: {type: String, required: true, maxlength: 100},
    message_timestamp: {type: Date, required: true, maxlength: 100},

});


// Export model.
module.exports = mongoose.model('Message', MessageSchema);