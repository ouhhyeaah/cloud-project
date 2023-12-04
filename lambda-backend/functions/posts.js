const util = require('../helpers/utils/util')

const postsHelper = require('../helpers/dbHelpers/posts')

exports.getPosts = async () => {
  const posts = await postsHelper.getPosts()

  return util.buildResponse(200, posts)
}

exports.post = async (post) => {

  const date = new Date()

  const postData = {
    email: post.email,
    title: post.title,
    description: post.description,
    createdAt: util.buildTimestamps(),
  }

  const savedPost = await postsHelper.savePost(postData)

  if (!savedPost) {
    return util.buildResponse(503, { message: savedPost, step: postData })
  }
  return util.buildResponse(200, { email: post.email, title: post.title, description: post.description })
}