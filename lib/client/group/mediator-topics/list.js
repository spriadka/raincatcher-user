var CONSTANTS = require('../../../constants');

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
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleListGroupsTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var groupListErrorTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    var groupListDoneTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    groupClient.list()
      .then(function(arrayOfGroups) {
        self.mediator.publish(groupListDoneTopic, arrayOfGroups);
      }).catch(function(error) {
        self.mediator.publish(groupListErrorTopic, error);
      });
  };
};