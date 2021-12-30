pragma solidity ^0.8.1; 
 
/* 
 * The person who wants to distribute the Inheritance has to deploy the contract, deposit the money  
 * and set the people who will receive the inheritance. 
 */ 
 
contract Inheritance { 
      
    address private owner; 
    mapping (address => uint256) public heirAddresses; 
    uint256 public lastProofOfLiveTimestamp; 
     
     
    modifier onlyOwner() { 
        require(msg.sender == owner); 
        _; 
    } 
     
    constructor() {  
        owner = msg.sender; 
        lastProofOfLiveTimestamp = block.timestamp; 
    } 
     
    function depositInheritance(address _heir) external payable onlyOwner { 
        heirAddresses[_heir] += msg.value; 
        lastProofOfLiveTimestamp = block.timestamp; 
    } 
     
     
    function amIAlive() external onlyOwner { 
        lastProofOfLiveTimestamp = block.timestamp; 
    } 
     
    function claimInheritance() external { 
        //Check 1 year after dead of owner 
        require(block.timestamp > lastProofOfLiveTimestamp + 31536000); 
        require(heirAddresses[msg.sender] > 0); 
        address payable to = payable(msg.sender); 
        to.transfer(heirAddresses[msg.sender]); 
        heirAddresses[msg.sender] = 0; 
    } 

    function getOwner() external view onlyOwner returns (address) { 
        return owner;
    } 
     
     
}