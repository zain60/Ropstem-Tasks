
import './styles/styles.css'
import { useState,useEffect } from 'react';
import FullPageButtons from './components/Home';


function App() {
  const [conStatus, setconStatus] = useState(false)
  const [address, setAddress] = useState(null)
  const connectPopUp = async()=>{
    
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      getConnectedAccount();
      
  }}

  const getConnectedAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        setAddress(null);
      } else setAddress(accounts[0]);
    });
    if (accounts[0]) {
     // Connected
     console.log("connected Account ", accounts[0]);
     setAddress(accounts[0]);
     setconStatus(true);
    }
   else {
    console.log(" Not connected");
    setconStatus(false);

   }

  }

  useEffect (()=>{

    if(!conStatus){
      getConnectedAccount();
    }
  },[conStatus,address]);


 
  return (
    <div> 
     <div className="App">
      <div >
      <div className="div-header sticky" >
        <h1 className = "title"> Ropstem Tokens</h1>
              {
              conStatus?   <button className="btn-connected" >{address&&address.length > 5
                ? address.substr(0, 6) +
                  "..." +
                  address.substr(address.length - 4, address.length)
                : address}
              </button>
              :
              <button className="btn-connect" onClick = {connectPopUp} >Connect metamsk</button>
              }
       </div>
      </div>
     </div>
         <FullPageButtons address = {address}/>
    </div>
  );

}
export default App;
