const util = require("../helpers/utils/util");

const userDB = require("../helpers/dbHelpers/users");

const bcrypt = require("bcryptjs");

exports.register = async (userInfo) => {


  const id = Math.floor(Math.random() * 1000000000).toString();
  const email = userInfo.email;
  const first_name = userInfo.first_name;
  const last_name = userInfo.last_name;
  const password = userInfo.password;
  const phone_number = userInfo.phone_number;


  const dynamoUser = await userDB.getUser(email);

  if (dynamoUser && dynamoUser.email) {
    return util.buildResponse(401, {
      message: "User already exists",
    });
  }
  const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
  const user = {
    id: id,
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: encryptedPassword,
    phone_number: phone_number,
  };

  const savedUserResponse = await userDB.saveUser(user);

  if (!savedUserResponse) {
    return util.buildResponse(503, { message: savedUserResponse});
  }

  return util.buildResponse(200, { email: email });
};

