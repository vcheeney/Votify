import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain";

describe("Ballot", function () {
  const names = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
  const formattedNames = names.map(ethers.utils.formatBytes32String);
  let ballot: Ballot;
  let deployer: SignerWithAddress;
  let voter1: SignerWithAddress;
  let voter2: SignerWithAddress;
  let voter3: SignerWithAddress;

  beforeEach(async () => {
    const BallotFactory = await ethers.getContractFactory("Ballot");
    ballot = await BallotFactory.deploy(formattedNames);
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    voter1 = accounts[1];
    voter2 = accounts[2];
    voter3 = accounts[3];
  });

  describe("Deploying the contract", () => {
    it("should set the chairperson address to the address of deployer of the contract", async () => {
      expect(await ballot.chairperson()).to.equal(deployer.address);
    });

    describe("Proposals initialization", () => {
      formattedNames.forEach((name, index) => {
        describe(`Proposal ${index}`, () => {
          it("should initialize vote count to 0", async () => {
            const deployedProposal = await ballot.proposals(index);
            expect(deployedProposal.voteCount).to.equal(0);
          });

          it("should set the name properly", async () => {
            const deployedProposal = await ballot.proposals(index);
            expect(await deployedProposal.name).to.equal(name);
          });
        });
      });

      it("should return the right proposals amount", async () => {
        expect(await ballot.proposalsAmount()).to.equal(formattedNames.length);
      });
    });
  });

  describe("Giving rights to vote", () => {
    describe("For anyone except chairperson (deployer of the contract)", () => {
      it("should not allow to give right to vote", async () => {
        const ballotFromVoter1 = ballot.connect(voter1);
        await expect(
          ballotFromVoter1.giveRightToVote(voter2.address)
        ).to.be.revertedWith("Action is restricted to deployer");
      });
    });

    describe("For chairperson (deployer of the contract)", () => {
      it("should allow to give right to vote to someone who has not yet voted", async () => {
        await ballot.giveRightToVote(voter1.address);
        // TODO: Understand why: "calledOnContractWith is not supported by hardhat"
        // expect("giveRightToVote").to.be.calledOnContractWith(ballot, [
        //   voter1.address,
        // ]);
      });

      it("should set the voter allowed to vote", async () => {
        await ballot.giveRightToVote(voter1.address);
        const voter = await ballot.voters(voter1.address);
        expect(voter.allowed).to.eq(true);
      });

      it("should emit a voter allowed event", async () => {
        await expect(ballot.giveRightToVote(voter1.address))
          .to.emit(ballot, "VoterAllowed")
          .withArgs(voter1.address);
      });

      it("should not allow to give right to vote to someone who has already voted", async () => {
        await ballot.giveRightToVote(voter1.address);
        const ballotFromVoter1 = ballot.connect(voter1);
        await ballotFromVoter1.vote(0);
        await expect(ballot.giveRightToVote(voter1.address)).to.be.revertedWith(
          "Already voted"
        );
      });
    });
  });

  describe("Voting", () => {
    describe("For anyone without right to vote", () => {
      it("should not be allowed", async () => {
        const ballotFromVoter1 = ballot.connect(voter1);
        await expect(ballotFromVoter1.vote(0)).to.be.revertedWith(
          "Has no right to vote"
        );
      });
    });

    describe("For anyone with the right to vote", () => {
      const selectedProposalIndex = 0;
      let ballotFromVoter1: Ballot;

      beforeEach(async () => {
        await ballot.giveRightToVote(voter1.address);
        ballotFromVoter1 = ballot.connect(voter1);
        await ballotFromVoter1.vote(selectedProposalIndex);
      });

      it("should emit a vote event", async () => {
        await ballot.giveRightToVote(voter3.address);
        const ballotFromVoter3 = ballot.connect(voter3);
        await expect(ballotFromVoter3.vote(selectedProposalIndex))
          .to.emit(ballot, "Vote")
          .withArgs(voter3.address, selectedProposalIndex);
      });

      it("should mark the voter as 'voted' after the vote", async () => {
        const voter = await ballot.voters(voter1.address);
        expect(voter.voted).to.eq(true);
      });

      it("should store the selected proposal in the voter object", async () => {
        const voter = await ballot.voters(voter1.address);
        expect(voter.vote).to.eq(selectedProposalIndex);
      });

      it("should increment the vote count of the selected proposal", async () => {
        const proposal = await ballot.proposals(selectedProposalIndex);
        expect(proposal.voteCount).to.eq(1);
      });

      it("should not allow to vote a second time", async () => {
        await expect(
          ballotFromVoter1.vote(selectedProposalIndex)
        ).to.be.revertedWith("Already voted");
      });

      it("should not allow to vote for a proposal that does not exist", async () => {
        const invalidIndex = names.length;
        await ballot.giveRightToVote(voter2.address);
        const ballotFromVoter2 = ballot.connect(voter2);
        await expect(ballotFromVoter2.vote(invalidIndex)).to.be.revertedWith(
          "Proposal does not exist"
        );
      });
    });
  });

  describe("Obtaining results", () => {
    describe("Before votes have been received", () => {
      it("should throw since a winner can't defined", async () => {
        await expect(ballot.winningProposal()).to.be.revertedWith(
          "No votes received"
        );
      });
    });

    describe("After votes have been received", () => {
      const expectedWinningProposalIndex = 0;

      beforeEach(async () => {
        await ballot.giveRightToVote(voter1.address);
        await ballot.giveRightToVote(voter2.address);
        await ballot.giveRightToVote(voter3.address);
        const ballotFromVoter1 = ballot.connect(voter1);
        const ballotFromVoter2 = ballot.connect(voter2);
        const ballotFromVoter3 = ballot.connect(voter3);
        await ballotFromVoter1.vote(expectedWinningProposalIndex);
        await ballotFromVoter2.vote(expectedWinningProposalIndex);
        await ballotFromVoter3.vote(names.length - 1);
      });

      it("should return the proper winning proposal index", async () => {
        const winningProposalIndex = await ballot.winningProposal();
        expect(winningProposalIndex).to.eq(expectedWinningProposalIndex);
      });

      it("should return the proper winning proposal name", async () => {
        const winningProposalName = await ballot.winnerName();
        expect(winningProposalName).to.eq(
          formattedNames[expectedWinningProposalIndex]
        );
      });
    });
  });
});
