const util = require("../helpers/utils/util");

const postsHelper = require("../helpers/dbHelpers/posts")

exports.getPosts = async () => {
    const posts = await postsHelper.getPosts();

    return util.buildResponse(200, posts)
}

exports.post = async (post) => {

    const postData = [post.title, post.title, post.description]
    const savedPost = await postsHelper.savePost(postData)

    if (!savedPost) {
        return util.buildResponse(503, { message: savedPost});
    }
    return util.buildResponse(200, { email: email, title: title, description:description });
}