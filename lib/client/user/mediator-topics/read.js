
/**
 * Initialsing a subscriber for Reading users.
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
   * @param {String} parameters.id               - The ID of the user to read
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleReadUsersTopic(parameters) {
    parameters = parameters || {};
    return userClient.read(parameters.id);
  };
};