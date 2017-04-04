/**
 * Initialsing a subscriber for verifying the session for a user
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function verifyCurrentUserSession(userEntityTopics, userClient) {

  /**
   *
   * Handling the verification of the current logged in user session
   *
   * @returns {*}
   */
  return function handleVerifyCurrentUserSession() {
    return userClient.verify();
  };
};