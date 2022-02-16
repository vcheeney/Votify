// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/// @title Simple voting smart contract
contract Ballot {
  // This declares a new complex type which will
  // be used for variables later.
  // It will represent a single voter.
  struct Voter {
    bool allowed;
    bool voted; // if true, that person already voted
    uint256 vote; // index of the voted proposal
  }

  // This is a type for a single proposal.
  struct Proposal {
    bytes32 name; // short name (up to 32 bytes)
    uint256 voteCount; // number of accumulated votes
  }

  address public chairperson;

  // This declares a state variable that
  // stores a `Voter` struct for each possible address.
  mapping(address => Voter) public voters;

  // A dynamically-sized array of `Proposal` structs.
  Proposal[] public proposals;

  // Events
  event Vote(address voter, uint256 vote);
  event VoterAllowed(address voter);

  /// Create a new ballot to choose one of `proposalNames`.
  constructor(bytes32[] memory proposalNames) {
    chairperson = msg.sender;
    voters[chairperson].allowed = true;

    // For each of the provided proposal names,
    // create a new proposal object and add it
    // to the end of the array.
    for (uint256 i = 0; i < proposalNames.length; i++) {
      // `Proposal({...})` creates a temporary
      // Proposal object and `proposals.push(...)`
      // appends it to the end of `proposals`.
      proposals.push(Proposal({ name: proposalNames[i], voteCount: 0 }));
    }
  }

  // Give `voter` the right to vote on this ballot.
  // May only be called by `chairperson`.
  function giveRightToVote(address voter) external {
    // If the first argument of `require` evaluates
    // to `false`, execution terminates and all
    // changes to the state and to Ether balances
    // are reverted.
    // This used to consume all gas in old EVM versions, but
    // not anymore.
    // It is often a good idea to use `require` to check if
    // functions are called correctly.
    // As a second argument, you can also provide an
    // explanation about what went wrong.
    require(msg.sender == chairperson, "Action is restricted to deployer");
    require(!voters[voter].voted, "Already voted");
    require(voters[voter].allowed == false, "Already allowed");
    voters[voter].allowed = true;
    emit VoterAllowed(voter);
  }

  /// Give your vote
  /// to proposal `proposals[proposalIndex].name`.
  function vote(uint256 proposalIndex) external {
    Voter storage sender = voters[msg.sender];
    require(sender.allowed, "Has no right to vote");
    require(!sender.voted, "Already voted");
    require(proposalIndex < proposals.length, "Proposal does not exist");
    sender.voted = true;
    sender.vote = proposalIndex;
    // If `proposal` is out of the range of the array,
    // this will throw automatically and revert all
    // changes.
    emit Vote(msg.sender, proposalIndex);
    proposals[proposalIndex].voteCount += 1;
  }

  /// Get the amount of proposals for the ballot
  function proposalsAmount() public view returns (uint256 count) {
    return proposals.length;
  }

  /// @dev Computes the winning proposal taking all
  /// previous votes into account.
  function winningProposal() public view returns (uint256 winningProposal_) {
    uint256 winningVoteCount = 0;
    for (uint256 p = 0; p < proposals.length; p++) {
      if (proposals[p].voteCount > winningVoteCount) {
        winningVoteCount = proposals[p].voteCount;
        winningProposal_ = p;
      }
    }
    require(proposals[winningProposal_].voteCount > 0, "No votes received");
  }

  // Calls winningProposal() function to get the index
  // of the winner contained in the proposals array and then
  // returns the name of the winner
  function winnerName() external view returns (bytes32 winnerName_) {
    winnerName_ = proposals[winningProposal()].name;
  }
}
