// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function approve(address _to, uint256 _tokenId) external returns (bool);
    function transfer(address _to, uint256 _tokenId) external returns (bool);
    function transferFrom(address _from, address _to, uint256 _tokenId) external returns (bool);
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
    function mint(address _to) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}
