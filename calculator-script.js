class Calculator {
    constructor(lOperatorElements, cOperatorElements) {
        this.lOperatorElements = lOperatorElements
        this.cOperatorElements = cOperatorElements
        this.clear()
    }
    clear() {
        this.cOperator = ''
        this.lOperator = ''
        this.operation = ''
    }
    delete(){
        this.cOperator = this.cOperator.toString().slice(0, -1);
    }
    appNumber(number) {
        //this will only allows us to add one period symbol
        if ( number === '.' && this.cOperator.includes('.')) return
        this.cOperator = this.cOperator.toString() + number.toString()
        

    } 
    pickOperator(operation) {
        // this check allows us not to input anything if the display is empty
        if(this.cOperator === '') return
        //this check allows us to compute the previous inputs if another operator is chosen
        if(this.cOperator !== '') {
            this.compute()
        }
            this.operation = operation
            this.lOperator = this.cOperator
            this.cOperator = ''
    }
    compute() {

        let computation
        const prev = parseFloat(this.lOperator)
        const current = parseFloat(this.cOperator)
        //this is checking if there is anything currently to computate
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.cOperator = computation
        this.operation = ''
        this.lOperator = ''
    }
getDisplayNo(number){
    const stringNumber = number.toString()
    const intergerNumbers = parseFloat(stringNumber.split('.')[0])
    const decimalNumbers = stringNumber.split('.')[1]
    // const floatNumber = parseFloat(number)
    // if(isNaN(floatNumber)) return ''
    // return floatNumber.toLocaleString('en')

    // This IF statement allows us to check if there is a number present &
    // maximum Fractiong digits allows only one decimal place 
    // alos the check for a decimal number after a period symbol is entered
    let intergerDisplay
    if (isNaN(intergerNumbers)) {
        intergerDisplay = ''
    } else {
        intergerDisplay = intergerNumbers.toLocaleString('en', {
            maximumFractionDigits : 0 })
    }
    if(decimalNumbers != null) {
        return `${intergerDisplay}.${decimalNumbers}`
    } else {
        return intergerDisplay
    }
}

    updateDisplay() {
        this.cOperatorElements.innerText = this.getDisplayNo(this.cOperator)

        // This check allows the concatenation of the operator symbol next to the
        // last Operation in the display
        if(this.operation !== null) {
            this.lOperatorElements.innerText = 
            `${this.getDisplayNo(this.lOperator)} ${this.operation}`
        }
        
    }
}



const nButton = document.querySelectorAll('[number-input]');
const oprationButtons = document.querySelectorAll('[operator-button]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');
const lOperatorElements = document.querySelector('[data-lastOperator]');
const cOperatorElements = document.querySelector('[data-currentOperator]');


const calculator = new Calculator(lOperatorElements, cOperatorElements);

nButton.forEach(button => {button.addEventListener('click', () => {
    calculator.appNumber(button.innerText)
    calculator.updateDisplay()
    })
})

oprationButtons.forEach(button => {button.addEventListener('click', () => {
    calculator.pickOperator(button.innerText)
    calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})