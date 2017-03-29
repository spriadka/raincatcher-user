var CONSTANTS = require('../../../constants');

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
    var self = this;
    parameters = parameters || {};
    var groupRemoveErrorTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var groupRemoveDoneTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    groupClient.delete(parameters.groupToRemove)
      .then(function() {
        self.mediator.publish(groupRemoveDoneTopic);
      }).catch(function(error) {
        self.mediator.publish(groupRemoveErrorTopic, error);
      });
  };
};