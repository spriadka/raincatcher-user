var MbaasServiceProxy = require('../mbaas-service-proxy');
var q = require('q');
var _ = require('lodash');

/**
 *
 * @param {Mediator}                 mediator
 * @param {GroupOperations}          groupOperations
 * @param {MembershipOperations}     membershipOperations
 * @param {String}                   authServiceGuid
 * @constructor
 */
function UserOperations(mediator, groupOperations, membershipOperations, authServiceGuid) {

  this.mediator = mediator;
  this.groupOperations = groupOperations;
  this.membershipOperations = membershipOperations;
  this.mbaasService = new MbaasServiceProxy(authServiceGuid);
}

/**
 *
 * When creating a user, a membership entry must be created if a user is a member of a group
 *
 * @param userToCreate
 */
UserOperations.prototype.create = function createUser(userToCreate) {
  var self = this;

  return this.mbaasService.create(userToCreate).then(function(createdUser) {
    //If the user is a member of a group, create a new membership entry
    if (createdUser.group) {
      return self.membershipOperations.create({
        group : createdUser.group,
        user: createdUser.id
      }).then(function() {
        return createdUser;
      });
    }

    return q.when(createdUser);
  });
};

/**
 * Updating A Single User
 *
 * When updating a single user, we need to check if the user is a member of any groups.
 *
 * If this is the case, then the user membership entry should be updated
 *
 * @param userToUpdate
 */
UserOperations.prototype.update = function updateUser(userToUpdate) {
  var self = this;

  return self.mbaasService.update(userToUpdate).then(function(updatedUser) {

    //The user has been updated, ensure the membership is updated to reflect any new groups.
    return self.membershipOperations.list().then(function(memberships) {
      var userMembership = _.find(memberships, function(membership) {
        return membership.user === updatedUser.id;
      });

      var membershipOperation;

      //If the user has a membership entry, check that the entry is updated
      if (userMembership) {
        userMembership.group = userToUpdate.group;
        membershipOperation = self.membershipOperations.update(userMembership);
        //If the user has a group, create a new group entry.
      } else if (updatedUser.group) {
        //If the user was assigned a group, ensure a membership entry is created.
        membershipOperation = self.membershipOperations.create({
          group : updatedUser.group,
          user: updatedUser.id
        });
      } else {
        membershipOperation = q.when(updatedUser);
      }

      return membershipOperation.then(function() {
        return updatedUser;
      });
    });
  });
};

/**
 *
 * Reading a single user
 *
 * @param id
 */
UserOperations.prototype.read = function readUser(id) {
  return this.mbaasService.read(id);
};

/**
 *
 * Removing a single user
 *
 * @param userToRemove
 */
UserOperations.prototype.remove = function readUser(userToRemove) {
  return this.mbaasService.delete(userToRemove);
};

/**
 *
 * Listing all users
 *
 */
UserOperations.prototype.list = function listUsers() {
  return this.mbaasService.list();
};

module.exports = UserOperations;