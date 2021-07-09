module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/mernblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
