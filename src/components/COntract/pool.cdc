// // SPDX-License-Identifier: GPL-3.0

// pragma solidity ^0.8.0;

// import "./SafeMath.sol";
// import "./Ownable.sol";
// import "./IERC20.sol";
// import "./PlatformFees.sol";
// import "./ETHPoolInterface.sol";

// contract ETHPool is PlatformFees, ETHPoolInterface{
    
//     using SafeMath for uint256;
//     uint256 private idCounter;
//     uint256 public constant oneDay = 30; //one day in seconds
    
//     IERC20 private strongTokenContract;
    
//     uint256 public upcomingTotalWeight;
//     uint256 public lastTotalWeight;
    
//     uint256 public upcomingEpochTime;
//     uint256 public lastEpochTime;
    
//     uint256 public totalStaked;
//     uint256 public totalReward;
//     uint256 public EpochReward;
    
//     struct userStake{
//         uint256 id;
//         uint256 amount;
//         address userAddress;
//         uint256 timeStamp;
//         bool unStaked;
//     }
    
//     mapping(uint256 => userStake)private StakeList;
//     mapping(address => mapping(uint256 => uint256)) private _ownerIdIndex;
//     mapping(address => uint256[]) private _ownerIds;
    
//     event NewEpochAdded(uint256 newTime);
//     event Staked(address user, uint256 amount);
//     event Unstaked(address, uint256 weight);
//     event EpochUpdated(uint256 newTime);
//     event fallBackLog(address sender,uint256 value);
//     event receivedLog(address sender, uint256 value);
    
//     constructor(uint256 firstEpoch, address strongAddress_, uint256 stakeFeeNumerator_, uint256 stakeFeeDenominator_,uint256 unstakeFeeNumerator_, uint256 unstakeFeeDenominator_,
//         uint256 claimFeeNumerator_, uint256 claimFeeDenominator_,uint256 minStakeAmount_, uint256 stakingTxLimit_, address payable feeWallet_) 
        
//         PlatformFees(stakeFeeNumerator_,stakeFeeDenominator_,unstakeFeeNumerator_,unstakeFeeDenominator_,claimFeeNumerator_,
//         claimFeeDenominator_,minStakeAmount_, stakingTxLimit_,feeWallet_)
//     {
//         upcomingEpochTime = firstEpoch;
//         lastEpochTime = firstEpoch;
//         strongTokenContract = IERC20(strongAddress_);
//         idCounter = 1;
//     }
    
    
//     // function for the user to stake their Strong Tokens in the Pool. 
//     function stake(uint256 amount_)public override payable{
//         require( amount_.mul(getStakeFeeNumerator()).div(getStakeFeeDenominator()) == msg.value, "ETH2.0POOL: Value can not be greater or less than staking fee");
//         require( amount_ >= getMinStakeAmount(), "ETH2.0POOL: Amount can not be less than minimum staking amount");
//         require( _ownerIds[msg.sender].length < getStakeLimit(), "ETH2.0POOL: User can not exceed stake tx limit");
        
//         require( strongTokenContract.transferFrom(msg.sender, address(this), amount_ ) , "ETH2.0POOL: Insufficient funds");
        
//         uint256 userWeight = calculateWeight(amount_, block.timestamp, upcomingEpochTime);
         
//         userStake memory newstake_ = userStake(idCounter,amount_,msg.sender, block.timestamp, false);
            
//         StakeList[idCounter]= newstake_;
        
//         if (!_ownerIdExists(msg.sender, idCounter)) {
//             _addOwnerId(msg.sender, idCounter);
//         }
         
//         totalStaked = totalStaked.add(amount_);
//         upcomingTotalWeight = upcomingTotalWeight.add(userWeight);
//         processFee(msg.value);
        
//         incrementCounter();
//         emit Staked(msg.sender, amount_);
//     }

    
//     // function for the user to unstake their strong tokens. 
//     function unStake(uint256[]memory stakeIds_)public override payable{
//         require(stakeIds_.length <= getStakeLimit(), "ETHPool: Input array length is greater than approved length");
        
//         uint256 userWeight=0;
//         uint256 userTokens=0;
//         uint256 stakedAmount= 0;
//         uint256 userReward = 0;
        
