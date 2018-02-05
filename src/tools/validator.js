export class Validator {
    constructor(selector) {

    }

    check(element, rule) {

    }

    required (value) {
        return (value !== "")
    }

    number (value, min, max) {
        //是数字类型返回真
        return !isNaN(Number(value))
    }

    integer (value) {
        //是整数类型返回真
        return /^[1-9][0-9]*$/.test(value)
    }

}



const Validater = (element, rule) => {
    return element.value
}

export default Validater
