const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    member_first_name: {type: String, required: true, maxlength: 100},
    member_last_name: {type: String, required: true, maxlength: 100},
    member_username: {type: String, required: true, maxlength: 100},
    member_password: {type: String, required: true, maxlength: 100},
    member_password_confirm: {type: String, required: true, maxlength: 100},
    member_email: {type: String, required: true, maxlength: 100},
    membership_status: [
        { type: String, enum: ['Admin', 'Member'], default: ['Member'] }
    ]

});


// Export model.
module.exports = mongoose.model('Member', MemberSchema);

