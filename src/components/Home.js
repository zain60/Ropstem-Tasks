import '../styles/styles.css'
import {useState,useEffect} from 'react';
import Web3 from "web3";
import PoolContractABI from '../config/Abi'
import TrxList from "../components/Trx"
import Mine from './Mine';
import PoolFeeContractAddress from '../config/ContractAddress';

import { ToastContainer, toast, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from './Admin';

const Home = (props) => {
    const [pool, setPool] = useState(false);
    const[poolbtn,setPoolbtn]= useState(false)
    const[adminBtn,setAdminBtn] = useState(false);
    const[admin,setAdmin] = useState(false);
    const[minebtn,setMinebtn]= useState(false)
    const [mine, setMine] = useState(false);
    const[amount,setAmount] = useState(0);
    const[receipts,setReceips] = useState(null);
    const[lastweight,setLastweight] = useState(null);
    const[totalstaked,setTotalstaked] = useState(null);
    const[totReward,setTotReward] = useState(null);
    const[fetch,setFetch] = useState(true);
    const[stakFee,SetstakFee] = useState(null)
    const[epoch,setEpoch] = useState(null);
    const[stakeLimit,setStakeLimit]= useState(null);
    const[upcomEpoch,setupcomEpoch] = useState(null);
    const[lastEpoch,setlastEpoch] = useState(null);
    const[weight_Id,setweight_Id] = useState(null);
    const[minstake,setminstake] = useState(null)

    // states to store received data from Admin child
    const[unstakeNu,setUnstakeNu] = useState('');
    const[unstakeDen,setUnstakeDen] = useState('');
    const[ClaimNu,setClaimNu] = useState('');
    const[ClaimDen,setClaimDen] = useState('');

 

    //  set provider
    const web3 = new Web3(window.ethereum);
    const ethObj = new web3.eth.Contract(PoolContractABI, PoolFeeContractAddress);
    console.log(ethObj.methods,"my Methods")  
    
    
    
  
    const showPool = () => {
        setPool(true);
        setMine(false);
        setAdmin(false)
        // setMinebtn(true)
    }
    const showMine = () => {
        setMine(true);
        setPool(false);
        setAdmin(false)
    }
    const showAdmin = ()=>{
        setAdmin(true)
        setPool(false);
        setMine(false);
    }
    // Toasts
    
    const Amount_Toast_Id = (result) => {
        toast.success((result),{
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });
        
        
     }

     
    const upcomingTotalWeighthandler = async() =>{
        console.log( "lastTotalWeight:",
        await ethObj.methods.upcomingTotalWeight().call({ from: props.address }))
         await ethObj.methods.upcomingTotalWeight()
         .call({ from: props.address })
         .then(result => {
            setLastweight(result)
       });
    }
    const totalStakedHandler = async() =>{
        console.log( "total staked ::",
        await ethObj.methods.totalStaked().call({ from: props.address }))
         await ethObj.methods.totalStaked()
         .call({ from: props.address }).then(result => {
            setTotalstaked(result)
       });
    }
    const totalRewardHandler = async() =>{
        console.log( "total Reward ::",
        await ethObj.methods.totalReward().call({ from: props.address }))
         await ethObj.methods.totalReward()
         .call({ from: props.address }).then(result => {
            setTotReward(result)
       });
    }
    const EpochRewardhandler = async() =>{
        console.log( "Staking fee ::",
        await ethObj.methods.EpochReward().call({ from: props.address }))
        await ethObj.methods.EpochReward()
        .call({ from: props.address }).then(result => {
            setEpoch(result)
    });
    }
    const fetchDataHandler = () => {
        if(fetch){
            console.log("Home Fetching Data ...")
            console.log("Fetching Data ...")
            totalStakedHandler();
            totalRewardHandler();
            upcomingTotalWeighthandler();
            EpochRewardhandler()
            setFetch(false); 
        }
    }
    
    const fetchFeeHandler = () =>{
        getMinStakeAmounthandler();   
    }
    
    const trxListHandler = (trxdata) =>{
        console.log("trx data",trxdata.blockHash,
        trxdata.blockNumber,
        trxdata.events.Staked.returnValues.amount)
        console.log("events",trxdata.events.Staked.returnValues.amount)
        let trxData =  localStorage.getItem("trx");
        if(trxData!=null){
            console.log("ExistedData :", trxData)
            let newData = {"trx":
            {
        "hash": trxdata.blockHash,
        "block":trxdata.blockNumber,
        "amount":trxdata.events.Staked.returnValues.amount
        //    "amount":trxData.events.Staked.returnValues[1]
        } } 
        let combData = JSON.stringify(newData) + "|" +trxData;
        console.log("combData :",combData)
        localStorage.setItem("trx", combData)
        }else{
            localStorage.setItem("trx",
            JSON.stringify(
                {"trx":
                {
            hash: trxdata.blockHash,
            block:trxdata.blockNumber,
            amount:trxdata.events.Staked.returnValues.amount
            //    amount: trxData.events.Staked.returnValues[1]
            }}))
        }
    }
    const  getMinStakeAmounthandler = async() =>{
        await ethObj.methods. getMinStakeAmount()
        .call({ from: props.address }).then(result => {
            setminstake(result)
    });
    }
   
   

    const getStakingLimitHandler = async() =>{
        console.log( "Staking fee ::",
        await ethObj.methods.getStakeLimit().call({ from: props.address }))
        await ethObj.methods.getStakeLimit()
        .call({ from: props.address }).then(result => {
            setStakeLimit(result)
    });
    }

    const upcomingWeightOfhandler = async() =>{
        if(amount<=0){
            // Amount_Toast_Id();
        }else{
        console.log( "upcomingWeight of::",
        await ethObj.methods.upcomingWeightOf(amount).call({ from: props.address }))
        await ethObj.methods.upcomingWeightOf(amount)
        .call({ from: props.address }).then(result => {
            console.log( "upcomingWeight of::",result)
            Amount_Toast_Id(result);
            setweight_Id(result)
    });
    }
    }
    const lastEpochTimehandler = async() =>{
        console.log( "Staking fee ::",
        await ethObj.methods.lastEpochTime().call({ from: props.address }))
        await ethObj.methods.lastEpochTime()
        .call({ from: props.address }).then(result => {
            var myDate = new Date(result *1000);
           var B =  myDate.toLocaleString();
            setlastEpoch(B)
    });
    }
    const upcomingEpochTimehandler = async() =>{
        console.log( "Staking fee ::",
        await ethObj.methods.upcomingEpochTime().call({ from: props.address }))
        await ethObj.methods.upcomingEpochTime()
        .call({ from: props.address }).then(result => {
            var myDate = new Date(result *1000);
          var A = myDate.toLocaleString();
            setupcomEpoch(A)
    });
    }


    //  Use Effect
    useEffect(() => {
        console.log("Home fetch called")
        fetchDataHandler();
        fetchFeeHandler();
        getStakingLimitHandler();
        upcomingWeightOfhandler();
        lastEpochTimehandler();
        upcomingEpochTimehandler();
    },[fetch])
   

 const claimFeeDenom = (claimadminDen) =>{
    setClaimDen(claimadminDen)
 }
 const claimFeeNume = (claimadminNum) =>{
    setClaimNu(claimadminNum)
}





//  **********************************
    return (
        <div className = "home-div">   
            <div className = "devConsole">
                <h2 id = "pool">
                Eth 2.0 Pool
                </h2>
                <div class='signupbutton'>
                    <button  onClick = {showPool}  disabled={poolbtn}  className="pool-mine">View Pool</button>
                    <span  className = "btn1" >Total Staked Amount : {totalstaked}</span> 
                    <span className = "btn1" >Total Reward : {totReward}</span> 
                    <span className = "btn1"  >UpcomTotlWeight : {lastweight}</span> 
                    <span className = "btn1"  >Epoch Reward : {epoch}</span> 
                    <button id = "Mine" onClick  = {showMine}  disabled={minebtn} className="pool-mine">Mine</button>
                    <button  onClick = {showAdmin}  disabled={adminBtn}  className="pool-mine">Admin</button>
                    {pool  &&
                    <TrxList receipts ={receipts}
                     Ethobj = {ethObj} address = {props.address}
                      setFetch = {setFetch}
                       stakFee = {stakFee}
                    
                       ClaimNu = {ClaimNu}
                      ClaimDen = {ClaimDen}  />
                     }
                    {mine && 
                     <Mine Ethobj = {ethObj} 
                     address = {props.address}
                      trxList = {trxListHandler} 
                      setFetch = {setFetch} 
                      stakelimit ={stakeLimit} stakFee = {stakFee}/>} 
                     {admin &&
                        <Admin  Ethobj = {ethObj}
                         address = {props.address}
                          trxList = {trxListHandler}
                           setFetch = {setFetch} 
                           stakelimit ={stakeLimit}
                        
                           
                            claimFeeDenom = {claimFeeDenom} 
                            claimFeeNume = {claimFeeNume}
                            />
                     }                  
                </div>      
            </div>
             <ToastContainer toastStyle={{ backgroundColor:"#f0ffffF" }} draggable={false} transition={Zoom} autoClose={5000} />  
            
        </div>
    );
    }
    export default Home;