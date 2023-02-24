import { PrismaClient } from '@prisma/client';

import express from 'express';
const prisma = new PrismaClient()
const app = express()

// add the express.json() middleware to ensure JSON data can be processed properly by Express.
app.use(express.json())

// get all users
app.get('/users',async (req,res)=>{
	const users = await prisma.user.findMany()
	res.json(users)
})

// get posts
app.get('/feed',async (req,res)=>{
	const posts = await prisma.post.findMany({
		where: {published: true},
		include: {author: true}
	})
	res.json(posts)
})

// get post with params
app.get(`/post/:id`,async (req,res)=>{
	const {id} = req.params
	const post = await prisma.post.findUnique({
		where: {id: Number(id)}
	})
	res.json(post)
})

// create new user
app.post(`/user`, async (req,res)=>{
	const result = await prisma.user.create({
		data: {...req.body}
	})
	res.json(result)
})

// create new post
app.post(`/post`,async(req,res)=>{
	const {title,content,authorEmail}= req.body
	const result = await prisma.post.create({
		data: {
			title,
			content,
			published: false,
			author: {
				connect: {
					email: authorEmail
				}
			}
		}
	})
	res.json(result)
})

// update post
app.put(`/post/publish/:id`,async (req,res)=>{
	const {id} = req.params
	const post = await prisma.post.update({
		where: {id: Number(id)},
		data: {published: true}
	})
	res.json(post)
})

// delete post
app.delete(`/post/:id`,async (req,res)=>{
	const {id} = req.params
	const post = await prisma.post.delete({
		where: {id: Number(id)}
	})
	res.json(post)
})

// server start with npx ts-node src/index.ts

app.listen(3000,()=>
console.log('REST API server ready at: http://localhost:3000')
)




// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// async function main() {
// 	// prisma client queries will go here
// 	const newUser = await prisma.user.create({
// 		data: {
// 			name: 'Alice',
// 			email: 'alice@prisma.io',
// 			posts: {
// 				create: {
// 					title: 'Hello World'
// 				}
// 			}
// 		}
// 	})
// 	console.log('Created new User:', newUser)

// 	const allUsers = await prisma.user.findMany({
// 		include: {posts:true}
// 	})
// 	console.log("All users:")
// 	console.dir(allUsers, {depth: null})
// }

// main()
// .catch((e)=>console.error(e))
// .finally(async()=>await prisma.$disconnect())
