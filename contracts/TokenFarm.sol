pragma solidity ^0.8.4;
import './DaiToken.sol';
import './DappToken.sol';

contract TokenFarm {

    address public owner;
    string public name = "bule Token farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    


    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (DappToken _dappToken, DaiToken _daiToken) {

        daiToken = _daiToken;
        dappToken = _dappToken;
        owner = msg.sender;
        
    }

    function stakeTokens(uint _amount) public {

        require(_amount > 0 , 'amount cannot be 0');

        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        } 
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueTokens () public {
        require(msg.sender == owner, 'caller must be the owner');
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            } 
            
        }
    }

}