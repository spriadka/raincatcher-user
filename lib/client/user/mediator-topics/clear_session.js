var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for clearing a user session
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function clearSession(userEntityTopics, userClient) {

  /**
   *
   * Handling clearing a user session
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleClearSession(parameters) {
    var self = this;
    parameters = parameters || {};
    var clearSessionDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.CLEAR_SESSION, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    var clearSessionErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.CLEAR_SESSION, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    userClient.clearSession()
      .then(function() {
        self.mediator.publish(clearSessionDoneTopic);
      }).catch(function(error) {
        self.mediator.publish(clearSessionErrorTopic, error);
      });
  };
};