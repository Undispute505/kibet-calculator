// Basic calculator logic
/*
 Behavior:
 - Support 0-9 digits and decimal
 - Operators: +, -, *, /
 - AC clears everything
 - Backspace removes last digit/char
 - Equals computes immediate result
 - Keyboard support: digits, + - * / Enter Backspace Escape . \n
 Implementation: simple state machine with immediate compute on operator or equals
*/

const display = document.getElementById('display');
const keys = document.querySelector('.keys');
const clearBtn = document.getElementById('clear');
const backBtn = document.getElementById('back');
const decimalBtn = document.getElementById('decimal');

let displayedValue = '0'; // string for display
let firstValue = null;   // number
let operator = null;     // string operator
let waitingForSecond = false; // boolean

function updateDisplay(){
  display.textContent = displayedValue;
}

function inputDigit(digit){
  if(waitingForSecond){
    displayedValue = digit;
    waitingForSecond = false;
  } else {
    displayedValue = displayedValue === '0' ? digit : displayedValue + digit;
  }
}

function inputDecimal(dot){
  if(waitingForSecond){
    displayedValue = '0' + dot;
    waitingForSecond = false;
    return;
  }
  if(!displayedValue.includes(dot)){
    displayedValue += dot;
  }
}

function handleOperator(nextOperator){
  const inputValue = parseFloat(displayedValue);
  if(operator && waitingForSecond){
    // changing operator before entering second number
    operator = nextOperator;
    return;
  }
  if(firstValue === null){
    firstValue = inputValue;
  } else if(operator){
    const currentValue = firstValue || 0;
    const result = calculate(currentValue, inputValue, operator);
    displayedValue = String(result);
    firstValue = result;
  }
  operator = nextOperator;
  waitingForSecond = true;
}

function calculate(a, b, op){
  switch(op){
    case '+': return roundTo(a + b);
    case '-': return roundTo(a - b);
    case '*': return roundTo(a * b);
    case '/': return b === 0 ? 'Error' : roundTo(a / b);
    default: return b;
  }
}

function roundTo(num){
  if(typeof num === 'number'){
    // Avoid long floating point results
    const rounded = Math.round((num + Number.EPSILON) * 1e12) / 1e12;
    return rounded;
  }
  return num;
}

// Expose core functions for external testing (browser or Node)
window.kibetCalc = {
  calculate,
  roundTo
};

function resetCalculator(){
  displayedValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecond = false;
}

function backspace(){
  if(waitingForSecond) return; // nothing to backspace
  if(displayedValue.length === 1 || (displayedValue.length === 2 && displayedValue.startsWith('-'))){
    displayedValue = '0';
  } else {
    displayedValue = displayedValue.slice(0, -1);
  }
}

function handleEqual(){
  const inputValue = parseFloat(displayedValue);
  if(operator && !waitingForSecond){
    const result = calculate(firstValue, inputValue, operator);
    displayedValue = String(result);
    firstValue = null;
    operator = null;
    waitingForSecond = false;
  }
}

// UI event listeners
keys.addEventListener('click', event => {
  const target = event.target;
  if(!target.matches('button')) return;

  if(target.dataset.num){
    inputDigit(target.dataset.num);
    updateDisplay();
    return;
  }

  if(target.dataset.op){
    handleOperator(target.dataset.op);
    updateDisplay();
    return;
  }

  if(target.id === 'equals'){
    handleEqual();
    updateDisplay();
    return;
  }

  if(target.id === 'decimal'){
    inputDecimal('.');
    updateDisplay();
    return;
  }

  // clear
  if(target.id === 'clear'){
    resetCalculator();
    updateDisplay();
    return;
  }

  if(target.id === 'back'){
    backspace();
    updateDisplay();
    return;
  }
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if(e.key >= '0' && e.key <= '9'){
    inputDigit(e.key);
    updateDisplay();
    e.preventDefault();
    return;
  }
  if(e.key === '.'){
    inputDecimal('.');
    updateDisplay();
    e.preventDefault();
    return;
  }
  if(['+','-','*','/'].includes(e.key)){
    handleOperator(e.key);
    updateDisplay();
    e.preventDefault();
    return;
  }
  if(e.key === 'Enter' || e.key === '='){
    handleEqual();
    updateDisplay();
    e.preventDefault();
    return;
  }
  if(e.key === 'Backspace'){
    backspace();
    updateDisplay();
    e.preventDefault();
    return;
  }
  if(e.key === 'Escape'){
    resetCalculator();
    updateDisplay();
    e.preventDefault();
    return;
  }
});

// Initialize
updateDisplay();
