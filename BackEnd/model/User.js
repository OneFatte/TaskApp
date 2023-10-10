const mongoose = require('mongoose');

const userSchema = {
    email: {
        type: String,
        required: true
    },
    descripcion: String,
    pass: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}

const User = mongoose.model('users', userSchema);

const validateUser = async (email, pass) => {
    const user = await User.find({ email: email })

    if (user.pass == pass) {
        return {
            email: user.email,
            name: user.name
        }
    } else {
        return null
    }

}

module.exports = {
    validateUser
}