//         for (uint256 i =0; i< stakeIds_.length; i++){
//             require(StakeList[stakeIds_[i]].userAddress == msg.sender, "ETHPool: Only owner can unStake tx");
//             require(StakeList[stakeIds_[i]].unStaked == false, "ETHPool: Transaction already unStaked");
            
//             userReward = userReward.add(calculateReward(stakeIds_[i]));
            
//             userWeight = userWeight.add( calculateWeight(StakeList[stakeIds_[i]].amount, StakeList[stakeIds_[i]].timeStamp, upcomingEpochTime) );
//             userTokens = userTokens.add(StakeList[stakeIds_[i]].amount);
//             stakedAmount = stakedAmount.add(StakeList[stakeIds_[i]].amount);
//             StakeList[stakeIds_[i]].unStaked = true;
            
//             if (_ownerIdExists(msg.sender, stakeIds_[i])) {
//                 _deleteOwnerId(msg.sender, stakeIds_[i]);
//             }

//         }
        
//         if (stakedAmount.mul(getUnstakeFeeNumerator() ).div(getUnstakeFeeDenominator() ) != msg.value ){
//             revert("ETH2.0POOL: Value can not be greater or less than unstaking fee");
//         }
        
//         upcomingTotalWeight = upcomingTotalWeight.sub(userWeight);
//         totalStaked = totalStaked.sub(userTokens);
        
//         strongTokenContract.transfer(msg.sender, userTokens);
//         processFee(stakedAmount.mul(getUnstakeFeeNumerator() ).div(getUnstakeFeeDenominator()));
//         processClaimPayment(userReward, payable(msg.sender));
        
//         emit Unstaked(msg.sender, userWeight);

//     }

    
//     // funciton to Claim reward by providing the ids of the staking entries. 
//     function claimReward(uint256[]memory stakeIds_)public override {
//         require(stakeIds_.length <= getStakeLimit(), "ETHPool: Input array length is greater than approved length");
//         uint256 userReward = 0;
        
//         for (uint256 i =0; i< stakeIds_.length; i++){
//             require(StakeList[stakeIds_[i]].userAddress == msg.sender, "ETHPool: Only owner can claim reward");
//             require(StakeList[stakeIds_[i]].unStaked == false, "ETHPool: Can not claim unstaked tx");
            
//             if( calculateReward(stakeIds_[i]) > 0 ){
                
//                 userReward = userReward.add(calculateReward(stakeIds_[i]));
//                 StakeList[stakeIds_[i]].timeStamp = block.timestamp;
//             }
//         }
        
//         require( userReward > 0, "ETHPool: No reward to claim");
        
//         processClaimPayment(userReward, payable(msg.sender));    
//     }
    
    
//     // helper function to calculate user's proportion with respect to the total pool. 
//     function calculateReward(uint256 stakeId_)public override view returns(uint256){
//         uint256 weightProportion = calculatePercentage(lastWeightOf(stakeId_), lastTotalWeight);
//         return valueOfPercentage(weightProportion, EpochReward);
        
//     }
    
//     // function for the admin to update the epoch time.
//     function changeEpochTime(uint256 newTime_, bool firstEpoch)public onlyOwner{
//         require(newTime_ > upcomingEpochTime, "ETHPool: new time value should be greater than current time");
        
//         uint256 weightDiff = calculateWeight(totalStaked, upcomingEpochTime, newTime_);
        
//         upcomingEpochTime = newTime_;
//         upcomingTotalWeight = upcomingTotalWeight.add(weightDiff);
        
//         if (firstEpoch){
//             lastEpochTime = upcomingEpochTime;
//             lastTotalWeight = upcomingTotalWeight;
//         }
        
//         emit EpochUpdated(newTime_);
//     }
    

//     //  function for the admin to add new epoch by providing new timestamp 
//     //  admin will send the reward of the last epoch. 
//     function addNewEpoch(uint256 newTime_)public override payable onlyOwner{
//         require (newTime_ > upcomingEpochTime, "ETHPool: new time value should be greater than last time");
//         require(block.timestamp > upcomingEpochTime, "ETHPool: can not add new epoch until last epoch ends");
//         require(msg.value > 0, "ETHPool: Reward value can not be zero");
        
//         totalReward = totalReward.add(msg.value);
//         lastTotalWeight = upcomingTotalWeight;
//         lastEpochTime = upcomingEpochTime;
        
