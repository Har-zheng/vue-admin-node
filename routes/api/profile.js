// @login & register
const express = require('express')
const router = express.Router();
const Profile = require('../../models/Profile')
const passport = require('passport')

// &route GET api/profiles/register
// @desc 返回的请求的json数据
// @access 私有 共有?
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works' })
})
// &route POST api/profiles/add
// @desc 返回的请求的json数据
// @access Private
router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFiles = {};
  if (req.body.type) profileFiles.type = req.body.type;
  if (req.body.describe) profileFiles.describe = req.body.describe;
  if (req.body.income) profileFiles.income = req.body.income;
  if (req.body.expend) profileFiles.expend = req.body.expend;
  if (req.body.cash) profileFiles.cash = req.body.cash;
  new Profile(profileFiles).save().then(profile => {
    res.json(profile);
  })
})

// &route GET api/profiles
// @desc 获取所有信息
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.find().then(profile => {
    if (!profile) {
      return res.status(404).json('没有任何东西!')
    }
    res.json(profile)
  }).catch(err => console.log(err))
})

// &route GET api/profiles/:id
// @desc 获取单个信息
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id }).then(profile => {
    if (!profile) {
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  }).catch(err => res.status(404).json('没有任何内容'))
})

// &route GET api/profiles/edit/:id
// @desc 编辑信息
// @access Private

router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFiles = {};
  if (req.body.type) profileFiles.type = req.body.type;
  if (req.body.describe) profileFiles.describe = req.body.describe;
  if (req.body.income) profileFiles.income = req.body.income;
  if (req.body.expend) profileFiles.expend = req.body.expend;
  if (req.body.cash) profileFiles.cash = req.body.cash;

  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFiles },
    { new: true }
  ).then(profile => res.json(profile))
})
// &route GET api/profiles/edit/:id
// @desc 删除信息
// @access Private

router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  // const profileFiles = {};
  // if (req.body.type) profileFiles.type = req.body.type;
  // if (req.body.describe) profileFiles.describe = req.body.describe;
  // if (req.body.income) profileFiles.income = req.body.income;
  // if (req.body.expend) profileFiles.expend = req.body.expend;
  // if (req.body.cash) profileFiles.cash = req.body.cash;

  Profile.findByIdAndRemove(
    { _id: req.params.id }
  ).then(profile => {
    profile.save().then(profile => res.json('删除成功'))
  }).catch(err => res.status(404).json('删除失败'))
})

module.exports = router;