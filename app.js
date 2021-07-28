const {User }= require('./models')
const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const postRouter = require('./routes/post')
const userRouter =  require('./routes/user')

app.use(express.json())

app.use('/api/posts', postRouter)
app.use('/api/user', userRouter)



module.exports = app