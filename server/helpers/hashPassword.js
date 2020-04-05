const bcrypt = require('bcryptjs')

hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(+process.env.SALT)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, checkPassword }