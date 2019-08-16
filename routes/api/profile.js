// @login & register
const express = require('express')
const router = express.Router();
const Profile = require('../../models/Profile')
const passport = require('passport')

// &route GET api/users/register
// @desc 返回的请求的json数据
// @access 私有 共有?
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works' })
})

module.exports = router;