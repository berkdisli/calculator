import React, { useState } from "react";
import Wrapper from './components/Wrapper';
import ButtonBox from './components/ButtonBox';
import Screen from './components/Screen';
import Button from './components/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocale = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const deleteSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // The numClickHandler function gets triggered only if any of the number buttons (0–9) are pressed.
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (deleteSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : deleteSpaces(calc.num) % 1 === 0
              ? toLocale(Number(deleteSpaces(calc.num + value)))
              : toLocale(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      })
    }
  }

  // It adds the decimal point to the current num value, making it a decimal number.
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    })
  }

  // The signClickHandler function gets fired when the user press either +, –, * or /. 
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  }
  // The equalsClickHandler function calculates the result when the equals button (=) is pressed
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "X"
              ? a * b
              : a / b;

      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/"
          ? "Cannot divide with 0"
          : toLocale(
            math(Number(deleteSpaces(calc.res)),
              Number(deleteSpaces(calc.num)), calc.sign)),
        sign: "",
        num: 0,
      })
    }
  }
  // The function first checks, if there’s any entered value (num) or calculated value (res), and then inverts them by multiplying with -1:
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocale(deleteSpaces(calc.num * -1)) : 0,
      res: calc.res ? toLocale(deleteSpaces(calc.res * -1)) : 0,
      sign: "",
    })
  }

  // calculates the percentage using the built-in Math.pow function, which returns the base to the exponent power
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
    })
  }

  // This function defaults all the initial values of calc, returning the calc state as it was when the Calculator app was first rendered.
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    })
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                        ? equalsClickHandler
                        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                          ? signClickHandler
                          : btn === "."
                            ? commaClickHandler
                            : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
