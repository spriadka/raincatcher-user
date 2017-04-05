
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
   * @returns {*}
   */
  return function handleClearSession() {
    return userClient.clearSession();
  };
};