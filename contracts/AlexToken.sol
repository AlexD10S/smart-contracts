pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract AlexToken {
  string public name = "Alex Token";
  string public symbol = "ALEX";
  uint256 public totalSupply = 1000000;
  address public owner;

  mapping(address => uint256) balances;

  event Transfer(address indexed from, address indexed to, uint256 _value);

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint256 amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");
    console.log("sender: %s, receiver: %s, amount: %s", msg.sender, to, amount);
    balances[msg.sender] -= amount;
    balances[to] += amount;
    emit Transfer(msg.sender, to, amount);
  }

  function balanceOf(address account) external view returns (uint256) {
    return balances[account];    
  }

}