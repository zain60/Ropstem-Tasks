// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ropstam {
    address public owner;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    uint256 public totalSupply;
    string public name = "Ropstam";
    string public symbol = "RST";
    uint8 public decimal = 18;
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event buyed(address indexed by, uint256 value);

    constructor() {
        owner = msg.sender;
        totalSupply = 10000;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function buy(uint _amount) public payable {
        require(_amount <= totalSupply,"Not enough tokens available");
        require(msg.value == _amount*(100 wei), "Incorrect amount of Wei provided.");
        address sender = msg.sender;
        balanceOf[sender] += _amount;
        totalSupply -= _amount;
        emit buyed(sender, _amount);
    }

    function sell(uint256 _value) public {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Not enough balance.");
        address sender = msg.sender;
        balanceOf[sender] -= _value;
        totalSupply += _value;
        emit Transfer(sender, address(0), _value);
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Not enough balance.");
        require(_to != address(0), "Invalid address.");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }

    function approve(address _spender, uint256 _value) public {
        require(_spender != address(0), "Invalid address.");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public {
        require(balanceOf[_from] >= _value && _value > 0, "Not enough balance.");
        require(_to != address(0), "Invalid address.");
        require(allowance[_from][msg.sender] >= _value, "Not enough allowance.");
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        }
}
