const calculatorDisplayOperation = document.querySelector('.calculator-display--operation');
const calculatorDisplayResult = document.querySelector('.calculator-display--result');
const calculatorKeys = document.querySelector('.calculator-buttons');

let calculator = {
    "displayedOperation": "",
    "displayedValue": "0",
    "firstValue": null,
    "secondValue": null,
    "operationAction": null,
    "prevKey": null
}

function updateResultDisplay() {
    calculatorDisplayResult.textContent = calculator.displayedValue;
}

function updateOperationDisplay() {
    calculatorDisplayOperation.textContent = calculator.displayedOperation;
}

function displayOperands(operand) {
    if(calculatorDisplayResult.textContent === "Infinity") {
        alert("Cannot divide by zero");
        return;
    } else if(calculatorDisplayOperation.textContent.includes("=")) {
        return;
    } else if(calculatorDisplayResult.textContent === "0" || calculator.prevKey === "operator") {
        calculator.displayedValue = operand;
        calculator.prevKey = "operand";
    } else {
        calculator.displayedValue = calculator.displayedValue + operand;
        calculator.prevKey = "operand";
    }
    updateResultDisplay();
}

function displayDecimal(dot) {
    if(calculatorDisplayResult.textContent === "Infinity") {
        alert("Cannot divide by zero");
        return;
    } else if(calculatorDisplayOperation.textContent.includes("=")) {
        return;
    } else if(calculator.displayedValue.includes(dot)) {
        return;
    }
    calculator.displayedValue = calculator.displayedValue + dot;
    updateResultDisplay();
}

function displayOperation(operator) {
    calculator.prevKey = "operator";
    if(calculatorDisplayResult.textContent === "Infinity") {
        alert("Cannot divide by zero");
        return;
    } else if(calculatorDisplayOperation.textContent.includes("=")) {
        calculatorDisplayOperation.textContent = "";
        calculator.displayedOperation = calculator.displayedValue + ' ' + operator;
        calculator.firstValue = calculator.displayedValue;
        calculator.displayedValue = calculator.firstValue;
        calculator.secondValue = null;
    } else if(calculatorDisplayOperation.textContent === "") {
        calculator.displayedOperation =  calculator.displayedValue + ' ' + operator;
        calculator.firstValue = calculator.displayedValue;
    } else {
        calculator.secondValue = calculator.displayedValue;
        calculator.displayedOperation = calculator.displayedOperation + ' ' + calculator.displayedValue + ' ' + operator;
    }
    
    updateOperationDisplay();
    handleOperation();
}

function handleOperation() {
    const firstValue = calculator.firstValue;
    const secondValue = calculator.secondValue;
    const action = calculator.operationAction;
    
    if(calculator.secondValue === null) {
        return;
    }
    let result = ''
  
    if (action === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue);
    } else if (action === 'subtract') {
        result = parseFloat(firstValue) - parseFloat(secondValue)
    } else if (action === 'multiply') {
        result = parseFloat(firstValue) * parseFloat(secondValue)
    } else if (action === 'divide') {
        result = parseFloat(firstValue) / parseFloat(secondValue)
    }

    if(result === Infinity) {
        calculator.displayedValue = result;
    } else {
        calculator.firstValue = result.toString();
        calculator.displayedValue = result.toString();
    }
    updateResultDisplay();
}

calculatorKeys.addEventListener('click', (e) => {
    if (!e.target.matches('button')) {
       return;
    }

    const calculatorKey = e.target;
    const action = calculatorKey.dataset.action;
    const keyTextContent = calculatorKey.textContent;

    if(!action) {
        displayOperands(keyTextContent);
    }

    if(action === "decimal") {
        displayDecimal(keyTextContent);
    }

    if( 
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
    ) {
        displayOperation(keyTextContent);   
        calculator.operationAction = action;
    }

    if(action === "calculate") {
        calculator.displayedOperation = calculator.displayedOperation + ' ' + calculator.displayedValue + ' ' + keyTextContent;
        calculator.secondValue = calculator.displayedValue;
        updateOperationDisplay();
        handleOperation();
    }

    if(action == "clear-all") {
        calculator = {
            "displayedOperation": "",
            "displayedValue": "0",
            "firstValue": null,
            "secondValue": null,
            "operationAction": null,
            "prevKey": null
        }
        updateOperationDisplay();
        updateResultDisplay();
    }

    if(action === "clear-entry") {
        calculator.displayedValue = "0";
        updateResultDisplay();
    }
});