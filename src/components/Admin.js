import '../styles/styles.css'
import {useState,useEffect} from 'react';
import { ToastContainer, toast, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Admin = (props)=>{

    const[lastweight,setLastweight] = useState(null);
    const[totalstaked,setTotalstaked] = useState(null);
    const[totReward,setTotReward] = useState(null);
    const[fetch,setFetch] = useState(true);
    const[epoch,setEpoch] = useState(null);
    const[stakeLimit,setStakeLimit]= useState(null);
    const[upcomEpoch,setupcomEpoch] = useState(null);
    const[lastEpoch,setlastEpoch] = useState(null);
    const[weight_Id,setweight_Id] = useState(null);
    const[minstake,setminstake] = useState(null);
    // set reward in new Epoch
    const[epocEthers,setEpocEthers]= useState('')
    // update epoch render
    const[updatEpoch,setUpdatEpoch] = useState(true)

    //  states for place holders
    const[rewrd,setReward] = useState(null);
    const[stakedId,setstakedId]= useState(null);
    const[numerator,setNumerator] = useState(null);
    const[denominator,setDenominator] = useState(null);
    const[epoc,setEpoc]= useState('')
     // Unstake
     const[unstakeNumerrator , setUnStakeNumerrator]  = useState('') 
     const[unStakeDenominator , setUnStakeDenominator]  = useState('') 
    //  Claim
    const[claimNumerrator , setClaimNumerrator]  = useState('') 
    const[claimDenominator , setClaimDenominator]  = useState('') 
    // stake
    const[stakeNumerrator , setStakeNumerrator]  = useState('') 
    const[stakeDenominator , setStakemDenominator]  = useState('') 


    props.claimFeeNume(claimNumerrator);
    props.claimFeeDenom(claimDenominator);
    props.claimFeeNume(claimNumerrator);
    // props.unstakeFeeNume(unstakeNumerrator);
    // props.unstakeFeeDenom(unstakeNumerrator);



    let ethObj = props.Ethobj;       
        // ******************************
        const changeEpochTimehandler = async()=> {
            if(epoc <= 0){
                console.log("Eoch period must be greater then Upcomming Epoch period ")
            }
            else{
            await ethObj.methods.changeEpochTime(epoc,"yes")
            .send({from: props.address, type: '0x2'})
            .on("receipt", function(receipt) {
                 console.log("successs changeEpocheTime",receipt);
                 setUpdatEpoch(true)
             })
            .on("error", function(error) {
                console.error(error);
            }); 
            }  
        }  
        const addNewEpochhandler = async()=> {
            console.log("addNew Epoch  called")
            if(epoc <= 0){
                console.log("Amount MUst be greater then 'zero' ")
            }
            else{
            await ethObj.methods.addNewEpoch(epoc)
            .send({from: props.address,value:epocEthers})
            .on("receipt", function(receipt) {
                console.log("Suyccessfully Added New EPoch",receipt);
                setUpdatEpoch(true)
            })
            .on("error", function(error) {
                console.error(error);
            }); 
            }  
        }
        //  Total weight 
        const upcomingTotalWeighthandler = async() =>{
            await ethObj.methods.upcomingTotalWeight()
            .call({ from: props.address })
            .then(result => {
                setLastweight(result)
            });
        }
        // Returns Total staked amount in pool
        const totalStakedHandler = async() =>{
            await ethObj.methods.totalStaked()
            .call({ from: props.address }).then(result => {
                setTotalstaked(result)
            });
        }
        const totalRewardHandler = async() =>{
            await ethObj.methods.totalReward()
            .call({ from: props.address }).then(result => {
                setTotReward(result)
        });
        }
     
       
        // Info functions    
        const EpochRewardhandler = async() =>{
            await ethObj.methods.EpochReward()
            .call({ from:props.address }).then(result => {
                setEpoch(result)
        });
        }
        const getStakingLimitHandler = async() =>{          
            await ethObj.methods.getStakeLimit()
            .call({ from: props.address }).then(result => {
                setStakeLimit(result)
             });
        }   
        const upcomingWeightOfhandler = async() =>{
            if(stakedId <=0){
                Amount_Toast_Id();
            }else{
            await ethObj.methods.upcomingWeightOf(stakedId)
            .call({ from: props.address }).then(result => {
                console.log( "upcomingWeight of::",result)
                // Amount_Toast_Id(result);
                setweight_Id(result)
        });
        }
        }
        const lastEpochTimehandler = async() =>{
            await ethObj.methods.lastEpochTime()
            .call({ from: props.address }).then(result => {
                var myDate = new Date(result *1000);
            var B =  myDate.toLocaleString();
                setlastEpoch(B)
        });
        }
        const upcomingEpochTimehandler = async() =>{
            await ethObj.methods.upcomingEpochTime()
            .call({ from: props.address }).then(result => {
                var myDate = new Date(result *1000);
            var A = myDate.toLocaleString();
                setupcomEpoch(A)
        });
        }
        const RewardHandler = async() =>{ 
            if(stakedId <= 0){   
            console.log("enter staked id tocheck reward")      
            }
             else{
             await ethObj.methods.calculateReward(stakedId)
            .call({ from: props.address }).then(result=> {
            setReward(result)
            console.log("reward",result)
        });
        }
      
        }
        const  getMinStakeAmounthandler = async() =>{
            await ethObj.methods. getMinStakeAmount()
            .call({ from: props.address }).then(result => {
                setminstake(result)
        });
        }


// ******************Un-stake******************************************
        const getunstakeFeeNumeratorhandler = async() =>{
        await ethObj.methods.getUnstakeFeeNumerator()
        .call({ from: props.address }).then(result => {
            setUnStakeNumerrator(result)
            
    });
        }
        const getunstakeFeeDenominatorhandler = async() =>{
        await ethObj.methods.getUnstakeFeeDenominator()
        .call({ from: props.address }).then(result => {
            setUnStakeDenominator(result)
            
    });
        }
        //*********************** */
        const setUnstakeFeeNumenatorhandler = async() =>{
            if(numerator <= 0){
                Amount_Toast();
            }else{
            await ethObj.methods.setUnstakeFeeNumenator(numerator)
            .send({from: props.address}).on("receipt", function(receipt) {
                success_Toast();
            })
            .on("error", function(error) {
                console.error(error);
            }); 
            } 
        }
        const setUnstakeFeeDenominatorhandler = async() =>{
            if(denominator <= 0){
                Amount_Toast();
            }else{
            await ethObj.methods.setUnstakeFeeDenominator(denominator)
            .send({from: props.address}).on("receipt", function(receipt) {
                success_Toast();
            })
            .on("error", function(error) {
                console.error(error);
            }); 
            } 
        }

// ******************Claim******************************************
        const getClaimFeeNumeratorhandler = async() =>{
        await ethObj.methods.getClaimFeeNumerator()
        .call({ from: props.address }).then(result => {
            setClaimNumerrator(result)
          
           
    });
        }
        const getClaimFeeDenominatorhandler = async() =>{
        await ethObj.methods.getClaimFeeDenominator()
        .call({ from: props.address }).then(result => {
            setClaimDenominator(result)
          
    });
        }
    //    ************** */
        const setClaimNumenatorhandler = async() =>{
            if(numerator <= 0){
                Amount_Toast();
            }else{
            await ethObj.methods.setClaimFeeNumenator(numerator)
            .send({from: props.address}).on("receipt", function(receipt) {
                success_Toast();
            })
            .on("error", function(error) {
                console.error(error);
            }); 
            } 
        }
        const setClaimDenominatorhandler = async() =>{
            if(denominator <= 0){
                Amount_Toast();
            }else{
            await ethObj.methods.setclaimFeeDenominator(denominator)
            .send({from: props.address}).on("receipt", function(receipt) {
                success_Toast();
            })
            .on("error", function(error) {
                console.error(error);
            }); 
            } 
        }

    // ******************Stake******************************************

        const getStakeFeeNumeratorhandler = async() =>{
        await ethObj.methods.getStakeFeeNumerator()
        .call({ from: props.address }).then(result => {
            setStakeNumerrator(result)
    });
        }
        const getStakeFeeDenominatorhandler = async() =>{
        await ethObj.methods.getStakeFeeDenominator()
        .call({ from: props.address }).then(result => {
            setStakemDenominator(result)
    });
        }
         //***************** */ 
        const setStakeFeeNumeratorhandler = async() =>{
        if(numerator <= 0){
            Amount_Toast();
        }else{
        await ethObj.methods.setStakeFeeNumenator(numerator)
        .send({from: props.address}).on("receipt", function(receipt) {
            success_Toast();
          })
          .on("error", function(error) {
            console.error(error);
          }); 
        } 
        }
        const setStakeFeeDenominatorhandler = async() =>{
            if(denominator <= 0){
                Amount_Toast();
            }else{
            await ethObj.methods.setStakeFeeDenominator(denominator)
            .send({from: props.address}).on("receipt", function(receipt) {
                success_Toast();
              })
              .on("error", function(error) {
                console.error(error);
              }); 
            } 
        }
// *******************************************************
        const fetchDataHandler = () => {
            console.log("Admin fetch called")
        if(fetch){
            console.log("Admin fetch called")
            console.log("Fetching Data ...")
            totalStakedHandler();
            totalRewardHandler();
            upcomingTotalWeighthandler();
            EpochRewardhandler()
            setFetch(false);

        }
        }
        const fetchFeeHandler = () =>{
            // claim
            getClaimFeeDenominatorhandler();
            getClaimFeeNumeratorhandler();
            // unstake 
            getunstakeFeeNumeratorhandler();
            getunstakeFeeDenominatorhandler();
            // stake
            getStakeFeeDenominatorhandler();
            getStakeFeeNumeratorhandler();

            getMinStakeAmounthandler();

        }
        const epochupdateHnadler = () =>{
            if(updatEpoch){
                lastEpochTimehandler();
                upcomingEpochTimehandler();
                setUpdatEpoch(false)
            }
        }

     //   ********Toasts*******
        const success_Toast = () => {
            toast.info("Fee Updated Successfully", {
                className: "custom-toast",
                draggable: false,
                position: toast.POSITION.TOP_CENTER,
            });
        }
        const Amount_Toast_Id = (result) => {
            toast.success((result),{
                className: "custom-toast",
                draggable: false,
                position: toast.POSITION.TOP_CENTER,
            });
            
            
        }
        const claim_Toast_Id = (result) => {
            toast.success((result),{
                className: "custom-toast",
                draggable: false,
                position: toast.POSITION.TOP_CENTER,
            });   
            
        }
        const Amount_Toast = () => {
        toast.error("value cannt be 'Zero'", {
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });
    }
    // useEffect Hnadler
        useEffect(() => {
            fetchDataHandler();
            fetchFeeHandler();
            getStakingLimitHandler();
            upcomingWeightOfhandler();
            RewardHandler();
            epochupdateHnadler();
        
        })


return (
<div className = "home-div">   
<div className="devConsole">
<h1> Admin Functions </h1>
     {/* <h2>Admin Address = {adminAddress}</h2> */}
     <div className="signupbutton">
             <label id = "amount" >Numerator</label>
              <div className="form-controls">
                 <input id = "signupbutton"placeholder="Enter Numerator"
                 value={numerator} onChange={(e) => setNumerator(e.target.value)}/>
             </div>
             <label id = "amount" >Denominator</label>
              <div className="form-controls">
                 <input id = "signupbutton"placeholder="Enter Denominator"
                 value={denominator} onChange={(e) => setDenominator(e.target.value)}/>
             </div>
     </div>
     <br/>
     <br/>
     <div className="signupbutton-1" >
        <button className = "btn1" 
        onClick = {setStakeFeeNumeratorhandler} 
        className="pool-mine">setStakeNumerator</button>
        <button className = "btn1"  onClick = {setStakeFeeDenominatorhandler}
        className="pool-mine">setStakeDenominator</button>
        <span  className = "btn1" >StakeNumerator:  {stakeNumerrator}</span> 
        <span  className = "btn1" >StakeDenominator:  {stakeDenominator}</span>
     </div>

     <br/>
     <br/>
     <div className="signupbutton-1" >
        <button className = "btn1"  onClick = {setUnstakeFeeNumenatorhandler} 
        className="pool-mine">setUnstakeNumenator</button> 
        <button className = "btn1"  onClick = {setUnstakeFeeDenominatorhandler}
        className="pool-mine">setUnstakeDenominator </button> 
        <span className = "btn1" >unstakeNumerat:{unstakeNumerrator}</span> 
        <span className = "btn1" >unstakeDenominat:{unStakeDenominator}</span> 
     </div>
     <br/>
     <br/>
     <div className="signupbutton-1" >
     <button className = "btn1"  onClick = {setClaimNumenatorhandler}
        className="pool-mine">Set ClaimNumenator</button> 
         <button className = "btn1"  onClick = {setClaimDenominatorhandler} 
         className="pool-mine">Set ClaimDenominator</button>
        <span className = "btn1"  >ClaimNumerator: {claimNumerrator}</span> 
        <span className = "btn1"  >ClaimDenominator: {claimDenominator}</span>
     </div>

     <br/>
     <br/>
     <br/>
     <div className="signupbutton">
             <label id = "amount" >Epoch</label>
              <div className="form-controls">
                 <input id = "signupbutton"placeholder="Enter Epoch period"
                 value={epoc}onChange={(e) => setEpoc(e.target.value)}/>
                  <input id = "signupbutton"placeholder="Enter Reward amount"
                 value={epocEthers}onChange={(e) => setEpocEthers(e.target.value)}/>
             </div>
     </div>
     <br/>
     
     <br/>
     <div className="signupbutton-1" >
     <span  className = "btn1" >lastEpochTime: {lastEpoch}</span> 
     <span className = "btn1" >comingEpochTime: {upcomEpoch}</span> 
    
     </div>
     <br/>
     <br/>
     <div className="signupbutton">
         <button className = "btn1"  onClick = {changeEpochTimehandler} className="pool-mine">changeEpochTime</button>
         <button className = "btn1"  onClick = {addNewEpochhandler} className="pool-mine">addNewEpoch</button>
     </div>
     <br/>
     <br/>
     
     <div className="signupbutton">
     <label id = "amount" >id</label>
              <div className="form-controls">
                 <input id = "signupbutton"placeholder="Enter staked id"
                 value={stakedId}onChange={(e) => setstakedId(e.target.value)}/>
                </div>
        </div>
        <br/>
     <br/>
     <div className="signupbutton-1">
    
         <button className = "btn1"  onClick = {upcomingWeightOfhandler} className="pool-mine">upcoming weight</button>
         <span className = "btn1"  > Weight: {weight_Id}</span> 
         <button className = "btn1"  onClick = {RewardHandler} className="pool-mine">reward:</button>
         <span className = "btn1"  > Rewrad:{rewrd}</span> 
     </div> 
     <ToastContainer toastStyle={{ backgroundColor:"#f0ffffF" }} draggable={false} transition={Zoom} autoClose={5000} />  
        </div>
    </div>
);

}
export default Admin;