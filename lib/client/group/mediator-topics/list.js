
/**
 * Initialising a subscriber for Listing groups.
 *
 * @param {object} groupEntityTopics
 * @param {GroupClient} groupClient - The client for accessing group data.
 */
module.exports = function listGroupsSubscriber(groupEntityTopics, groupClient) {

  /**
   *
   * Handling the listing of groups
   *
   * @returns {*}
   */
  return function handleListGroupsTopic() {
    return groupClient.list();
  };
};