var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for Listing users.
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The client for accessing user data.
 */
module.exports = function listUsersSubscriber(userEntityTopics, userClient) {

  /**
   *
   * Handling the listing of users
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleListUsersTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var userListErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    var userListDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    userClient.list()
      .then(function(arrayOfUsers) {
        self.mediator.publish(userListDoneTopic, arrayOfUsers);
      }).catch(function(error) {
        self.mediator.publish(userListErrorTopic, error);
      });
  };
};