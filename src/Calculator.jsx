import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const validateInput = () => {
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers.');
      return false;
    }
    setError('');
    return true;
  };

  const performOperation = (operator) => {
    if (!validateInput()) return;

    const a = parseFloat(num1);
    const b = parseFloat(num2);
    let res;
    let expression;

    switch (operator) {
      case '+':
        res = a + b;
        expression = `${a} + ${b} = ${res}`;
        break;
      case '-':
        res = a - b;
        expression = `${a} - ${b} = ${res}`;
        break;
      case '*':
        res = a * b;
        expression = `${a} * ${b} = ${res}`;
        break;
      case '/':
        if (b === 0) {
          setError('Cannot divide by zero.');
          return;
        }
        res = a / b;
        expression = `${a} / ${b} = ${res}`;
        break;
      default:
        return;
    }

    setResult(res);
    setHistory([expression, ...history]);
  };

  const clearAll = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setError('');
  };

  return (
    <div className="calculator-container">
      <h2>Simple Calculator</h2>
      <input
        type="text"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <div className="button-group">
        <button className="btn green" onClick={() => performOperation('+')}>Add (+)</button>
        <button className="btn red" onClick={() => performOperation('-')}>Subtract (-)</button>
        <button className="btn orange" onClick={() => performOperation('*')}>Multiply (*)</button>
        <button className="btn blue" onClick={() => performOperation('/')}>Divide (/)</button>
      </div>
      <button className="btn gray clear" onClick={clearAll}>Clear</button>

      {error && <p className="error">{error}</p>}
      {result !== null && <h3>Result: {result}</h3>}

      {history.length > 0 && (
        <div className="history">
          <h4>Calculation History</h4>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Calculator;