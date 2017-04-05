var _ = require('lodash');
var Promise = require('bluebird');

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
   * @returns {*}
   */
  return function handleCreateGroupTopic(parameters) {
    parameters = parameters || {};

    if (!_.isPlainObject(parameters.groupToCreate)) {
      return Promise.reject(new Error("Invalid Data To Create A Group."));
    }

    return groupClient.create(parameters.groupToCreate);
  };
};