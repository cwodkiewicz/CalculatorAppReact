import React, { useState } from "react";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  function inputDigit(digit) {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  }

  function inputDecimal() {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toFixed(7))));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }

  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        console.log("incorrect operator !!");
        return secondOperand;
    }
  }

  function resetCalculator() {
    setDisplayValue("0");
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  }

  return (
    <div className="calculator">
      <input
        type="text"
        className="calculator-screen"
        value={displayValue}
        readOnly
      />
      <div className="calculator-keys">
        <button onClick={() => handleOperator("+")} className="operator">
          +
        </button>
        <button onClick={() => handleOperator("-")} className="operator">
          -
        </button>
        <button onClick={() => handleOperator("*")} className="operator">
          ×
        </button>
        <button onClick={() => handleOperator("/")} className="operator">
          ÷
        </button>
        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>

        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>

        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>

        <button onClick={() => inputDigit(0)}>0</button>
        <button onClick={() => inputDecimal()} className="decimal">
          .
        </button>
        <button onClick={resetCalculator} className="all-clear">
          AC
        </button>
        <button onClick={() => handleOperator("=")} className="equal-sign">
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
