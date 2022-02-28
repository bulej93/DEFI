pragma solidity ^0.8.4;
import './DaiToken.sol';
import './DappToken.sol';

contract TokenFarm {

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
        
    }

    function stakeTokens(uint _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        } 
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

}