
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
   * @returns {*}
   */
  return function handleListGroupsTopic() {
    return membershipClient.list();
  };
};