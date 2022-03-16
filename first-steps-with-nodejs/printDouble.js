function multiply(a, b) {
  return a * b;
}

function double(number) {
  return multiply(number, 2);
}

function printDouble(number) {
  const result = double(number);
  console.log(result);
}

printDouble(2);
