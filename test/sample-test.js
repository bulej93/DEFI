const { equal } = require("assert");
const { expect } = require("chai");
const exp = require("constants");
const { ethers } = require("hardhat");



describe("Mock DAI deployment", function(){
  it("has a name", async function(){
    //DaiToken deployment
  DaiToken = await ethers.getContractFactory("DaiToken")
  let dai = await DaiToken.deploy()
  expect(await dai.name()).to.equal('Mock DAI Token')
  })


  it('has total supply', async function(){
  const [account1, account2] = await ethers.getSigners()
  DaiToken = await ethers.getContractFactory("DaiToken")
  const dai = await DaiToken.deploy()
  const ownerBalance = await dai.balanceOf(account1.address)
  expect(await dai.totalSupply()).to.equal(ownerBalance)
  })

  it('can transfer', async function(){
    const [account1, account2] = await ethers.getSigners()
    DaiToken = await ethers.getContractFactory("DaiToken")
    const dai = await DaiToken.deploy()
    await dai.transfer(account2.address, 50)
    
    expect(await dai.balanceOf(account2.address)).to.equal(50)
  })
})

describe('Dapp Token deployment', function(){
  it('has a name', async function(){
    DappToken = await ethers.getContractFactory("DappToken")
    const dapp = await DappToken.deploy()
    expect(await dapp.name()).to.equal('DApp Token')
  })
})

describe('farming tokens', function(){
  it('rewards Investors', async function(){

    const [account1, account2] = await ethers.getSigners()
    const DaiToken = await ethers.getContractFactory("DaiToken")
    const dai = await DaiToken.deploy()

    const DappToken = await ethers.getContractFactory("DappToken")
    const dapp = await DappToken.deploy()
    
   
    const TokenFarm = await ethers.getContractFactory("TokenFarm")
    const farm = await TokenFarm.deploy(dapp.address, dai.address)

    await dai.transfer(account2.address, 5000)

    await dai.approve(farm.address, 50)
    account2Bal = await dai.balanceOf(account1.address)
    console.log(account2Bal.toNumber())
    

    
    //await farm.stakeTokens(100, account2)
  

  })
})