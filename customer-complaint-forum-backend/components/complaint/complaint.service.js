const mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    complaintModel = require('./complaint.model'),
    commentService = require('../comment/comment.service');

module.exports = {
    create,
    getAll,
    updateStatus,
    addComment,
    getComplaintsByUser,
    getComplaintWithComments,
    getComplaintDetailsById
};

async function create(params) {
    const complaint = new complaintModel(params);

    await complaint.save();
}

async function updateStatus(id, params) {
    const complaint = await complaintModel.findById(id);

    if (!complaint) throw 'Complaint Not Found!';

    Object.assign(complaint, params);

    await complaint.save();
}

async function addComment(id, params) {
    const complaint = await complaintModel.findById(id);

    if (!complaint) throw 'Complaint Not Found!';

    const comment = await commentService.create(params);

    if (!comment) throw 'Invalid Comment';

    complaint.comments.push(comment._id);

    await complaint.save();
}

async function getAll() {
    return await complaintModel.find().sort({date_updated: -1}).populate('created_by').exec();
}

async function getComplaintsByUser(id) {
    return await complaintModel.find({created_by: id}).sort({date_updated: -1})
}

async function getComplaintWithComments(id) {
    return await complaintModel.find({created_by: id}).sort({date_updated: -1}).populate('comments').exec();
}

async function getComplaintDetailsById(id) {
    return await complaintModel.findOne({_id: id}).sort({date_updated: -1})
        .populate({
            path: 'comments',
            options: {
                sort: { date_created: -1 }
            },
            populate: {
                path: 'created_by'
            }
        }).exec();
}
