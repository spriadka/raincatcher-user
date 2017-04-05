var config = require('../../../config/config-membership');
var shortid = require('shortid');

var MembershipCloudDataTopics = require('fh-wfm-mediator/lib/topics');

function MembershipOperations(mediator) {
  this.groupCloudDataTopics = new MembershipCloudDataTopics(mediator)
    .prefix(config.cloudDataTopicPrefix)
    .entity(config.dataSetId);
}

/**
 *
 * Creating A New Membership Entry
 *
 * @param membershipToCreate
 * @returns {Promise}
 */
MembershipOperations.prototype.create = function createMembership(membershipToCreate) {
  membershipToCreate.id = shortid.generate(); //Add id field required by the simple-store module
  return this.groupCloudDataTopics.request('create', membershipToCreate, {uid: membershipToCreate.id});
};

/**
 *
 * Updating An Existing Membership Entry
 *
 * @param membershipToUpdate
 * @returns {Promise}
 */
MembershipOperations.prototype.update = function updateMembership(membershipToUpdate) {
  return this.groupCloudDataTopics.request('update', membershipToUpdate, {uid: membershipToUpdate.id});
};

/**
 *
 * Reading A Single Membership Entry
 *
 * @param id
 * @returns {Promise}
 */
MembershipOperations.prototype.read = function readMembership(id) {
  return this.groupCloudDataTopics.request('read', id);
};

/**
 *
 * Listing All Memberships
 *
 * @returns {Promise}
 */
MembershipOperations.prototype.list = function listMemberships() {
  return this.groupCloudDataTopics.request('list');
};

/**
 *
 * Removing A Single Membership Entry
 *
 * @param membershipToRemove
 * @returns {Promise}
 */
MembershipOperations.prototype.remove = function listMemberships(membershipToRemove) {
  return this.groupCloudDataTopics.request('delete', membershipToRemove, {uid: membershipToRemove.id});
};


module.exports = MembershipOperations;