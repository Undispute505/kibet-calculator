function roundTo(num){
  if(typeof num === 'number'){
    const rounded = Math.round((num + Number.EPSILON) * 1e12) / 1e12;
    return rounded;
  }
  return num;
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

// Basic tests
const tests = [
  {a:5, b:3, op: '+', expected:8},
  {a:10, b:2, op: '/', expected:5},
  {a:0.1, b:0.2, op: '+', expected:0.3},
  {a:1.2345678912345, b:0.0000000000002, op: '+', expected:1.2345678912347},
  {a:9, b:0, op: '/', expected:'Error'},
  {a:2.5, b:3, op: '*', expected:7.5},
  {a:10, b:7, op: '-', expected:3}
];

let passed = 0;
for(const t of tests){
  const result = calculate(t.a, t.b, t.op);
  const ok = Object.is(result, t.expected);
  console.log(`${t.a} ${t.op} ${t.b} =>`, result, ok ? 'OK':'FAIL, expected '+t.expected);
  if(ok) passed++;
}

console.log(`\nPassed ${passed}/${tests.length} tests.`);
