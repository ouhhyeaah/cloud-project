const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/users");
const locationDB = require("../helpers/dbHelpers/location");

exports.getUserByEmail = async (user) => {

    const userTableInformation = await userDB.getUser(user.email);
    const userLocationInfo = await locationDB.getLocationInfo(user.email);
    const userInformation = {
        ...userTableInformation,
        ...userLocationInfo
    }

    if (!userInformation) {
        return util.buildResponse(404, "User not found")
    }
    return util.buildResponse(200, userInformation);
}