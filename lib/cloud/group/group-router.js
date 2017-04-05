'use strict';

var express = require('express'),
  config = require('../../config/config-group');

var groupTopicResponseHandler = require('../topicResponseHandler');

/**
 * Function which initializes an express router to be used by the app.
 *
 * @param {GroupOperations} groupOperations  Object used for sending a request to a topic.
 * @returns {router}
 */
function initRouter(groupOperations) {
  var router = express.Router();

  router.route('/').get(groupTopicResponseHandler(function() {
    return groupOperations.list();
  }));

  router.route('/:id').get(groupTopicResponseHandler(function(req) {
    return groupOperations.read(req.params.id);
  }));

  router.route('/:id').put(groupTopicResponseHandler(function(req) {
    return groupOperations.update(req.body);
  }));

  router.route('/').post(groupTopicResponseHandler(function(req) {
    return groupOperations.create(req.body);
  }));

  router.route('/:id').delete(groupTopicResponseHandler(function(req) {
    return groupOperations.remove(req.body);
  }));

  return router;
}

/**
 * Function to initialize group router to be used by an express app.
 * @param {GroupOperations} groupOperations
 * @param app An express app
 */
module.exports = function groupRouterInit(app, groupOperations) {
  var router = initRouter(groupOperations);
  app.use(config.apiPath, router);
};
