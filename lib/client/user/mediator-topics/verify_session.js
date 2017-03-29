var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for verifying the session for a user
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function verifyCurrentUserSession(userEntityTopics, userClient) {

  /**
   *
   * Handling the verification of the current logged in user session
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleVerifyCurrentUserSession(parameters) {
    var self = this;
    parameters = parameters || {};
    var verifySessionDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.VERIFY_SESSION, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    var readProfileErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.VERIFY_SESSION, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    userClient.verify()
      .then(function(sessionIsValid) {
        self.mediator.publish(verifySessionDoneTopic, sessionIsValid);
      }).catch(function(error) {
        self.mediator.publish(readProfileErrorTopic, error);
      });
  };
};