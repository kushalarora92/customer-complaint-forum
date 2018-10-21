const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const commentSchema = Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    complaint_id: {
        type: Schema.Types.ObjectId,
        ref: 'Complaint'
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);