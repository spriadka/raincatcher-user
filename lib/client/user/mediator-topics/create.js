var _ = require('lodash');
var Promise = require('bluebird');

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
    parameters = parameters || {};
    if (!_.isPlainObject(parameters.userToCreate)) {
      return Promise.reject(new Error("Invalid Data To Create A User."));
    }

    return userClient.create(parameters.userToCreate);
  };
};