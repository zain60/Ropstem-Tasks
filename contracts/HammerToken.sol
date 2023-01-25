// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./IERC20.sol";
contract Hammer is IERC20 {
    // mappings
    mapping(address => bool) public minterRole;
    mapping(address => uint256) override public balanceOf;
    mapping(address => mapping(address => uint256)) override public allowance;
    // state variables
    string public name;
    string public symbol;
    uint8 public decimals;
    address public owner;
    uint256 private _totalSupply;

    constructor()  {
        owner = msg.sender;
        name = "Hammer";
        symbol = "HMR";
        decimals = 18;
    }

    function addMinterRole(address _contractAddress) public {
        require(msg.sender == owner, "Only admin can add new admin.");
        minterRole[_contractAddress] = true;
    }

    function removeMinterRole(address _contractAddress) public {
        require(msg.sender== owner, "Only owner can remove admin.");
        minterRole[_contractAddress] = false;
    }

    function totalSupply()  override public view returns(uint256){
      return _totalSupply;
    }

    function mint(address _to, uint256 _value) override external returns (bool) {
        require(minterRole[msg.sender] == true, "Only address with mintRole can mint new tokens.");
        require(_to != address(0), "To address is required.");
        require(_value > 0, "Value must be greater than 0.");
        _totalSupply = _totalSupply + _value;
        balanceOf[_to] += _value;
        emit Transfer(address(0), _to, _value);
        return true;
    }

    function transfer(address _to, uint256 _value)  override public returns (bool) {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Insufficient balance.");
        require(_to != address(0), "To address is required.");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)  override public returns (bool)  {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Insufficient balance.");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value)  override public returns (bool)  {
        require(balanceOf[_from] >= _value && _value > 0, "Insufficient balance.");
        require(_to != address(0), "To address is required.");
        require(allowance[_from][msg.sender] >= _value, "Insufficient allowance.");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
