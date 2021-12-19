import { expect } from "chai";
import { ethers } from "hardhat";
import {generateRandom, makeCommitment} from "../utils/utils"

describe("HeadsOrTails", function () {
  it("Should start a game between player1 and player2", async function () {
    const [owner,player1, player2] = await ethers.getSigners();
    const HeadsOrTails = await ethers.getContractFactory("HeadsOrTails");
    const headsOrTails = await HeadsOrTails.deploy();

    const coin = 1;
    const nonce = generateRandom();
    const commitment = makeCommitment(coin, nonce);

    const startGameTx = await headsOrTails.connect(player1).startGameAgainstFriend(player2.address, commitment);
    
    const gameStartedTx = await headsOrTails.connect(player2).getGameAgainstFriend(player1.address);

    expect(gameStartedTx).to.equals(commitment);
  });

  it("Should throw an error if player1 has not started the game and player2 try to get the commitment", async function () {
    const [owner,player1, player2] = await ethers.getSigners();
    const HeadsOrTails = await ethers.getContractFactory("HeadsOrTails");
    const headsOrTails = await HeadsOrTails.deploy();
    
    await expect(headsOrTails.connect(player2).getGameAgainstFriend(player1.address)).to.be.revertedWith("No game started");
  });
});