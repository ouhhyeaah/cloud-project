const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/users");

exports.listUsers = async (e) => {
    const listUsers = await userDB.getUsers();
    return util.buildResponse(200, listUsers)
}