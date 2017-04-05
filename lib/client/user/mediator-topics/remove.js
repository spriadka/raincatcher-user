
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
   * @returns {*}
   */
  return function handleRemoveUsersTopic(parameters) {
    parameters = parameters || {};
    return userClient.delete(parameters.userToRemove);
  };
};