import { expect } from "chai";
import { ethers } from "hardhat";

describe("Faucet", function () {
  it("Should increase the faucet balance", async function () {
    const [owner] = await ethers.getSigners();
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const scBalance = await ethers.provider.getBalance(faucet.address);
    expect(ethers.utils.formatEther(scBalance)).equal("0.0");

    await owner.sendTransaction({to: faucet.address, value: ethers.utils.parseEther("1")});

    const refreshedScBalance = await ethers.provider.getBalance(faucet.address);
    expect(ethers.utils.formatEther(refreshedScBalance)).equal("1.0");
  });

  it("Should throw an error if try to withdraw but the balance of the smart contract is 0", async function () {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const scBalance = await ethers.provider.getBalance(faucet.address);
    expect(ethers.utils.formatEther(scBalance)).equal("0.0");

    await expect(faucet.withdraw(ethers.utils.parseEther("0.01"))).to.be.revertedWith('function call failed to execute');
  });

  it("Should withdraw but the balance asked", async function () {
    const [owner, user] = await ethers.getSigners();
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    await owner.sendTransaction({to: faucet.address, value: ethers.utils.parseEther("1")});
    const withdrawTx = await faucet.withdraw(ethers.utils.parseEther("0.01"));
    await withdrawTx.wait();

    const userBalance = await ethers.provider.getBalance(user.address);
    expect(ethers.utils.formatEther(userBalance)).equal("10000.0");

    const op = await faucet.connect(user).withdraw(ethers.utils.parseEther("0.01"));
    
    const userBalanceRefresh = await ethers.provider.getBalance(user.address);
    //O.01 - gas
    expect(userBalanceRefresh).to.gt(ethers.utils.parseEther("10000.0"));
  });
});
