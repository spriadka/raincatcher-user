var _ = require('lodash');
var Promise = require('bluebird');

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
   * @returns {*}
   */
  return function handleUpdateGroupTopic(parameters) {
    parameters = parameters || {};
    if (!_.isPlainObject(parameters.groupToUpdate)) {
      return Promise.reject(new Error("Invalid Data To Update A Group."));
    }

    return groupClient.update(parameters.groupToUpdate);
  };
};