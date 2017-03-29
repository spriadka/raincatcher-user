'use strict';

var MembershipOperations = require('./membership/membershipOperations');
var UserOperations = require('./user/userOperations');
var GroupOperations = require('./group/groupOperations');

module.exports = function(mediator, app, authServiceGuid) {

  var membershipOperations = new MembershipOperations(mediator);
  var groupOperations = new GroupOperations(mediator);
  var userOperations = new UserOperations(mediator, groupOperations, membershipOperations, authServiceGuid);

  require('./user/user-session')(mediator, app, authServiceGuid);
  require('./user/user-router')(app, userOperations);
  require('./group/group-router')(app, groupOperations);
  require('./membership/membership-router')(app, membershipOperations);
};
