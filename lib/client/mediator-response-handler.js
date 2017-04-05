var CONSTANTS = require('../constants');

/**
 * Handling the mediator response from the client promise.
 *
 * @param subscriber
 * @param handler
 * @param topic
 * @returns {*}
 */
module.exports = function mediatorResponseHandler(subscriber, handler, topic) {

  return function(parameters) {
    parameters = parameters || {};

    var promise = handler.apply(this, arguments);

    if (!parameters.topicUid) {
      return promise;
    }

    promise.then(function(returnValue) {
      subscriber.mediator.publish(subscriber.getTopic(topic, CONSTANTS.DONE_PREFIX, parameters.topicUid), returnValue);
    }).catch(function(err) {
      subscriber.mediator.publish(subscriber.getTopic(topic, CONSTANTS.ERROR_PREFIX, parameters.topicUid), err);
    });

    return null;
  };

};