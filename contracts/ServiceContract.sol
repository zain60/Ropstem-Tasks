// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IERC721.sol";
import "./IERC20.sol";

contract HammerNFT {
    mapping(address => bool) public contractAdmins;
    mapping(address => bool) public hammerOwners;
    mapping(address => bool) public apeOwners;
    IERC20 private _hammer;
    IERC20 private _paymentToken;
    IERC721 private _openApes;
    uint256 private _price;

    constructor(address _tokenHammer, address _RostemToken, address _nftToken) {
        contractAdmins[msg.sender] =true; 
        _hammer = IERC20(_tokenHammer);
        _paymentToken = IERC20(_RostemToken);
        _openApes = IERC721(_nftToken);
        _price = 100;
    }


    function addOwner(address payable newOwner) public  {
        require(newOwner != address(0));
        contractAdmins[newOwner] = true;
    }

    function mintHammer() public payable {
        require(!apeOwners[msg.sender]);
        require(_hammer.mint(msg.sender,1),"Failed to mint");
        hammerOwners[msg.sender] = true;
    }

    function buyApe() public payable {
        require(!hammerOwners[msg.sender],"you already have haammer token");
        require(_paymentToken.transferFrom(msg.sender, address(this), _price));
        require(_openApes.mint(msg.sender),"failed to mint");
        apeOwners[msg.sender] = true;
    }

    function withdraw() public onlyOwner{
        address  owner = msg.sender;
        require(address(this).balance != 0);
        payable(owner).transfer(address(this).balance);
    }

    modifier onlyOwner() {
        require(contractAdmins[msg.sender] ==true);
        _;
    }
}
