var CONSTANTS = require('../../../constants');
var _ = require('lodash');

/**
 * Initialsing a subscriber for Creating groups.
 *
 * @param {object} groupEntityTopics
 * @param {GroupClient} groupClient - The Group Client
 */
module.exports = function createGroupSubscriber(groupEntityTopics, groupClient) {

  /**
   *
   * Handling the creation of groups
   *
   * @param {object} parameters
   * @param {Object} parameters.groupToCreate                 - The group to be created
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleCreateGroupTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var groupCreateErrorTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var groupCreateDoneTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    if (!_.isPlainObject(parameters.groupToCreate)) {
      return self.mediator.publish(groupCreateErrorTopic, new Error("Invalid Data To Create A Group."));
    }

    groupClient.create(parameters.groupToCreate)
      .then(function(createdGroup) {
        self.mediator.publish(groupCreateDoneTopic, createdGroup);
      }).catch(function(error) {
        self.mediator.publish(groupCreateErrorTopic, error);
      });
  };
};