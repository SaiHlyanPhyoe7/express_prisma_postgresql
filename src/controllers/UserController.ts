import { Post, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

type newPost = {
	title : string,
	content : string,
	publish? : boolean,
	authorEmail? : string
}

type newUser = {
	email : string,
	name? : string
}

module.exports.getUsers = async (req: null, res: { json: (arg0: User[]) => void; })=>{
	const users = await prisma.user.findMany()
	res.json(users)
}

module.exports.getFeed = async (req: null, res: { json: (arg0: (Post & { author: User | null; })[]) => void; })=>{
	const posts = await prisma.post.findMany({
		where: {published: true},
		include: {author: true}
	})
	res.json(posts)
}


module.exports.getPost = async (req: { params: { id: number; }; },res: { json: (arg0: Post | null) => void; })=>{
	const {id} = req.params
	const post = await prisma.post.findUnique({
		where: {id: Number(id)}
	})
	res.json(post)
}


module.exports.addUser = async (req: { body: newUser; },res: { json: (arg0: User) => void; })=>{
	console.log(req.body)
	const result = await prisma.user.create({
		data: {...req.body}
	})
	res.json(result)
}


module.exports.addPost = async(req: { body: newPost },res: { json: (arg0: Post) => void; })=>{
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
}


module.exports.addPublicPost = async (req: { params: { id: number; }; },res: { json: (arg0: Post) => void; })=>{
	const {id} = req.params
	const post = await prisma.post.update({
		where: {id: Number(id)},
		data: {published: true}
	})
	res.json(post)
}


module.exports.deletePost = async (req: { params: { id: number; }; },res: { json: (arg0: Post) => void; })=>{
	const {id} = req.params
	const post = await prisma.post.delete({
		where: {id: Number(id)}
	})
	res.json(post)
}