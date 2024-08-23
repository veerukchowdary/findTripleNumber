const findTripleInteger = () => {
  // Program for moving the least significant digit to become the most significant digit, the new integer is exactly triple the original integer.
  // The number can't start with >=4 because the resultant number (* by 3) wiil have n+1 digits (Where n is number of digits in input number)
  // We left with only the numbers which are starting at 1,2,3. 
  // If number starts with 1, it should ends with 3,4,5 only as mentioned below.
  //      because if any number starts with 1 multiplied 3 the result will have the starting number as 3,4,5 as result starting is number is ending number of input
  // If number starts with 2, it should ends with 6,7,8. 
  // If number starts with 3, the number should end with 9 or 1. ex. 33*3 = 99, 34*3 = 102 
  // We can exclude the option of ending with 1 because it will have n+1 digits.
  
  // Based on the above the starting and ending number possibilites are mentioned below.
  let possibilities = [[1,3], [1,4], [1,5], [2,6], [2,7], [2,8], [3,9]];
  let results = [];
  possibilities.forEach(possibility => {
    // possiblity[0] is number starting digit
    // possibility[1] is number ending digit
    let numberArray = [possibility[1]];
    let leftoverArray = [0];
    let index = 0;
    let result = '';
    let resultAddedInd = true;
    
    while (!(numberArray[index] === possibility[0] && leftoverArray[index] === 0)) {

      // The below logic finds the the previous digit based on current digit and adds to number array.
      const multipliedNumber = numberArray[index] * 3 + leftoverArray[index];
      const nextDigit = multipliedNumber % 10;
      const nextLeftOver = Math.floor(multipliedNumber/10);
      let nextDigitAddIndicator = true;

      // The below code is added to avoid any infinite looping.
      for(let i = 0; i <= index; i++) {
        if(numberArray[i] === nextDigit && leftoverArray[i] === nextLeftOver) {
          nextDigitAddIndicator = false;
          resultAddedInd = false;
          break;
        } 
      }

      if(nextDigitAddIndicator) {
        numberArray.push(nextDigit);
        leftoverArray.push(nextLeftOver);
      } else {
        // Break looping incase of infinite looping.
        break;
      }
      index ++
    }
    if(resultAddedInd) {
      for(let i = 0; i <= index; i++) {
        result = result + numberArray.pop();
      }
      results.push(result);
    }
  });

  let finalResults = [];
  
  // Checking if results gathered above are meeting our critreia and adding to final Results 
  results.forEach(res => {
    const mul = res[res.length - 1] + res.slice(0, -1);
    if((BigInt(res) * BigInt(3n)) === BigInt(mul)) {
      finalResults.push(res);
    }
  });

  // Sorting finalResults array
  finalResults.sort((a,b) => BigInt(a) > BigInt(b) ? 1 : BigInt(a) < BigInt(b) ? -1 : 0 );
  
  if(finalResults.length >=1){
    return finalResults[0];
  } else {
    return "There is no such number";
  }
};

const result = findTripleInteger();
console.log(`The smallest positive integer meeting the criteria is: ${result}`);
