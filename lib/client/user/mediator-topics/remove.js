var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for Removing a single user.
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function listUsersSubscriber(userEntityTopics, userClient) {

  /**
   *
   * Handling the listing of users
   *
   * @param {object} parameters
   * @param {String} parameters.userToRemove               - The user to remove
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleRemoveUsersTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var userRemoveErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var userRemoveDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    userClient.delete(parameters.userToRemove)
      .then(function() {
        self.mediator.publish(userRemoveDoneTopic);
      }).catch(function(error) {
        self.mediator.publish(userRemoveErrorTopic, error);
      });
  };
};