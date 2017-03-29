var CONSTANTS = require('../../../constants');
var _ = require('lodash');

/**
 * Initialsing a subscriber for Creating users.
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function createUserSubscriber(userEntityTopics, userClient) {

  /**
   *
   * Handling the creation of users
   *
   * @param {object} parameters
   * @param {Object} parameters.userToCreate                 - The user to be created
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleCreateUserTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var userCreateErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var userCreateDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    if (!_.isPlainObject(parameters.userToCreate)) {
      return self.mediator.publish(userCreateErrorTopic, new Error("Invalid Data To Create A User."));
    }

    userClient.create(parameters.userToCreate)
      .then(function(createdUser) {
        self.mediator.publish(userCreateDoneTopic, createdUser);
      }).catch(function(error) {
        self.mediator.publish(userCreateErrorTopic, error);
      });
  };
};