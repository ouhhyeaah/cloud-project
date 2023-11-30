// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const locationTable = "location";

exports.getLocationInfo = async (email) => {
    const params = {
        TableName: locationTable,
        Key: {
            email: email,
        },
    };
    return await dynamoDB
        .get(params)
        .promise()
        .then(
        (response) => {
            return response.Item;
        },
        (error) => {
            console.log("Error fetching location", error);
            }
        );
}