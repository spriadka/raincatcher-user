var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for logging out a user
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function hasSessionUser(userEntityTopics, userClient) {

  /**
   *
   * Handling logging out the current user.
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleHasSession(parameters) {
    var self = this;
    parameters = parameters || {};
    var hasSessionDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.HAS_SESSION, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    var hasSessionErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.HAS_SESSION, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    userClient.hasSession()
      .then(function(hasSession) {
        self.mediator.publish(hasSessionDoneTopic, hasSession);
      }).catch(function(error) {
        self.mediator.publish(hasSessionErrorTopic, error);
      });
  };
};