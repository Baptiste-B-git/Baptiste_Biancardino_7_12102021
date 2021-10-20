const UserModel = require('../models').User;

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {email, username, password, bio, isAdmin} = req.body

    try {
        const user = await UserModel.create({
            email,
            username,
            password,
            bio,
            isAdmin
        });
        res.status(201).json({user})
    }
    catch(err) {
        res.status(200).send({ err })
    }
}