var CONSTANTS = require('../../../constants');
var _ = require('lodash');

/**
 * Initialising a subscriber for Updating users.
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function updateUserSubscriber(userEntityTopics, userClient) {

  /**
   *
   * Handling the updating of users
   *
   * @param {object} parameters
   * @param {Object} parameters.userToUpdate                 - The user to be updated
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleUpdateUserTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var userUpdateErrorTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var userCreateDoneTopic = userEntityTopics.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    if (!_.isPlainObject(parameters.userToUpdate)) {
      return self.mediator.publish(userUpdateErrorTopic, new Error("Invalid Data To Update A User."));
    }

    userClient.update(parameters.userToUpdate)
      .then(function(updatedUser) {
        self.mediator.publish(userCreateDoneTopic, updatedUser);
      }).catch(function(error) {
        self.mediator.publish(userUpdateErrorTopic, error);
      });
  };
};