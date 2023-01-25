import '../styles/styles.css'
import React, { useState } from 'react';
import RostemContractAddress,{ ServiceContractAddress } from '../config/ContractAddress';
import ServiceContractABi ,{RostemTokenABi }from '../config/Abi';
import Web3 from 'web3';
import { ethers } from 'ethers';
const web3 = new Web3(window.ethereum); 

const FullPageButtons = (props) => {
  const [inputValue1, setInputValue1] = useState(null);


  const handleBuyRostemToken = async()=>{
    const Rps_Contract = new web3.eth.Contract(RostemTokenABi, RostemContractAddress);
    let weiValue = inputValue1*100;
    // convert wei to ethers
    const ethValue = ethers.utils.formatEther(weiValue);

    const buyTrx = await Rps_Contract.methods.buy(inputValue1).send(
        {
            from : props.address,
            value :Number(ethers.utils.parseUnits(ethValue, "ether")) 
        }
    );
    
  };
  const handleBuyHammerToken = async()=>{
    if(inputValue1 == null){
      console.log("enter amount to buy")
    }
    const Srvs_Contract = new web3.eth.Contract(ServiceContractABi, ServiceContractAddress);
    const buyTrx = await Srvs_Contract.methods.mintHammer().send(
        {
            from : props.address,
        }
    );
    
  };
  const handleBuyOpenAPEToken = async()=>{
    const Srvs_Contract = new web3.eth.Contract(ServiceContractABi, ServiceContractAddress);
    const Rps_Contract = new web3.eth.Contract(RostemTokenABi, RostemContractAddress);
    const approveTrx = await Rps_Contract.methods.approve(ServiceContractAddress,200).send(
      {
        from : props.address,
    }
    )

    const buyTrx = await Srvs_Contract.methods.buyApe().send(
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

