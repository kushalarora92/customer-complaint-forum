const mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    commentModel = require('./comment.model');

module.exports = {
    create
};

async function create(params) {
    const comment = new commentModel(params);
    
    return await comment.save();
}