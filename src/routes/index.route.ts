import {Router} from 'express'

const router = Router()

router.get('/users',)
router.get('/feed',)
router.get(`/post/:id`,)
router.post(`/user`,)
router.post(`/post`,)
router.put(`/post/publish/:id`)
router.delete(`/post/:id`,)

module.exports = router