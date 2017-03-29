var CONSTANTS = require('../../../constants');

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
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleReadUsersTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var groupReadErrorTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.ERROR_PREFIX, parameters.topicUid);
    var groupReadDoneTopic = groupEntityTopics.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.DONE_PREFIX, parameters.topicUid);

    groupClient.read(parameters.id)
      .then(function(group) {
        self.mediator.publish(groupReadDoneTopic, group);
      }).catch(function(error) {
        self.mediator.publish(groupReadErrorTopic, error);
      });
  };
};