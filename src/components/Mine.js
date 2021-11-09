import '../styles/styles.css'
import {useState,useEffect} from 'react';
import { ToastContainer, toast, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mine = (props) => {
    const[amount , setAmount]  = useState(null) 
    const[stakeNumerrator , setStakeNumerrator]  = useState('') 
    const[StakeDenominator , setStakeDenominator]  = useState('') 

    let ethObj = props.Ethobj;

    //  Stake fee function 
    const StakeFeeclaculation  = () =>{
          var stakeFeeNumerator = stakeNumerrator;
           var StakeFeeDenominator = StakeDenominator;  
            var  total =  amount*stakeFeeNumerator/StakeFeeDenominator;
        
            return total;
    }
    // calling fee function
    var  fee =  StakeFeeclaculation();
     console.log("Fee requires in staking",fee)
    //  create object for web3
    
    const Staked_success_Toast = () => {
        toast.info("Strong Token staked Successfully", {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });
     }
     const Staked_fail_Toast = () => {
        toast.error("Trnsaction reverted", {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });
     }
     const Amount_Toast = () => {
        toast.error("PLease enter minimum Required  Amount", {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });
     }

    const stakeFeeNumeratorHandler = async() =>{
         await ethObj.methods.getStakeFeeNumerator()
         .call({ from: props.address }).then(result => {
            setStakeNumerrator(result)
            console.log("stakeNumerator",result)
       });
    }
    const StakeFeeDenominatorhandler = async() =>{
         await ethObj.methods.getStakeFeeDenominator()
         .call({ from: props.address }).then(result => {
            setStakeDenominator(result)
            console.log("stakeDenomerator",result)
       });
    }

    

        const stakeTrx = async()=> {
            console.log("stake called")
            if(amount <= 0){
                Amount_Toast();
            }
            else{
            await ethObj.methods.stake(amount)
            .send({from: props.address, type: '0x2',value:fee})
            .on("receipt", function(receipt) {
                Staked_success_Toast(); 
                props.trxList(receipt)
                props.setFetch(true);  
                             
              })       
             .on("error", function(error) {
                Staked_fail_Toast();
              }); 
            }           
        }
        
        useEffect(() => {
            StakeFeeDenominatorhandler();
            stakeFeeNumeratorHandler();       
        })

        

    return (
       
    <div className = "home-div">  
          <ToastContainer  draggable={false} transition={Zoom} autoClose={5000} />
        <div className = "devConsole">
                    <div className="signupbutton-1" >
                    <span  className = "btn1" > Staking Trx Limit :: {props.stakelimit}</span> 
                    </div>
             <h1>
             <div className="action_btn-group">
                            <label id = "amount" > Amount</label>
                             <div className="form-controls">
                                <input id = "signupbutton"placeholder="Enter Amount"
                                  value={amount}onChange={(e) => setAmount(e.target.value)}/>
                             </div>
            </div>
            <br/>
            <br/>
            <button className="pool-mine" onClick = {stakeTrx}>Stake amount </button>
            </h1>
        </div>
    </div>
    );
    }
    export default Mine;