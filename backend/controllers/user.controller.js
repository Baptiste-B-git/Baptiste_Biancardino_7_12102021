const UserModel = require('../models/user');

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select();
    res.status(200).json(users);
}