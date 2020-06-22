const express = require('express');

const PostsService = require('../services/posts.service');

const checkAuth = require('../middlewares/check-auth');
const extractFile = require('../middlewares/extract-file');

const router = express.Router();

router.get("", PostsService.getPosts);

router.get("/:id", PostsService.getPost);

router.post("", checkAuth, extractFile, PostsService.createPost);

router.put("/:id", checkAuth, extractFile, PostsService.updatePost);

router.delete("/:id", checkAuth, PostsService.deletePost);

module.exports = router;