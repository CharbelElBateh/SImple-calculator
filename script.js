const clearButton = document.querySelector("#clear");
const backSpace = document.querySelector("#backspace");
const equals = document.querySelector("#equal");
const result = document.querySelector(".result");
const number = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const decimal = document.querySelector("#decimal");
let SelectedOperator;

const operator = (a) => {
    if(result.innerText === '') return;
    else if(a == equals) evaluate(result.innerText);
    else if(result.innerText.charAt(result.innerText.length -1) == '+'
        || result.innerText.charAt(result.innerText.length -1) == '-'
        || result.innerText.charAt(result.innerText.length -1) == '*'
        || result.innerText.charAt(result.innerText.length -1) == "\\"){
            result.innerText = result.innerText.substring(0, result.innerText.length -1) + a.innerText;
            SelectedOperator = a.innerText;
    }else if(result.innerText.includes("+")
        || result.innerText.includes("-")
        || result.innerText.includes("*")
        || result.innerText.includes("\\")) return;
    else{
    result.innerText += a.innerText;
    SelectedOperator = a.innerText;
    }
}

operators.forEach(element => {
    element.addEventListener('click', ()=>{
        operator(element);
    })
});

const decimalFunction = () => {
    if(!SelectedOperator && !result.innerText.includes("."))
        result.innerText += ".";
    else if(SelectedOperator && !result.innerText.substring(result.innerText.indexOf(SelectedOperator), result.innerText.length -1).includes('.'))
            result.innerText += ".";
}

decimal.addEventListener('click', ()=>{
    decimalFunction();
})

const clear = ()=>{
    result.innerText = '';
}

clearButton.addEventListener('click', ()=>{
    clear();
})

const back = () => {
    result.innerText = result.innerText.substring(0, result.innerText.length -1);
}

backSpace.addEventListener('click', ()=>{
    back();
})

const numbers = (a)=>{
    result.innerText += a.innerText;
}

number.forEach(button => {
    button.addEventListener('click', ()=>{
        numbers(button);
    })
});

const pressedKey = (e) => {
    let key = document.querySelector(`button[data-key1="${e.keyCode}"]`)
    || document.querySelector(`button[data-key2="${e.keyCode}"]`)
    || document.querySelector(`button[data-key3="${e.keyCode}"]`);
    if(isFinite(key.innerText)){
        result.innerText+= key.innerText;
    }else if(key == clearButton){
        clear();
    }
    else operator(key)
}

window.addEventListener('keypress', pressedKey)

window.addEventListener('keyup', function(e){
    if(e.keyCode == "8")
        back();
})

const evaluate = (s) => {
    let firstPart = s.substring(0, s.indexOf(SelectedOperator))
    let secondPart = s.substring(s.indexOf(SelectedOperator)+1, s.length)
    result.innerText = operate(SelectedOperator, parseFloat(firstPart), parseFloat(secondPart))
}

const add = (a,b) => {
    return a + b;
}
const subtract = (a,b) => {
    return a - b;
}
const multiply = (a,b) => {
    return a * b;
}
const divide = (a,b) => {
    return a / b;
}
const operate = (operator, a, b) => {
    if (operator === '\\' && b === 0){
        alert("I used to do this when I was a kid too!");
        return 0;
    }else
        switch (operator) {
            case '+':
                return add(a,b);
                break;
            case '-':
                return subtract(a,b);
                break;
            case '*':
                return multiply(a,b);
                break;
            case '\\':
                return divide(a,b);
                break;
            default:
                break;
    }
}