// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface  IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address tokenOwner) external view returns (uint256);
    function allowance(address tokenOwner, address spender) external view returns (uint256);
    function transfer(address to, uint256 tokens) external returns (bool);
    function approve(address spender, uint256 tokens) external returns (bool);
    function transferFrom(address from, address to, uint256 tokens) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint256 tokens);
    event Burn(address indexed sender, uint256 tokens);
}

contract Ropstem is IERC20 {

    address public owner;
    mapping(address => uint256) override public balanceOf;
    mapping(address => mapping(address => uint256)) override public allowance;
    uint256 public  _totalSupply;
    string public name = "Ropstem";
    string public symbol = "RST";
    uint8 public decimal = 18;

    constructor()  {
        owner = msg.sender;
        _totalSupply = 1000000;
        balanceOf[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    function buy(uint256 _amount) public payable {
        require(_amount <= totalSupply(), "Not enough tokens available");
        require(msg.value == _amount * (100 wei), "Incorrect amount of Wei provided.");
        address sender = msg.sender;
        balanceOf[sender] = balanceOf[sender]+(_amount);
        _totalSupply = _totalSupply-(_amount);
        // Deflationary mechanism: burn a percentage of the tokens bought
        uint256 burnAmount = _amount*(10)/(100); // burn 10% of the tokens
        _totalSupply = _totalSupply-burnAmount;
        emit Burn(sender, burnAmount);
        emit Transfer(address(0), msg.sender, _amount);
    }


    function transfer(address _to, uint256 _value) override public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Not enough balance.");
        require(_to != address(0), "Invalid address.");
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_to] = balanceOf[_to] + (_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) override  public returns (bool) {
        require(_spender != address(0), "Invalid address.");
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
         return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) override  public returns (bool) {
        require(balanceOf[_from] >= _value && allowance[_from][msg.sender] >= _value, "Not enough balance or allowance.");
        require(_to != address(0), "Invalid address.");
        balanceOf[_from] = balanceOf[_from]-(_value);
        allowance[_from][msg.sender] = allowance[_from][msg.sender]-(_value);
        balanceOf[_to] = balanceOf[_to]+(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function totalSupply() override public view returns (uint256) {
        return _totalSupply;
    }

}
