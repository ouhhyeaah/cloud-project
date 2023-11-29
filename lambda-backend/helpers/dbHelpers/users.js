// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const userTable = "userpro";
const locationTable = "location";

exports.getUser = async (email) => {
  const params = {
    TableName: userTable,
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
        console.log("Error fetching user", error);
      }
    );
};

exports.getUsers = async () => {
  const params = {
    TableName: userTable,
  };
  return await dynamoDB
    .scan(params)
    .promise()
    .then(
      (response) => {
        return response.Items;
      },
      (error) => {
        console.log("Error fetching users", error);
      }
    );
};
exports.saveUser = async (userInfo, locationInfo) => {
  // Info pour la table userpro
  const userParams = {
    TableName: userTable,
    Key: {
      email: userInfo.email,
    },
    Item: {
      email: userInfo.email,
      id: userInfo.id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone_number: userInfo.phone_number,
      password: userInfo.password,
    },
  };
  // Info pour la table location
  const locationParams = {
    TableName: locationTable,
    Key: {
      email: userInfo.email,
    },
    Item: {
      email: userInfo.email,
      address: locationInfo.address,
      city: locationInfo.city,
      country: locationInfo.country,
      postal_code: locationInfo.postal_code,
    },
  };
  try {
    // Utilisez batchWrite pour écrire simultanément dans les deux tables
    const result = await dynamoDB
        .batchWrite({
            RequestItems: {
                [userTable]: [{ PutRequest: { Item: userParams.Item } }],
                [locationTable]: [{ PutRequest: { Item: locationParams.Item } }],
            },
            })
          .promise();

    /*const result = await ddb
      .batchWriteItem({
        RequestItems: {
          [userTable]: [{ PutRequest: { Item: userParams.Item } }],
          [locationTable]: [{ PutRequest: { Item: locationParams.Item } }],
        },
      })
      .promise();*/

    console.log("Successfully saved user and location info", result);
    return true;
  } catch (error) {
    console.error("Error saving user and location info", error);
    return error;
  }
};
