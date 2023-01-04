const previousOpTXT = document.querySelector("#previous-op");
const currentOpTXT = document.querySelector("#current-op");
const buttons = document.querySelectorAll("#structure button");

class Calculator{
    constructor(previousOpTXT, currentOpTXT){
        this.previousOpTXT = previousOpTXT;
        this.currentOpTXT = currentOpTXT;
        this.currentOp = "";
    }
    //adiciona um digito ao numero atual
    addDigit(digit){ 
        //checa se o digito é um ponto e se o numero atual já tem um ponto
        if(digit === "," && this.currentOpTXT.innerText.includes(",")){
            return;
        }
        this.currentOp = digit;
        this.updateDisplay();
    }

    //processa a operação
    processOperation(operation){
        //checa se o numero atual está vazio
        if(this.currentOpTXT.innerText === "" && operation !== "C"){
            if(this.previousOpTXT.innerText !== ""){  
                this.changeOperation(operation);
            }
            return;
        }

        //pega o valor anterior e o atual
        let operationValue;
        let previous = +this.previousOpTXT.innerText.split(" ")[0];
        let current = +this.currentOpTXT.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.delOperation();
                break;
            case "CE":
                this.clearOperation();
                break;
            case "C":
                this.clearAllOperation();
                break;
            case "=":
                this.equalOperation();
                break;
            default:
                return;
        }
    }

    //atualiza o display
    updateDisplay(operationValue = null,operation = null,current = null,previous = null){
        console.log(operationValue, operation, current, previous);

        if(operationValue === null){
            this.currentOpTXT.innerText += this.currentOp;
        }else{
            //checa se o valor da operação é zero e se adiciona o valor atual
            if(operationValue === 0){
                operationValue = current;
            }
            //adiciona o valor atual ao previous
            this.previousOpTXT.innerText = `${operationValue} ${operation}`;
            this.currentOpTXT.innerText = "";
        }
    }
    // change math operation
    changeOperation(operation){
        const mathOperation = ["+" , "-" , "*" , "/"];
        if(!mathOperation.includes(operation)){
            return;
        }
        this.previousOpTXT.innerText = this.previousOpTXT.innerText.slice(0, -1) + operation;
    }
    //deleta a operação
    delOperation(){
        this.currentOpTXT.innerText = this.currentOpTXT.innerText.slice(0, -1);
    }
    //limpa a operação atual
    clearOperation(){
        this.currentOpTXT.innerText = "";
    }
    //limpa todas as operações
    clearAllOperation(){
        this.currentOpTXT.innerText = "";
        this.previousOpTXT.innerText = "";
    }
    //faz a operação
    equalOperation(){
        let operationValue;
        let previous = +this.previousOpTXT.innerText.split(" ")[0];
        let current = +this.currentOpTXT.innerText;
        let operation = this.previousOpTXT.innerText.split(" ")[1];
        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateDisplay(operationValue, operation, current, previous);
                break;
            default:
                return;
        }
    }
}

const calculator = new Calculator(previousOpTXT, currentOpTXT);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === ","){
            calculator.addDigit(value);
        }else{
            calculator.processOperation(value)
        }
    });
});