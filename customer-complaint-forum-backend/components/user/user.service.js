const jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    
    config = require('../../config.json'),
    userModel = require('./user.model');

module.exports = {
    authenticate,
    getById,
    getByEmail,
    create
}

async function authenticate({ email, password }) {
    const user = await userModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getById(id) {
    return await userModel.findById(id).select('-hash');
}

async function getByEmail(email) {
    const user = await userModel.findOne({ email });
    if (user) {
        const { hash, ...userWithoutHash } = user.toObject();
        return {
            ...userWithoutHash
        }
    }
}

async function create(userParam) {
    // validate
    if (await userModel.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new userModel(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}