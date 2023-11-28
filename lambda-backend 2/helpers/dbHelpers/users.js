// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const userTable = "userpro";

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

exports.saveUser = async (user) => {
  const params = {
    TableName: userTable,
    Key: {
      email: user.email,
    },
    Item: {
      email: user.email,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      password: user.password,
    },
  };
  return await dynamoDB
    .put(params)
    .promise()
    .then(
      (response) => {
        return true;
      },
      (error) => {
        console.log("Error saving user", error);
        //je veux pouvoir retourner le message d'erreur
        return error;
      }
    );
};
