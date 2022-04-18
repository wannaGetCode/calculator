import React, { useState } from 'react'

import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'

const Calculator = () => {
    const [sign, setSign] = useState("")
    const [num, setNum] = useState(0)
    const [result, setResult] = useState(0)

    console.group("React state")
    console.log("sign", sign)
    console.log("num", num)
    console.log("result", result)
    console.groupEnd()

    const clearButton = (num || result) ? "C" : "AC"
    const btnValues = [
        [clearButton, "+/-", "%", "/"],
        [7, 8, 9, "X"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
    ]

    const numberHandle = (e) => {
        e.preventDefault()
        const value = e.target.textContent

        setNum(Number(num + value))
        setResult(!sign ? 0 : result)
    }

    const commaHanlde = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML

        setNum(num => !num.toString().includes(".") ? num + value : num)
    }

    const operatorHandle = (e) => {
        e.preventDefault()
        const value = e.target.innerHTML

        setSign(value)
        setResult(result => !result && num ? num : result)
        setNum(0)
    }

    const equalsHandle = () => {
        if (sign && num) {
            function math(x, y, sign) {
                switch (sign) {
                    case "+":
                        return x + y
                    case "-":
                        return x - y
                    case "X":
                        return x * y
                    case "/":
                        return x / y
                    default:
                        throw Error()
                }
            }

            function handleResult() {
                if (num === 0 && sign === "/") {
                    return "Error"
                }
                return math(result, num, sign)
            }
            setResult(handleResult)
            setNum(0)
            setSign("")
        }
    }

    const invertHandle = () => {
        if (num) {
            setNum(num => num * -1)
        }
        if (!num && result) {
            setResult(result => result * -1)
        }
    }

    const percentHandle = () => {
        setNum(num => +num / 100)
        if (!num && result) {
            setResult(result => +result / 100)
        }
    }

    const resetHandler = (e) => {
        setNum(0)
        setResult(0)
        setSign("")
    }

    return (
        <Wrapper>
            <Screen value={num ? num : result} />
            <ButtonBox>
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={btn}
                            className={
                                btn === 0
                                    ? "zero"
                                    : [clearButton, "+/-", "%"].includes(btn)
                                    ? "first-line"
                                    : ["/", "X", "-", "+", "="].includes(btn)
                                    ? "operator"
                                    : ""}
                            value={btn}
                            onClick={
                                btn === clearButton
                                    ? resetHandler
                                    : btn === "+/-"
                                    ? invertHandle
                                    : btn === "%"
                                    ? percentHandle
                                    : btn === "="
                                    ? equalsHandle
                                    : ["/", "+", "-", "X"].includes(btn)
                                    ? operatorHandle
                                    : btn === "."
                                    ? commaHanlde
                                    : numberHandle
                            }
                        />
                    )
                })}
            </ButtonBox>
        </Wrapper>
    )
}

export default Calculator