/**
 * Initialsing a subscriber for authenticating a user
 *
 * @param {object} userEntityTopics
 * @param {UserClient} userClient - The User Client
 */
module.exports = function authenticateUser(userEntityTopics, userClient) {

  /**
   *
   * Handling the authenitcation of a user login.
   *
   * @param {object} parameters
   * @param {string}        parameters.username  - The username to log in as
   * @param {string}        parameters.password  - The password to use to log in
   * @returns {*}
   */
  return function handleAuthenticateUser(parameters) {
    parameters = parameters || {};

    return userClient.auth(parameters.username, parameters.password);
  };
};