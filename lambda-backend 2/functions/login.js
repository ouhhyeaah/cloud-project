const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");
const userDB = require("../helpers/dbHelpers/users");

const bcrypt = require("bcryptjs");

exports.login = async (user) => {
  const email = user.email;

  const password = user.password;

  if (!email || !password) {
    return util.buildResponse(401, {
      message: "email and password is required",
    });
  }

  const dynamoUser = await userDB.getUser(email);
  if (!dynamoUser || !dynamoUser.email) {
    return util.buildResponse(401, {
      message: "username incorrect",
    });
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return util.buildResponse(401, {
      message: "Password is wrong",
    });
  }

  const userInfo = {
    email: dynamoUser.email,
    last_name: dynamoUser.last_name,
  };

  const token = auth.generateToken(userInfo);

  const response = {
    user: userInfo,
    token: token,
  };
  return util.buildResponse(200, response);
};

