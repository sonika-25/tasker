import Web3 from 'web3';
import NFT from './abis/NFT.json';
import TaskAssign from "./abis/TaskAssign.json";
import erc721UriStorageAbi from './erc721UriStorageAbi.json';
const getPrice =async () =>{
  const web3 = await new Web3("https://api.s0.b.hmny.io");
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD";
  const priceFeed = await new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
  return {priceFeed}
}
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

const getContracts = async web3 => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork1 = NFT.networks[networkId];
  const nft = new web3.eth.Contract(
    NFT.abi,
    deployedNetwork1 && deployedNetwork1.address,
  );
  nft.options.address = "0x282f081A22346b252d91FDd3579fE6b59F083004"
  const deployedNetwork3 = TaskAssign.networks[networkId];
  const tasker = new web3.eth.Contract(
    TaskAssign.abi,
    deployedNetwork3 && deployedNetwork3.address,
  );
  tasker.options.address = "0x7c134F14F7dC10249ad82f284d7873a798e7A2e9"
  return { tasker, nft };
}

export {getWeb3, getContracts };
