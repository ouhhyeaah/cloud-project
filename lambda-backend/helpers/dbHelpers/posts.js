const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const postsTable = "posts";

exports.getPosts = async () => {
    const params = {
        TableName: postsTable,
    };
    return await dynamoDB
        .scan(params)
        .promise()
        .then(
            (response) => {
                return response.Items
            },
            (error) => {
                console.log("Error fetching user", error);
            }
        );
}

exports.savePost = async (post) => {
    const params = {
        TableName: postsTable,
        Key: {
            email: post.email,
        },
        Item: post,
    };

    return await dynamoDB
        .put(params)
        .promise()
        .then(
            (response) => {

            },
            (error) => {
                console.log("Error while saving the post!", error);
            }
        );
}