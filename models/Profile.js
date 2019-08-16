const mongoose = require("mongoose")
const Schama = mongoose.Schema;
const ProfileSchama = new Schama({
  type: ({
    type: String,
    required: true
  }),
  describe: ({
    type: String,
    required: true
  }),
  incode: ({
    type: String,
    required: true
  }),
  expend: ({
    type: String,
    required: true
  }),
  cash: ({
    type: String,
    required: true
  }),
  remark: ({
    type: String
  }),
  date: ({
    type: Date,
    default: Date.now
  }),
})
module.exports = Profile = mongoose.model('Profile', ProfileSchama)