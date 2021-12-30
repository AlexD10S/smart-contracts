import { expect } from "chai";
import { ethers } from "hardhat";

describe('Inheritance', () => {
  it('Should deploy the SC and assign the owner', async () => {
    const [owner] = await ethers.getSigners();
    const Inheritance = await ethers.getContractFactory("Inheritance"); 
    const inheritance = await Inheritance.deploy();
    const ownerFromSC = await inheritance.getOwner();
    expect(ownerFromSC).to.equal(owner.address);
  });
  it('Should send an I am alive confirmation by the owner and chenge the proof of live time', async () => {
    const [owner] = await ethers.getSigners();
    const Inheritance = await ethers.getContractFactory("Inheritance"); 
    const inheritance = await Inheritance.deploy();
    const lastProofOfLiveTimestamp = await inheritance.lastProofOfLiveTimestamp();
    await inheritance.amIAlive();
    const newProofOfLiveTimestamp = await inheritance.lastProofOfLiveTimestamp();
    expect(newProofOfLiveTimestamp).to.gt(lastProofOfLiveTimestamp);
  });
});