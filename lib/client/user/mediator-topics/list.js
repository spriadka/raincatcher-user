
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
   * @returns {*}
   */
  return function handleListUsersTopic() {
    return userClient.list();
  };
};