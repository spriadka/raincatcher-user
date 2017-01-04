var MongoClient = require('mongodb').MongoClient;
module.exports = {
  init: function(expressConfig, session, cb) {
    var self = this;
    var MongoStore = require('connect-mongo')(session);
    MongoClient.connect(expressConfig.config.url, function(err, mongo) {
      if (err) {
        return cb(err);
      }
      self.store = new MongoStore({db: mongo});
      self.db = mongo;
      return cb(null);
    });
  },
  verifySession: function(token, cb) {
    this.db.collection('sessions').find({
      '_id': {'$eq': token}
    }, function(err, doc) {
      var valid = !err && doc && doc.expires < new Date();
      return cb(err, valid);
    });
  },
  revokeSession: function(token, cb) {
    this.db.collection('sessions').deleteOne({
      '_id': {'$eq': token}
    }, cb);
  },
  defaultConfig: {
    db: 'session',
    url: 'mongodb://localhost:27017/raincatcher-demo-auth-session-store'
  }
};