// @flow

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import { POST_TAG, USER_TAG } from '../db/model'
import { __post__ } from '../../shared/default'
import { SECRET, saveImageURL } from '../../shared/config'
import renderApp from '../render-app'
// import { saveImageURL } from '../../../path-config'

const Post = mongoose.model(POST_TAG)
const User = mongoose.model(USER_TAG)

// create a new post
export const createPost = (req, res) => {
  const { token, post } = req.body

  console.log(`Creating post ${JSON.stringify(post)}`)

  // check token
  const user = jwt.verify(token, SECRET)
  if (!user) {
    console.log('Unauthorized poster!')
    return res.status(401).json({ message: 'Unauthorized poster.' })
  }

  const newPost = new Post({
    title: post.title,
    image: post.image,
    content: post.content,
    poster: user._id,
    posterName: user.name,
    date: Date.now(),
  })

  newPost.save((err, post) => {
    if (err) {
      console.log('Error saving post')
      return res.status(400).send({ message: err })
    }
    console.log('Post saved successfully')
    User.findByIdAndUpdate(
      user._id,
      { $push: { posts: newPost._id } },
      (err2, doc) => {
        if (err2) {
          console.log(`Error updating user: ${err2}`)
          return res.status(400).json({ message: err2 })
        }
        console.log('Post entered successfully')
        return res.status(200).json({ message: 'Post made successfully!', _id: newPost._id })
      },
    )
  })
}

// edit existing post
export const editPost = (req, res) => {
  const { token, post } = req.body

  // check token
  const user = jwt.verify(token, SECRET)
  if (!user) return res.status(401).json({ message: 'Unauthorized updater.' })

  // console.log(`Editing post ${post._id}`)
  // console.log(`Post has image ${JSON.stringify(post.image)}`)
  if (post.image) {
    Post.findByIdAndUpdate(
      post._id,
      {
        title: post.title,
        image: true,
        content: post.content,
      },
      (err, doc) => {
        if (err) return res.status(500).send({ message: err})
        if (doc.poster !== user._id) return res.status(401).json({ message: 'Unauthorized updater.' })
        // console.log(`Post ${doc} updated successfully!`)
        return res.status(200).json({ message: 'Post updated successfully!', _id: doc._id })
      },
    )
  } else {
    Post.findByIdAndUpdate(
      post._id,
      {
        title: post.title,
        content: post.content,
      },
      (err, doc) => {
        if (err) return res.status(500).send({ message: err})
        if (doc.poster !== user._id) return res.status(401).json({ message: 'Unauthorized updater.' })
        // console.log(`Post ${doc._id} updated successfully!`)
        return res.status(200).json({ message: 'Post updated successfully!', _id: doc._id })
      },
    )
  }

}

// delete existing post
export const deletePost = (req, res) => {
  const { token, postId } = req.body
  console.log(`Trying to delete post ${postId}`)

  // check token
  const user = jwt.verify(token, SECRET)
  if (!user) return res.status(401).json({ message: 'Unauthorized updater.' })

  Post.findById(postId).remove((err) => {
    if (err) {
      console.log('Error deleting post.')
      return res.status(500).send({ message: err })
    }
    console.log('Post deleted succesfully.')
    User.findByIdAndUpdate(
      user._id,
      { $pull: { posts: postId } },
      (err) => {
        if (err) {
          console.log('Error updating user.')
          return res.status(500).send({ message: err })
        }
        console.log('User updated successfully.')
        return res.status(200).json({ ok: true, message: 'Post deleted successfully!' })
      },
    )
  })
}

// get json for a specific post
export const getPostJson = (req, res) => {
  const { id } = req.body
  console.log(`Trying to get JSON for ${id}`)
  Post.findById(id, (err, doc) => {
    // console.log(`Got JSON for ${JSON.stringify(doc)}`)
    if (err) {
      console.log(err)
      return res.status(500).send({ message: err })
    }
    return res.status(200).json(doc)
  })
}

// get the json data for a list of posts
export const getPostListJson = (req, res) => {
  const { start, end } = req.body
  // console.log(`Fetching posts ${start} to ${end}.`)
  // const start = currentPage * amountToDisplay
  // const end = start + amountToDisplay

  Post.find({}).sort('-date').exec((err, docs) => {
    if (err) return res.status(500).send({ message: err})
    // console.log(`Total posts: ${docs.length}`)
    res.status(200).json({
      ok: true,
      posts: docs.slice(start, end),
      total: docs.length,
    })
  })
}

export const getPostPage = (req, res) => {
  const amntToDisplay = 5
  const start = (req.params.pageNum - 1) * amntToDisplay
  const end = start + amntToDisplay

  Post.find({}).sort('-date').exec((err, docs) => {
    if (err) return res.status(500).send({ message: err })
    return res.status(200).send(renderApp(req.url, { posts: { posts: docs.slice(start, end), total: docs.length } }))
  })
}

export const uploadFile = (req, res) => {
  console.log(`Attempting to upload file to ${saveImageURL(req.body.filename)}`)
  const imageFile = req.files.file

  imageFile.mv(saveImageURL(req.body.filename), (err) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    console.log(`File should be uploaded successfully at ${saveImageURL(req.body.filename)}`)
    return res.status(200).json({ok: true, message: 'Image uploaded successfully.'})
  })
}