var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for Reading users.
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function readCurrentLoggedInUser(userEntityTopics, userClient) {

  /**
   *
   * Handling the reading of the current logged in user.
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleReadCurrentLoggedInUser(parameters) {
    var self = this;
    parameters = parameters || {};
    var readProfileDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.READ_PROFILE, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    var readProfileErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.READ_PROFILE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    userClient.getProfile()
      .then(function(userProfile) {
        self.mediator.publish(readProfileDoneTopic, userProfile);
      }).catch(function(error) {
        self.mediator.publish(readProfileErrorTopic, error);
      });
  };
};