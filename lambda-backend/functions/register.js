const util = require("../helpers/utils/util");
const listUsers = require("./listUsers")

const userDB = require("../helpers/dbHelpers/users");

const bcrypt = require("bcryptjs");

exports.register = async (userInfo) => {

  // const last_name = userInfo.last_name;
  // const first_name = userInfo.first_name
  // const email = userInfo.email;
  // const phone_number = userInfo.phone_number;
  // const job = userInfo.job;
  // const password = userInfo.password;

  // const country = userInfo.country;
  // const address = userInfo.address;
  // const postal_code = userInfo.postal_code;
  // const city = userInfo.city;
  const name = userInfo.name;
  const username = userInfo.username;
  const password = userInfo.password;


  const dynamoUser = await userDB.getUser(username);
  if (dynamoUser && dynamoUser.username) {
    return util.buildResponse(401, {
      message: "User already exists",
    });
  }

  const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
  // const user = {
  //   last_name: last_name,
  //   first_name: first_name,
  //   email: email.toLowerCase(),
  //   phone_number: phone_number,
  //   job: job,
  //   password: encryptedPassword,
  // };
  const user = {
    name: name,
    username: username.toLowerCase(),
    password: encryptedPassword,
  }

  // const user_info = {
  //   country: country,
  //   address: address,
  //   postal_code: postal_code,
  //   city: city,
  // }

  const savedUserResponse = await userDB.saveUser(user);

  if (!savedUserResponse) {
    return util.buildResponse(503, { message: "server error" });
  }

  return util.buildResponse(200, { username: username });
};

// exports.getId = async () => {
//   const allUsers = listUsers.listUsers()
//   .then( (response) => {
//     current_id = 0 
//   })

//   current_id = allUsers.length()
//   return current_id + 1
// }