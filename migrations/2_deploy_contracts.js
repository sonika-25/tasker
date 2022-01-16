const Nft = artifacts.require("NFT.sol");
const TaskAssign = artifacts.require("TaskAssign.sol");
module.exports = async function (deployer, _network, accounts) {
  const [emp1, emp2, emp3, emp4, _] = accounts;

  await deployer.deploy(TaskAssign, emp1);
  const tasker  = await TaskAssign.deployed()

  await Promise.all(
    [Nft].map(contract => deployer.deploy(contract, tasker.address))
  );
  const [nft] = await Promise.all(
    [Nft].map(contract => contract.deployed())
  );
  //nft.createToken("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1DF4MVzyS-y4BiRfjdeAVKsyzX4K6ns0PNw&usqp=CAU", {from: accounts[0]});
  //let amt = web3.utils.toWei('3', 'ether');
  //await web3.eth.sendTransaction({from:accounts[0],to: tasker.address, value: amt})

}
