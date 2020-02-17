var numString = ''
var numArray = []
let display = document.getElementById('display')
let isPreviousResult = false

listen()

function listen () {
  document.addEventListener('click', getButtonValue)
  console.log(document)
}

function getButtonValue () {
  let button = event.target.value
  if (!isNaN(button) || button === '.') {
    number(button)
  } else if (button === 'AC') {
    allClear()
  } else if (button === 'CE') {
    clear()
  } else if (button === '=') {
    calculate()
  } else {
    storeNumber(button)
  }
}

function number (button) {
  if (button === '.' && numString.includes('.')) {
    return
  } else if (numString.charAt(0) === '0' && numString.length === 1 && button === '0') {
    return
  } else {
    if (isPreviousResult === true){
      numString = ''
      isPreviousResult = false
    }
    numString += button
    display.value = numString
  }
}

function allClear () {
  numString = ''
  numArray = []
  display.value = '0'
}

function clear () {
  numString = ''
  display.value = '0'
}

function storeNumber (button) {
  if (numString === '' && numArray.length === 0) {
    return
  } else if (numString === '') {
    numArray.length = numArray.length - 1
    numArray.push(button)
  } else {
    numArray.push(numString)
    numArray.push(button)
    numString = ''
  }
}

function calculate () {
  numArray.push(numString)
  let currentNumber = Number(numArray[0])
  for (var i = 0; i < numArray.length; i++) {
    let nextNumber = Number(numArray[i + 1])
    let symbol = numArray[i]
    if (symbol === '+') {
      currentNumber += nextNumber
    } else if (symbol === '-') {
      currentNumber -= nextNumber
    } else if (symbol === '*') {
      currentNumber *= nextNumber
    } else if (symbol === '/') {
      currentNumber /= nextNumber
    }
  }
  if (currentNumber < 0) {
    currentNumber = Math.abs(currentNumber) + '-'
  }

  display.value = currentNumber
  numString = JSON.stringify(currentNumber)
  isPreviousResult = true
  numArray = []
}
