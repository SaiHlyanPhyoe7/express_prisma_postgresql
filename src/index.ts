import express from 'express';
const app = express()
const routes = require('./routes/index.route')
app.use(express.json())

app.use(routes)

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
