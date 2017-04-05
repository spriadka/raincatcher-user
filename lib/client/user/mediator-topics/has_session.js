
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
   * @returns {*}
   */
  return function handleHasSession() {
    return userClient.hasSession();
  };
};