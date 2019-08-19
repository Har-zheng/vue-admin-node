const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
// 引入 users
const users = require('./routes/api/users.js')

// 引入 profile 
const profile = require('./routes/api/profile')

// DB config
const db = require('./config/keys.js').mongoURI;

const passport = require('passport')

// 使用 bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// content to mongodb
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongodb Successful connection'))
  .catch(err => console.log(err))

// 使用 passport
app.use(passport.initialize());
require("./config/passport")(passport)

app.get("/", (req, res) => {
  res.send('Hello world!')
})

// 使用  routes  
app.use("/api/usrs/", users)
app.use('/api/profiles', profile)

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server runing on port ${port}`)
})