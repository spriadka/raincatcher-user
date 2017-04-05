var _ = require('lodash');
var topicHandlers = {
  list: require('./list')
};
var CONSTANTS = require('../../../constants');

var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');

var membershipSubscribers;

module.exports = {
  /**
   * Initialisation of all the topics that this module is interested in.
   *
   * @param mediator
   * @param {MembershipClient} membershipClient
   *
   * @returns {Topics|exports|module.exports|*}
   */
  init: function(mediator, membershipClient) {

    //If there is already a set of subscribers set up, then don't subscribe again.
    if (membershipSubscribers) {
      return membershipSubscribers;
    }

    membershipSubscribers = new MediatorTopicUtility(mediator);
    membershipSubscribers.prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.MEMBERSHIP_ENTITY_NAME);

    //Setting up subscribers to the membership topics.
    _.each(CONSTANTS.TOPICS, function(topicName) {
      if (topicHandlers[topicName]) {
        membershipSubscribers.on(topicName, topicHandlers[topicName](membershipSubscribers, membershipClient));
      }
    });

    return membershipSubscribers;
  },
  tearDown: function() {
    if (membershipSubscribers) {
      membershipSubscribers.unsubscribeAll();
      membershipSubscribers = null;
    }
  }
};