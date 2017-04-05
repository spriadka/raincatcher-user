'use strict';

var express = require('express');
var config = require('../../config/config-membership');
var membershipTopicResponseHandler = require('../topicResponseHandler');

/**
 * Function which initializes an express router to be used by the app.
 *
 * @param {Object} membershipOperations  Operations for membership business logic.
 * @returns {router}
 */
function initRouter(membershipOperations) {
  var router = express.Router();

  router.route('/').get(membershipTopicResponseHandler(function() {
    return membershipOperations.list();
  }));

  router.route('/:id').get(membershipTopicResponseHandler(function(req) {
    return membershipOperations.read(req.params.id);
  }));

  router.route('/:id').put(membershipTopicResponseHandler(function(req) {
    return membershipOperations.update(req.body);
  }));

  router.route('/').post(membershipTopicResponseHandler(function(req) {
    return membershipOperations.create(req.body);
  }));

  router.route('/:id').delete(membershipTopicResponseHandler(function(req) {
    return membershipOperations.remove(req.body);
  }));

  return router;
}

/**
 * Function to initialize membership router to be used by an express app.
 * @param app An express app
 * @param {MembershipOperations} membershipOperations
 */
module.exports = function membershipRouterInit(app, membershipOperations) {
  var router = initRouter(membershipOperations);
  app.use(config.apiPath, router);
};

