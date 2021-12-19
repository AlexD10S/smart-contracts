import { expect } from "chai";
import { ethers } from "hardhat";

describe('D10SNFT', () => {
  it('Should mint the token and return it', async () => {
    const [owner, user] = await ethers.getSigners();
    const D10SNFT = await ethers.getContractFactory("D10SNFT");
    const d10sNFT = await D10SNFT.deploy();

    const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url

    const transaction = await d10sNFT.createToken(metadata); // Minting the token
    const tx = await transaction.wait();

    if(!tx.events) throw new Error("No event received");
    const event = tx.events[0];
    if(!event.args) throw new Error("No ide token received");
    const value = event.args[2];
    const tokenId = value.toNumber();

    const tokenURI = await d10sNFT.tokenURI(tokenId);

    expect(tokenURI).to.be.equal(metadata);

  });
});