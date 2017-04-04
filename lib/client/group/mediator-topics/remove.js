
/**
 * Initialsing a subscriber for Removing groups.
 *
 * @param {object} groupEntityTopics
 * @param {GroupClient} groupClient - The User Client
 */
module.exports = function listGroupsSubscriber(groupEntityTopics, groupClient) {

  /**
   *
   * Handling the listing of groups
   *
   * @param {object} parameters
   * @param {String} parameters.groupToRemove               - The group to remove
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleRemoveGroupsTopic(parameters) {
    parameters = parameters || {};

    return groupClient.delete(parameters.groupToRemove);
  };
};