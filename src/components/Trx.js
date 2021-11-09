import '../styles/styles.css'
import {useState,useEffect} from 'react';
import { ToastContainer, toast, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TrxList = (props) => {
    const[ids,setIds] = useState([]);
    const[idlength,setIdLength] = useState(null)
    const[trxList,setTrxList]= useState(null)
    const[amount,setAmount] = useState([])
    // unstake data states
    const[unstakeNumerrator , setUnStakeNumerrator]  = useState('') 
    const[unStakeDenominator , setUnStakeDenominator]  = useState('')
    const[triggerids,setTriggerIds] = useState(true) 

    //  Ethereum object
    let ethObj = props.Ethobj
    var arr=[];
    let sum = 0;
  
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
        
    //  Unstaking Fee calculation function
    const unstakeFeeCalculation = ()=>{
        var arrtotal = [];
        if(arr !=null){ 
             for(let i = 0; i < arr.length; i++){ 
                console.log(arr)
                let FeeNumerator = unstakeNumerrator;
                let FeeDenominator = unStakeDenominator;
                let total =  arr[i]*FeeNumerator/FeeDenominator;
               arrtotal.push(total);
            }
            console.log("Unstake Fee in Array ,against array ids",arrtotal)
            for (let i = 0; i < arrtotal.length; i++) {
                sum += arrtotal[i];   
            }
        }           
        console.log("Sum of Array Fees",sum);
        return sum;
    }
 
    //    convert string to arrays
    function numberToArray(amount) {
        
     //stringify the number, then make each digit an item in an array
  	    let array = amount.toString().split(",");
        //convert all the items back into numbers
  	    return array.map(x => parseInt(x));   
    }
    //use the function
    
     var myArray = numberToArray(amount);
     console.log(" Convert enter numbers to myArray",myArray)

    // Check the staked amout against specific ids
     const stakeInfohandler = async() =>{  
         if(myArray !=null){
            for (var i = 0; i < myArray.length; i++) {
            await ethObj.methods.getStakeInfo(myArray[i])
            .call({ from: props.address })
            .then(result => {
               // setLastweight(result)
               arr.push(result.amount);
               console.log(" Get Amount against ids amnd store into Array",result.amount)
               //setResAmount(result.amount) 
            });
          }
         console.log("Total Array  ",arr);
        }
        
    }
   

    // Unstake and Unstake ll
    const Unstake = async()=> {
        //  myArray = []
        if(amount <= 0){
            console.log("please enter already staked 'id' ")
        }
        else{
        await stakeInfohandler()
        var  fee =  unstakeFeeCalculation();
        //console.log("Fee in unstake Function",fee)
        //var testfee = Web3.utils.toWei( Web3.utils.toBN(fee), 'ether')
        //console.log("testfee",testfee)
        await ethObj.methods.unStake(myArray)
        .send({from: props.address,value:fee})
        .on("receipt", function(receipt) {
            unstake_Toast_Id(receipt);
            setTriggerIds(true);
              localStorage.removeItem("trx");
              props.setFetch(true);            
          })
          .on("error", function(error) {
            console.error(error);
          }); 
        } 
    }    
        //  Claim and Claim ALL 
    const ClaimRewardhandler = async()=> {
        if(amount <= 0){  
            console.log("please enter staked Id ")
        }
        else{
        await ethObj.methods.claimReward(myArray)
        .send({from: props.address, type: '0x2'})
        .on("receipt", function(receipt) {
            console.log("sucess")
            claim_Toast_Id()
           
          })
          .on("error", function(error) {
            console.error(error);
          }); 
        } 
    }  
    const amountchangeHandler=(event)=>{
        event.preventDefault();
        setAmount(event.target.value);
    }

    const fetchData = ()=>{
        console.log("Fetch Data cALLED")
        let trxData =  localStorage.getItem("trx");
        if(trxData!=null){
            let trxArray=trxData.split("|");
          setTrxList (trxArray);
          console.log("trnsac array",JSON.parse(trxArray[0]))
        }

    }
    const getUserIds = async() =>{
         await ethObj.methods.getUserIds(props.address)
         .call({ from: props.address })
         .then(result => {
             console.log("ids",result)
             setIds(result);
             setIdLength(result.length)          
        });

    }
    const idsHandler = () =>{
        if(triggerids){
            getUserIds();
            setTriggerIds(false)
        }
    }  
    useEffect(() => {  
        getunstakeFeeNumeratorhandler(); 
        getunstakeFeeDenominatorhandler();
        idsHandler();
    }); 
    useEffect(() => {
        if(!trxList){ 
            fetchData()          
        }    
    });
      // Toasts
      const claim_Toast_Id = () => {
        toast.success(("Claimed successfull"),{
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });          
     }
     const unstake_Toast_Id = (receipt) => {
        toast.success(("unstaked successfull"),{
            className: "custom-toast",
            draggable: false,
            position: toast.POSITION.TOP_CENTER,
        });          
     }  
       
  

    return (
        <div className = "home-div">
            <br/>
            <br/>
            <br/>   
             <div className = "devConsole">
                 <h1> Your Total Staked Trx = {idlength}</h1>
             { 
             ids.length > 0 ?       
                 ids.map((id) => {
                            return(<div>
                                <li> User id : {id}</li> 
                                </div>
                            );})  
                            : 
                <div>
                <h1>No id Found</h1>
                </div>            
                }
            
            </div>
            {/* <h1>Your Trnsactions</h1> */}
            <br/>
            <div className="devConsole" >
                    <div className="signupbutton-1">
                            <label id = "amount" >Id's</label>
                             <div className="form-controls">
                                <input id = "signupbutton"
                                placeholder="Enter ids e.g: 1,2"
                                value={amount} onChange={amountchangeHandler}/>
                            </div>
                    </div>
                    <div className="devConsole">
            <button className="pool-mine" onClick={Unstake}>un-Stake Multiple</button>
            <button className="pool-mine" onClick={ClaimRewardhandler}>Claim Multiple</button>
            {/* <button className="pool-mine" onClick={stakeInfohandler}>stackun</button> */}
       
    
            
            </div> 
            </div>
            <div className = "devConsole">
            {
            trxList ? trxList.map((trx) => {
                let ref = "https://rinkeby.etherscan.io/block/" + JSON.parse(trx).trx.block;
                return (  
                <div>
              
                 <h3>
                     BlockNumber : <a href = {ref} target="_blank">
                         {JSON.parse(trx).trx.block} </a>
                </h3>
                <h3> Amount:  {JSON.parse(trx).trx.amount} </h3>
                 <h3>BlockHash :{JSON.parse(trx).trx.hash}</h3>
                        <br/>
                        <br/>

                </div>
                );})
                :
                <div className = "devConsole">
                       <h1></h1>
                      </div>
                    
            }
              </div>
      
        </div>
        
    );
    }
    export default TrxList;