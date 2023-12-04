const userDB = require('../helpers/dbHelpers/users')
const bcrypt = require('bcryptjs')
const util = require('../helpers/utils/util')

exports.updateUser = async (user) => {

  const currentUser = await userDB.getUser(user.email)
  // INfo non modifiable
  const id = currentUser.id
  const email = currentUser.email
  const create_timestamp = currentUser.createdAt ;

  const first_name = user.first_name
  const last_name = user.last_name
  const phone_number = user.phone_number
  const job = user.job
  const updateTime = util.buildTimestamps();
  const password = user.password
  const encryptedPassword = bcrypt.hashSync(password.trim(), 10)

  const address = user.address
  const city = user.city
  const country = user.country
  const postal_code = user.postal_code

  const userInfo = {
    id: id,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    job: job,
    createdAt: create_timestamp,
    updatedAt: updateTime,
    password: encryptedPassword,
  }
  const locationInfo = {
    address: address,
    city: city,
    country: country,
    postal_code: postal_code,
  }

  const updatedUser = await userDB.updateUser(userInfo, locationInfo)

  if (!updatedUser) return util.buildResponse(503, { message: updatedUser })

  return util.buildResponse(200, { email: email, message: 'Update done! ' })

}