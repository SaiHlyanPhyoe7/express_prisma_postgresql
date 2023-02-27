import {Router} from 'express'
const {getUsers,getFeed,getPost,addUser,addPost,addPublicPost,deletePost} = require("../controllers/UserController")

const router = Router()

// Grouping the routes is better way to handle routes 

// router.use('/users')
// 	.get(getUsers)
// 	.post(addUser)

// router.use('/users/:id')

// router.use('/feed')
// .


router.get('/users',getUsers)
router.get('/feed',getFeed)
router.get(`/post/:id`,getPost)
router.post(`/user`,addUser)
router.post(`/post`,addPost)
router.put(`/post/publish/:id`,addPublicPost)
router.delete(`/post/:id`,deletePost)

module.exports = router