var CONSTANTS = require('../../../constants');
var _ = require('lodash');

/**
 * Initialising a subscriber for Updating groups.
 *
 * @param {object} groupEntityTopics
 * @param {GroupClient} groupClient - The Group Client
 */
module.exports = function updateGroupSubscriber(groupEntityTopics, groupClient) {

  /**
   *
   * Handling the updating of groups
   *
   * @param {object} parameters
   * @param {Object} parameters.groupToUpdate                 - The group to be updated
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleUpdateGroupTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var groupUpdateErrorTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var groupCreateDoneTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    if (!_.isPlainObject(parameters.groupToUpdate)) {
      return self.mediator.publish(groupUpdateErrorTopic, new Error("Invalid Data To Update A Group."));
    }

    groupClient.update(parameters.groupToUpdate)
      .then(function(updatedGroup) {
        self.mediator.publish(groupCreateDoneTopic, updatedGroup);
      }).catch(function(error) {
        self.mediator.publish(groupUpdateErrorTopic, error);
      });
  };
};