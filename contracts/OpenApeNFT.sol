// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";

contract OpenApe is IERC721 {
    string private _name = "OpenApe";
    string private  _symbol = "APE";
    uint256 private  _totalSupply;

    address private minterRole;
    address public  owner;

    mapping(address => uint256) public override  balanceOf;
    mapping(uint256 => address) public override ownerOf;
    mapping(uint256 => address) public  approvedFor;
    mapping(address => mapping(address => bool)) public operatorApprovals;

    constructor()  {
        _totalSupply = 0;
        owner = msg.sender;
    }
   
     function addMinterRole(address _contractAddress) public {
        require(msg.sender == owner, "Only admin can add new admin.");
        minterRole = _contractAddress;
    }

    function removeMinterRole(address _contractAddress) public {
        require(msg.sender== owner, "Only owner can remove admin.");
        minterRole = _contractAddress;
    }
    function name() override external view returns (string memory){
        return _name;
    }
    function symbol() override external view returns (string memory){
        return _symbol;
    }

    function totalSupply() override external view returns (uint256){
       return _totalSupply;
    }

    function mint(address _to)override external returns (bool) {
        require(msg.sender == minterRole,"Must have Minter role");
        uint256 supply = _totalSupply;
        _totalSupply++;
        balanceOf[_to]++;
        ownerOf[supply+1] = _to;
        emit Transfer(address(0), _to, supply+1);
        return true;
    }

    function approve(address _to, uint256 _tokenId) override external returns (bool) {
        require(ownerOf[_tokenId] == msg.sender);
        approvedFor[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
        return true;
    }

    function transfer(address _to, uint256 _tokenId) override external returns (bool) {
        require(balanceOf[msg.sender] > 0);
        require(ownerOf[_tokenId] == msg.sender);
        balanceOf[msg.sender]--;
        balanceOf[_to]++;
        ownerOf[_tokenId] = _to;
        emit Transfer(msg.sender, _to, _tokenId);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId)override external returns (bool) {
        require(balanceOf[_from] > 0);
        require(ownerOf[_tokenId] == _from);
        require(approvedFor[_tokenId] == msg.sender);
        balanceOf[_from]--;
        balanceOf[_to]++;
        approvedFor[_tokenId] = address(0);
        ownerOf[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
        return true;
    }

    function getApproved(uint256 _tokenId) override external view returns (address) {
        return approvedFor[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator)override external view returns (bool) {
        return operatorApprovals[_owner][_operator];
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        require(_operator != msg.sender);
        operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }
}
