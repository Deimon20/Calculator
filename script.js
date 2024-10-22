const buttons = document.querySelector('.calculator-buttons').querySelectorAll('button');
const currentDisplay = document.querySelector('.current-display');
const auxiliarDisplay = document.querySelector('.auxiliar-display');
let resultEntered = false;
let maxCharacters = getComputedStyle(document.body).getPropertyValue('--max-chars')


buttons.forEach(button => {
    button.addEventListener('click',()=> buttonCallback(button));
})

function buttonCallback(button){
    //create callbacks for every button type specified in button's classList
    if(button.classList.contains('number')) numberCallback(button);
    if(button.classList.contains('delete')) deleteCallback();
    if(button.classList.contains('clear')) clearCallback();
    if(button.classList.contains('clearEntry')) clearEntryCallback();
    if(button.classList.contains('operator')) operatorCallback(button);
    if(button.classList.contains('result')) resultCallback('byButton');
}

function numberCallback(button){
    if (resultEntered && auxiliarDisplay.value.length === 0){
        clearCallback()
        resultEntered = false;
    };

    if (currentDisplay.value.length < maxCharacters) currentDisplay.value += button.textContent;
}

function deleteCallback(){
    currentDisplay.value = currentDisplay.value.slice(0,-1);
}

function operatorCallback(button){
    let operatorSymbol = button.textContent;
    if (auxiliarDisplay.value.length != 0) {
        resultCallback('byOperator');
    };

    auxiliarDisplay.value = currentDisplay.value + ' ' + operatorSymbol;
    currentDisplay.value = '';
}

function resultCallback(objTrigger){
    let result = eval(auxiliarDisplay.value+currentDisplay.value)
    auxiliarDisplay.value = '';
    currentDisplay.value = result;

    if (objTrigger === 'byButton') resultEntered = true;
}

function clearCallback(){
    currentDisplay.value = '';
    auxiliarDisplay.value = '';
}

function clearEntryCallback(){
    currentDisplay.value = '';
}