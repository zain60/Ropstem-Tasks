pragma solidity ^0.8.0;
import "./IERC721.sol";
import "./IERC20.sol";

// SPDX-License-Identifier: MIT
// ServiceContract smart contract for creating, minting, and managing Hammer and OpenAPE tokens
contract ServiceContract {
    // mapping to keep track of the contract admins
    mapping(address => bool) public contractAdmins;
    // mapping to keep track of the hammer token owners
    mapping(address => bool) public hammerOwners;
    // mapping to keep track of the openApe token owners
    mapping(address => bool) public apeOwners;
    // variable to interact with the hammer token contract
    IERC20 private _hammer;
    // variable to interact with the payment token contract
    IERC20 private _paymentToken;
    // variable to interact with the openApe token contract
    IERC721 private _openApes;
    // variable to store the price of the openApe token
    uint256 private _price;

    // constructor to initialize the contract
    constructor(address _tokenHammer, address _RostemToken, address _nftToken) {
        contractAdmins[msg.sender] =true; 
        _hammer = IERC20(_tokenHammer);
        _paymentToken = IERC20(_RostemToken);
        _openApes = IERC721(_nftToken);
        _price = 100;
    }

    // function to add a new admin
    function addOwner(address payable newOwner) public  {
        require(newOwner != address(0));
        contractAdmins[newOwner] = true;
    }

    // function to mint a new hammer token 
    function mintHammer() public payable {
        require(!apeOwners[msg.sender]);
        require(_hammer.mint(msg.sender,1),"Failed to mint");
        hammerOwners[msg.sender] = true;
    }

    // function to buy a new openApe token 
    function buyApe() public payable {
        require(!hammerOwners[msg.sender],"you already have haammer token");
        require(_paymentToken.transferFrom(msg.sender, address(this), _price));
        require(_openApes.mint(msg.sender),"failed to mint");
        apeOwners[msg.sender] = true;
    }

    // function to withdraw contract balance
    function withdraw() public onlyOwner{
        address  owner = msg.sender;
        require(address(this).balance != 0);
        payable(owner).transfer(address(this).balance);
    }

    // only the contract admins can execute the function that follows the modifier
    modifier onlyOwner() {
        require(contractAdmins[msg.sender] ==true);
        _;
    }
}
