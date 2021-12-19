pragma solidity ^0.8.0;


contract HeadsOrTails {
    
    event CoinTossed(address player, uint result, address addressFriend);
    event ProofSent(string nonce, uint coinPicked, string commitment);
    
    struct Game {
      address player;
      string commitment;
      string nonce;
      uint8 result; //0 none, 1 heads, 2 tails
      uint8 coinPicked;
    }
    
    mapping (address => Game) public friendGames;
    //mapping(address => mapping(address => Game)) friendGames; More than one game per player?
    Game [] public waitingListPlayers; //convert to mapping? better to delete itemsç
    
     
    function startGameAgainstFriend(address _addressFriend, string memory _commitment) external {
        require(friendGames[_addressFriend].player == address(0)); //Check my friend is free
        friendGames[_addressFriend] = Game(msg.sender,_commitment,"",0,0);
    }
    
    function deleteGameAgainstFriend() external {
        delete friendGames[msg.sender]; //Just the player after check the proof cann delete it
    }
    
    function getGameAgainstFriend(address _addressFriend) external view returns (string memory){
        require(friendGames[msg.sender].player == _addressFriend, "No game started"); //Check if someone already started a game against me
        return friendGames[msg.sender].commitment; //get the commitment
    }
    
    function sendResult(uint8 _result) external {
        require(friendGames[msg.sender].result == 0); //Result must be 0, this stop anyone to modify the value
        friendGames[msg.sender].result = _result; 
        emit CoinTossed(friendGames[msg.sender].player, _result, msg.sender); //In the event send the result and the address of the friend
    }
    
    function getResult(address _addressFriend) external view returns (uint) {
        return friendGames[_addressFriend].result; 
    }
    
    function sendProof(address _addressFriend, string memory _nonce, uint8 _coinPicked) external {
        require(friendGames[_addressFriend].player == msg.sender); //Just can send the proof if is a participant of the game
        friendGames[_addressFriend].nonce = _nonce;
        friendGames[_addressFriend].coinPicked = _coinPicked;
        emit ProofSent(_nonce, _coinPicked, friendGames[msg.sender].commitment);
    }
    
    function getProof() external view returns (string memory, uint) {
        return (friendGames[msg.sender].nonce, friendGames[msg.sender].coinPicked); 
    }
    
    /**
     * Functions for playing against a random adversary.
     */
    
    function startGameNoAdversary(string memory _commitment) public {
        require(friendGames[msg.sender].player == address(0)); //I can not be in another game
        waitingListPlayers.push(Game(msg.sender,_commitment,"",0,0)); //I put myself in the waiting list
    }
    
    function startGameRandomAdversary() public returns (Game memory){
        //Get the first in the list of waiting players
        Game memory randomWaitingPlayer = waitingListPlayers[0];
        require(friendGames[randomWaitingPlayer.player].player == address(0));
        delete waitingListPlayers[0];
        //Now is my friend and I get the commitment and address
        friendGames[randomWaitingPlayer.player] = Game(msg.sender,randomWaitingPlayer.commitment,"",0,0);
        return friendGames[msg.sender];
    }
}