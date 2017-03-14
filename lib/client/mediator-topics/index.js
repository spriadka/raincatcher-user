var _ = require('lodash');
var topicHandlers = {
  list: require('./list'),
  read: require('./read'),
  read_profile: require('./read_profile')
};
var CONSTANTS = require('../../constants');

var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');

var userSubscribers;

module.exports = {
  /**
   * Initialisation of all the topics that this module is interested in.
   * @param mediator
   * @returns {Topics|exports|module.exports|*}
   */
  init: function(mediator, userClient) {

    //If there is already a set of subscribers set up, then don't subscribe again.
    if (userSubscribers) {
      return userSubscribers;
    }

    userSubscribers = new MediatorTopicUtility(mediator);
    userSubscribers.prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.USER_ENTITY_NAME);

    //Setting up subscribers to the user topics.
    _.each(CONSTANTS.TOPICS, function(topicName) {
      if (topicHandlers[topicName]) {
        userSubscribers.on(topicName, topicHandlers[topicName](userSubscribers, userClient));
      }
    });

    return userSubscribers;
  },
  tearDown: function() {
    if (userSubscribers) {
      userSubscribers.unsubscribeAll();
    }
  }
};