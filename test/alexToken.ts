import { expect } from "chai";
import { ethers } from "hardhat";

describe('AlexToken', () => {
  it('Should assign total supply to owner', async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("AlexToken"); 
    const ALEX = await Token.deploy();
    const totalSupply = await ALEX.totalSupply();
    const ownerBalance = await ALEX.balanceOf(owner.address);
    expect(totalSupply).to.equal(ownerBalance);
  });

  it('Should transfer tokens between accounts', async () => {
    const [owner, player1, player2, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("AlexToken"); 
    const ALEX = await Token.deploy();
    // Transfer 50 tokens from owner to addr1
    await ALEX.transfer(addr1.address, 50);
    expect(await ALEX.balanceOf(addr1.address)).to.equal(50);
    // Transfer 50 tokens from addr1 to addr2
    await ALEX.connect(addr1).transfer(addr2.address, 50); 
    expect(await ALEX.balanceOf(addr2.address)).to.equal(50);
    await expect(ALEX.connect(addr1).transfer(addr2.address, 60)).to.be.revertedWith("Not enough tokens");
  });

  it('Should emit transfer event', async () => {
    const [owner, player1, player2, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("AlexToken");
    const ALEX = await Token.deploy();
    // Transfer 50 tokens from owner to addr1
    await expect(ALEX.transfer(addr1.address, 50))
      .to.emit(ALEX, "Transfer")
      .withArgs(owner.address, addr1.address, 50);
  });
})