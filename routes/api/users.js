// @login & register
const express = require('express')
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')

// &route GET api/users/register
// @desc 返回的请求的json数据
// @access 私有 共有?
router.get('/test', (req, res) => {
  res.json({
    msg: 'login works'
  })
})


// &route GET api/users/register
// @desc 返回的请求的json数据
// @access 私有 共有?
router.post("/register", (req, res) => {
  // 查询数据库中  是否已存在
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user) {
        return res.status(400).json('邮箱已注册!')
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })
        bcrypt.genSalt(10, function (err, salt) {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            identity: req.body.identity,
            avatar,
          })
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // console.log(err)
            // Store hash in your password DB.
            if (err) throw err
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    })
})
// &route GET api/users/login
// @desc 返回token
// @access 私有 共有?
// 查询数据库
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(400).json('用户不存在')
      }
      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMach => {
          if (isMach) {
            const rule = {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(rule, keys.secretOrkey, {
              expiresIn: 10
            }, (err, token) => {
              if (err) throw err;
              res.json({
                mes: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            return res.status(400).json('密码错误!')
          }
        })
    })
})
// &route GET api/users/login
// @desc 返回token
// @access Private
router.get('/curent', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    identity: req.user.identity
  })
})

module.exports = router;