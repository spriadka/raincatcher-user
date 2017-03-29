var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for authenticating a user
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function authenticateUser(userEntityTopics, userClient) {

  /**
   *
   * Handling the authenitcation of a user login.
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @param {string}        parameters.username  - The username to log in as
   * @param {string}        parameters.password  - The password to use to log in
   * @returns {*}
   */
  return function handleAuthenticateUser(parameters) {
    var self = this;
    parameters = parameters || {};
    var authenticateDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.AUTHENTICATE, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    var authenticateErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.AUTHENTICATE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    userClient.auth(parameters.username, parameters.password)
      .then(function(authResponse) {
        self.mediator.publish(authenticateDoneTopic, authResponse);
      }).catch(function(errMsg) {
        self.mediator.publish(authenticateErrorTopic, errMsg);
      });
  };
};