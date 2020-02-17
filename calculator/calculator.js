// CONST
let display = document.getElementById('display')
let nums = ''
let expArr = []
let newAns = false

// MAIN
// Kick it offffffff
listening()

// FUNCTIONS
// Click listener
function listening () {
  document.addEventListener('click', getInput)
}

// get button pressed, call method depending on the button
function getInput () {
  const buttonVal = event.target.value
  console.log('Button clicked:', buttonVal)
  switch (buttonVal) {
    case (!isNaN(buttonVal) || '.'):
      console.log(`doNum(buttonVal) - buttonval: ${buttonVal}`)
      doNum(buttonVal)
      break
    case 'AC':
      console.log(`AC - buttonval: ${buttonVal}`)
      clear(true)
      break
    case 'CE':
      console.log(`CE - buttonval: ${buttonVal}`)
      clear(false)
      break
    case '=':
      console.log(`Calculating: ${buttonVal}`)
      calculateExp()
      break
    default:
      console.log(`Default: ${buttonVal}`)
      storeNum(buttonVal)
  }
}
// do stuff with actual numbers
function doNum (input) {
  // if input = '.' and numstring includes decimal already - IGNORE IT
  if (nums.includes('.') && input === '.') {
    console.log('Ignoring second decimal point in button input')
  }
  // elif the button is zero and the num var is already *only* zero
  else if (nums.length === 1 && nums[0] === '0' && input === '0') {
    console.log('Ignoring second zero button input')
  } else {
    if (newAns) { // reset the bool if it's a new answer
      resetNums()
    }
    // add the input to the nums string, reset the display
    nums = nums + input
    setDisplay(nums)
  }
}
// Evaluate stored nums & exp if the user presses '='
function calculateExp () {
  // push the nums string to the expression array
  expArr.push(nums)
  // iterate over the array & evaluate
  let tempNum = Number(expArr[0]) // temp holder for the current number
  for (let i = 0; i < expArr.length; i++) {
    let operator = expArr[i]
    let nextNum = Number(expArr[i + 1])
    console.log('operator:', operator, 'nextNum:', nextNum)
    switch (operator) {
      case '+':
        tempNum += nextNum
        break
      case '-':
        tempNum -= nextNum
        break
      case '*':
        tempNum *= nextNum
        break
      case '/':
        tempNum /= nextNum
        break
    }
  }
  if (tempNum < 0) {
  // Not going to lie I had to check the solution, this tripped me up for aaaages
    tempNum = Math.abs(tempNum) + '-'
  }
  console.log('summing, tempNum:', tempNum)
  finishCalc(tempNum)
}
// Store numbers while we are getting button input, before user presses '='
function storeNum (num) {
  if (nums === '') {
    if (expArr.length === 0) { // Will escape out if the array is 0 (can't reduce length of array otherwise)
      return
    }
    expArr.length = expArr.length - 1
    expArr.push(num)
    console.log(`StoreNum(): pushing num '${num}' to expArray.`)
    logGlobals()
  } else {
    // store the string expression already saved and the new number to the expression array
    expArr.push(nums) // stored expression string
    expArr.push(num) // button pressed
    nums = '' // Does this also need to set the newAns to true??? seems to be ok...
  }
}
function setDisplay (displayVal) {
  console.log('setDisplay(displayVal) - displayVal:', displayVal)
  display.value = displayVal
}
function clear (allBool) {
  nums = ''
  setDisplay('0')
  if (allBool) { expArr = [] }
}
function resetNums () {
  nums = ''
  newAns = false
}
function finishCalc (num) {
  setDisplay(num)
  expArr = []
  newAns = true
  nums = JSON.stringify(num)
}
function logGlobals () {
  console.log('nums:', nums, '\nnewAns:', newAns, '\nexpArr:', expArr)
}
