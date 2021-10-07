var display = document.getElementById('displayBox');
var numberOne = document.getElementById('numberOne');
var numberTwo = document.getElementById('numberTwo');
var operator = document.getElementById('operator');
var _back;


function writeNumberOnDisplay(elementId) {
    if (display.value.search(/\./) == -1) document.getElementById('dec').disabled = false;
    if (eval(numberOne.value) != 0 && operator.value != '0') {
        if ((display.value == '*' || display.value == '-' || display.value == '+' || display.value == '/')) {
            display.value = elementId.innerHTML;
            numberTwo.value = display.value;
        } else {
            if (display.value == '0' || display.value == 'Syntax error') {
                display.value = elementId.innerHTML;
                numberTwo.value = display.value;
            } else {
                display.value += elementId.innerHTML;
                numberTwo.value = display.value;
                if (display.value.search(/\./) == -1) document.getElementById('dec').disabled = false; else document.getElementById('dec').disabled = true;
            }
        }
    } else {
        if (display.value == '0' || display.value == 'Syntax error') {
            display.value = elementId.innerHTML;
        } else {
            display.value += elementId.innerHTML;
        }
    }
}
function addOperator(elementId) {
    if (numberOne.value != '0' && numberTwo.value != '0' && operator.value != '0') { //se os 3 valores preenchidos
        var _back = true;
        calculate();
    }; 
    if (operator.value == '0' && numberOne.value == '0' && display.value != '0') { //se somente display preenchido, adiciona op
        numberOne.value = display.value;
        display.value = elementId.innerHTML;
        operator.value = display.value;
    }
    if (operator.value != '0' && display.value != '0') { // se operador e n1 preenchidos, adiciona op
        operator.value = elementId.innerHTML;
        display.value = operator.value;
        if (numberTwo.value > '0') {
            document.getElementById('numberOneHist').innerHTML = numberOne.value + ' ' +operator.value + ' ' + numberTwo.value + ' =';
        } else {
            document.getElementById('numberOneHist').innerHTML = numberOne.value + ' ' +operator.value;
        }
    }
    if (display.value.search(/\./) == -1) document.getElementById('dec').disabled = false; else document.getElementById('dec').disabled = true;
}
function addDecimal(elementId, status) {
    display.value += elementId.innerHTML;
    document.getElementById('dec').disabled = status;
}
function backSpace() {
    if (display.value != '0' || display.value != 'Syntax error') {
        display.value = display.value.substring(0, display.value.length -1);
    }
    if (display.value.length == 0) {
        display.value = '0';
    }
    if (display.value.search(/\./) == -1) document.getElementById('dec').disabled = false; else document.getElementById('dec').disabled = true;
}

function calculate() {
    try {
        if (operator.value == '/' && numberTwo.value == '0') {
        display.value = '0';
        return;
        }
        if (numberOne.value != 0 && operator.value != '0') {
            if (numberTwo.value != 0) {
                document.getElementById('numberOneHist').innerHTML = numberOne.value + ' ' +operator.value + ' ' + numberTwo.value + ' =';
            } else {
                document.getElementById('numberOneHist').innerHTML = numberOne.value + ' ' +operator.value;
            }
        }
        var result = eval(numberOne.value + operator.value + numberTwo.value);
        display.value = result;
        result = parseFloat(result).toFixed(2);
        numberOne.value = result;
        numberTwo.value = '0';
        if (display.value.search(/\./) != -1) document.getElementById('dec').disabled = true; else document.getElementById('dec').disabled = false;
        if (_back == true) {
            _back = false;
            addOperator();
        }
    } catch(err) {display.value = 'Syntax error';}
}
function eraseAll() {
    document.getElementById('numberOneHist').innerHTML = '0';
    display.value = '0';
    numberOne.value = '0';
    numberTwo.value = '0';
    operator.value = '0';
    document.getElementById('dec').disabled = false;
}