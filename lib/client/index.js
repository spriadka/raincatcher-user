var UserClient = require('./user/user-client');
var GroupClient = require('./group/group-client');
var MembershipClient = require('./membership/membership-client');

var groupTopics = require('./group/mediator-topics');
var membershipTopics = require('./membership/mediator-topics');
var userTopics = require('./user/mediator-topics');

module.exports = function(mediator, config) {
  config = config || {};

  var clients = {
    userClient: UserClient(mediator, config),
    groupClient: GroupClient(mediator, config),
    membershipClient: MembershipClient(mediator, config)
  };

  //Initialising the subscribers for user, group and membership topics
  groupTopics.init(mediator, clients.groupClient);
  membershipTopics.init(mediator, clients.membershipClient);
  userTopics.init(mediator, clients.userClient);

  return clients;
};
