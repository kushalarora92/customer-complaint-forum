const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const complaintSchema = Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'inprogress', 'closed'],
        default: 'new'
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    heading: {
        type: String,
        required: true
    },
    description: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Complaint = module.exports = mongoose.model('Complaint', complaintSchema);

