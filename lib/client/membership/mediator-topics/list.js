var CONSTANTS = require('../../../constants');

/**
 * Initialsing a subscriber for Listing group memberships.
 *
 * @param {object} membershipEntityTopics
 * @param {MembershipClient} membershipClient - The client for accessing group data.
 */
module.exports = function listMembershipSubscriber(membershipEntityTopics, membershipClient) {

  /**
   *
   * Handling the listing of group memberships
   *
   * @param {object} parameters
   * @param {string/number} parameters.topicUid  - (Optional)  A unique ID to be used to publish completion / error topics.
   * @returns {*}
   */
  return function handleListGroupsTopic(parameters) {
    var self = this;
    parameters = parameters || {};
    var membershipListErrorTopic = membershipEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX, parameters.topicUid);

    var membershipListDoneTopic = membershipEntityTopics.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX, parameters.topicUid);
    membershipClient.list()
      .then(function(arrayOfMemberships) {
        self.mediator.publish(membershipListDoneTopic, arrayOfMemberships);
      }).catch(function(error) {
        self.mediator.publish(membershipListErrorTopic, error);
      });
  };
};