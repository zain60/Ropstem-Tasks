import '../styles/styles.css'
import React, { useState } from 'react';
import RostemContractAddress,{ ServiceContractAddress } from '../config/ContractAddress';
import ServiceContractABi ,{RostemTokenABi }from '../config/Abi';
import Web3 from 'web3';
import { ethers } from 'ethers';

// create a new web3 object to interact with the Ethereum network
const web3 = new Web3(window.ethereum); 

const FullPageButtons = (props) => {
  // use the useState hook to handle the input value entered by the user
  const [inputValue1, setInputValue1] = useState(null);

  // function to handle buying Ropstem tokens
  const handleBuyRostemToken = async()=>{
    // create a new contract object for the Ropstem Token contract using its ABI and address
    const Rps_Contract = new web3.eth.Contract(RostemTokenABi, RostemContractAddress);
    let weiValue = inputValue1*100;
    // convert wei to ethers
    const ethValue = ethers.utils.formatEther(weiValue);
    // call the buy function on the contract with the amount as input
    // send the transaction with the user's address and the converted value of the input in wei
    const buyTrx = await Rps_Contract.methods.buy(inputValue1).send(
        {
            from : props.address,
            value :Number(ethers.utils.parseUnits(ethValue, "ether")) 
        }
    );
  };

  // function to handle buying Hammer tokens
  const handleBuyHammerToken = async()=>{
    // create a new contract object for the Service contract using its ABI and address
    const Srvs_Contract = new web3.eth.Contract(ServiceContractABi, ServiceContractAddress);
    // call the mintHammer function on the contract
    const buyTrx = await Srvs_Contract.methods.mintHammer().send(
        {
            from : props.address,
        }
    );
  };

  // function to handle buying OpenAPE tokens
  const handleBuyOpenAPEToken = async()=>{
    // create a new contract object for the Service contract using its ABI and address
    const Srvs_Contract = new web3.eth.Contract(ServiceContractABi, ServiceContractAddress);
    const Rps_Contract = new web3.eth.Contract(RostemTokenABi, RostemContractAddress);
    // call the approve function on the Ropstem Token contract with the Service contract address and the value of 200
    await Rps_Contract.methods.approve(ServiceContractAddress,200).send(
      {
        from : props.address,
      }
    )
    // call the buyApe function on the Service contract
    await Srvs_Contract.methods.buyApe().send(
        {
            from : props.address,
        }
    );
  };

  return (
    <div className="full-page-container">
       <p class="text-justify"> Get Ropstem Token </p>
    <div className="input-button-container alignRight">
      <input
        placeholder="Enter amount"
        className="input-field"
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      < button className="primary-button" onClick={() => handleBuyRostemToken()}> Buy Ropstam token</button>
    </div>

      <p class="text-justify">  Choose wisely ! You can buy eithr Hammer Token OR Open ape</p>
      <p></p>
      <button className="secondary-button" onClick={() => handleBuyHammerToken()}>Mint hammer</button>
      <p></p>
      <button className="secondary-button" onClick={() => handleBuyOpenAPEToken()}>Mint open ape</button>
    </div>
  );
};

export default FullPageButtons;

