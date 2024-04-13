var twoSum = function(nums, target) {
    const countNum = {}
    for(let i=0;i<nums.length;i++){
     let countTarget = target-nums[i];
     if(countNum[countTarget]!=undefined){
         return [countNum[countTarget],i]
     }else{
         countNum[nums[i]] = i;
     }
    }
 };