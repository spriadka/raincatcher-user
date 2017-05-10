var sessionCache = require("./middleware/sessionCache");
var Promise = require("bluebird");
var sessionApi = {};

/**
 * Api for user cache management
 *
 * @param clientMbaasApi
 * @returns {Object} api object
 */
module.exports = function(clientMbaasApi) {
  sessionApi.mbaasApi = clientMbaasApi;
  Promise.promisifyAll(sessionApi, {suffix: "Promise"});
  return sessionApi;
};

/**
 * Retrieves ID of current logged user
 *
 * @param sessionToken sessionToken of the logged user
 */
sessionApi.getUserIdForSession = function(sessionToken, callback) {
  sessionCache.checkSession(sessionApi.mbaasApi, sessionToken, function(err, cachedObj) {
    if (err) {
      return callback(err);
    }
    if (cachedObj && cachedObj.session) {
      var session = JSON.parse(cachedObj.session);
      return callback(null, session.userId);
    }
    callback("No session");
  });
};


