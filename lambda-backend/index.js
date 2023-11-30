const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";
const listPath = "/list"

const registerService = require("./functions/register");

const loginService = require("./functions/login");

const verifyService = require("./functions/verify");

const listService = require("./functions/listUsers")

const listUserByEmail = require("./functions/getUserByEmail")

const util = require("./helpers/utils/util");

exports.handler = async (event) => {
    console.log(" Request Event : ", event);
    const {httpMethod, resource} = event;
    const requestBody = JSON.parse(event.body);
    let response;
    switch (true) {
        case httpMethod === "POST" && resource === registerPath:
            response = await registerService.register(requestBody);
            break;
        case httpMethod === "POST" && resource === loginPath:
            response = await loginService.login(requestBody);
            break;
        case httpMethod === "POST" && resource === verifyPath:
            response = await verifyService.verify(requestBody);
            break;
        case httpMethod === "GET" && resource === listPath:
            response = await listService.listUsers(requestBody);
            break;
        case httpMethod === "POST" && resource === listPath:
            response = await listUserByEmail.getUserByEmail(requestBody);
            break;
        default:
            response = util.buildResponse(404, "404 Not Found ");
    }
    return response;
};
