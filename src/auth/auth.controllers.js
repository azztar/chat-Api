const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUserCredentials = async (email, password) => {

    const user = await findUserByEmail(email)
    const validatePassword = comparePassword(password, user.password)
    if(!validatePassword){
        return false
    }
    return user
}


module.exports = checkUserCredentials