const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true
    },
    hash: {
        type: String,
        required: true
    },
    acc_type: {
        type: String,
        enum: ['agent', 'customer'],
        default: 'customer'
    },
    complaints: [{
        type: Schema.Types.ObjectId,
        ref: 'Complaint'
    }],
    creation_date: {
        type: Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model('User', userSchema);

