
/**
 * Initialsing a subscriber for Reading groups.
 *
 * @param {object} groupEntityTopics
 * @param {GroupClient} groupClient - The User Client
 */
module.exports = function listUsersSubscriber(groupEntityTopics, groupClient) {

  /**
   *
   * Handling the listing of groups
   *
   * @param {object} parameters
   * @param {String} parameters.id               - The ID of the group to read
   * @returns {*}
   */
  return function handleReadUsersTopic(parameters) {
    parameters = parameters || {};
    return groupClient.read(parameters.id);
  };
};