//         upcomingEpochTime = newTime_;
//         EpochReward = address(this).balance;
        
//         emit NewEpochAdded(newTime_);
//     }
    
//     // function to process user claim transaction, after deducting the claim fees. 
//     function processClaimPayment(uint256 amount_, address payable recepient)private{
        
//         if (amount_> 0){
//             uint256 fee = amount_.mul(getClaimFeeNumerator() ).div(getClaimFeeDenominator() );
            
//             getFeeWallet().transfer(fee);
//             recepient.transfer(amount_.sub(fee));
//         }
//     }
    
    
//     // function to transfer collected fee to fee wallet. 
//     function processFee(uint256 value_)internal {
//         getFeeWallet().transfer(value_);
//     }
    
    
//     // function to get the weight of the provided id till the upcoming epoch. 
//     function upcomingWeightOf(uint256 stakeId)public override view returns(uint256){
        
//         return calculateWeight(StakeList[stakeId].amount, StakeList[stakeId].timeStamp, upcomingEpochTime);
//     }
   
    
//     // function to get the weight of the provided id till last epoch. 
//     function lastWeightOf(uint256 stakeId)public override view returns(uint256){
        
//         return calculateWeight(StakeList[stakeId].amount,StakeList[stakeId].timeStamp, lastEpochTime);
//     }
    
    
//     // function to get details of staking tx by providing stake id
//     function getStakeInfo(uint256 stakeId) public view returns (userStake memory){
       
//        return StakeList[stakeId];
//     }
   
    
//     // function to increment the id counter of Staking entries
//     function incrementCounter()private {
//         idCounter = idCounter.add(1);
//     }
   
   
//     // function to get the value of a certain percentage number
//    function valueOfPercentage(uint256 number_,uint256 percentage_) internal pure returns(uint256) {
//        return ( (number_.mul(percentage_)).div(100));
       
//    }
   
   
//    // function to calculate percentage. 
//    function calculatePercentage(uint256 number_, uint256 total_)internal pure returns(uint256){
       
//        if (total_ > 0){
//             return ( (number_.mul(100)).div(total_));
//        }else{
//            return 0;
//        }
//     }
    
    
//     // function to calculate weight by providing number of strong token, current time and time of coming epoch
//     function calculateWeight(uint256 amount_, uint256 Timestamp ,uint256 epochTime)internal pure returns(uint256){
        
//         uint256 Weight = 0;
        
//         if (epochTime > Timestamp){
//             Weight = epochTime.sub(Timestamp);
//             Weight = Weight.div(oneDay);
//             Weight = amount_.mul(Weight);            
//         }

//         return Weight;
//     }

    
//     function _deleteOwnerId(address owner, uint256 id) internal {
//         uint256 lastIndex = _ownerIds[owner].length.sub(1);
//         uint256 lastId = _ownerIds[owner][lastIndex];
        
//         if (id == lastId) {
//             _ownerIdIndex[owner][id] = 0;
//             _ownerIds[owner].pop();
//         } else {
//             uint256 indexOfId = _ownerIdIndex[owner][id];
//             _ownerIdIndex[owner][id] = 0;

//             _ownerIds[owner][indexOfId] = lastId;
//             _ownerIdIndex[owner][lastId] = indexOfId;
//             _ownerIds[owner].pop();
//         }
        
//     }
  
//   function _addOwnerId(address owner, uint256 id) internal {
//       uint256 len = _ownerIds[owner].length;
//       _ownerIdIndex[owner][id] = len;
//       _ownerIds[owner].push(id);
//   }

//   function _ownerIdExists(address owner, uint256 id) internal view returns (bool) {
//       if (_ownerIds[owner].length == 0) return false;
      
//       uint256 index = _ownerIdIndex[owner][id];
//       return id == _ownerIds[owner][index];
      
//   }
  
//   function getUserIds(address user) public view returns (uint256[] memory) {
//        return _ownerIds[user];
       
//    }
   
//    function getUserIdIndex(address user, uint256 id) public view returns (uint256) {
//        return _ownerIdIndex[user][id];
//    }
   
//    fallback() external payable {
//         emit fallBackLog(msg.sender,msg.value);
       
//    }
   
//    receive() external payable {
//        emit receivedLog(msg.sender, msg.value);
       
//    }

    
// }
