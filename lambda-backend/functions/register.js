const util = require('../helpers/utils/util')

const userDB = require('../helpers/dbHelpers/users')

const bcrypt = require('bcryptjs')

exports.register = async (user) => {
  const id = Math.floor(Math.random() * 1000000000).toString()
  const email = user.email
  const first_name = user.first_name
  const last_name = user.last_name
  const phone_number = user.phone_number
  const job = user.job
  const password = user.password

  const address = user.address
  const city = user.city
  const country = user.country
  const postal_code = user.postal_code

  const timestamp = util.buildTimestamps();


  const dynamoUser = await userDB.getUser(email)

  if (dynamoUser && dynamoUser.email) {
    return util.buildResponse(401, {
      message: 'User already exists',
    })
  }
  const encryptedPassword = bcrypt.hashSync(password.trim(), 10)

  const userInfo = {
    id: id,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    job: job,
    createdAt: timestamp,
    updatedAt: timestamp,
    password: encryptedPassword,
  }
  const locationInfo = {
    address: address,
    city: city,
    country: country,
    postal_code: postal_code,
  }

  const savedUserResponse = await userDB.saveUser(userInfo, locationInfo)

  if (!savedUserResponse) {
    return util.buildResponse(503, { message: savedUserResponse })
  }

  return util.buildResponse(200, { email: email })
}