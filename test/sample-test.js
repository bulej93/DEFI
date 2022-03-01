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

    const [account1, account2, account3] = await ethers.getSigners()
    const DaiToken = await ethers.getContractFactory("DaiToken")
    const dai = await DaiToken.deploy()

    const DappToken = await ethers.getContractFactory("DappToken")
    const dapp = await DappToken.deploy()
    
   
    const TokenFarm = await ethers.getContractFactory("TokenFarm")
    const farm = await TokenFarm.deploy(dapp.address, dai.address)

    await dai.connect(account1).transfer(account2.address, 5000)
    
    await dai.connect(account2).approve(farm.address, 5000)
    await farm.connect(account2).stakeTokens(5000)
    

    expect(await dai.balanceOf(account2.address)).to.equal(0)
    expect(await dai.balanceOf(farm.address)).to.equal(5000)
    expect(await farm.isStaking(account2.address)).to.equal(true)
    expect(await farm.hasStaked(account2.address)).to.equal(true)

   try {
    await farm.connect(account1).issueTokens(dapp.connect(account1).transfer(account2.address, 5000 ))
   } catch (error) {
     console.log('this is the error ' + error)
   }
    expect( await dapp.balanceOf(account2.address)).to.equal(5000)



   // expect(farm.connect(account2).issueTokens()).to.be.revertedWith('not the owner')

    
    try {
      await farm.connect(account2).unstakeTokens(dai.connect(account1).transfer(account2.address, 0))
      
    } catch (error) {
      console.log('the unstake err '+ error)
    }

    const daibal = await dai.balanceOf(account1.address)
    const dappbal = await dapp.balanceOf(account2.address)

    console.log('dai bal ' + daibal )
    console.log('dapp bal ' + dappbal )

    
    // expect(await dai.balanceOf(account2.address)).to.equal(5000, 'not the right balance')

  })
})