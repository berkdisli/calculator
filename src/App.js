import Wrapper from './components/Wrapper';
import React, { useState } from "react";
import ButtonBox from './components/ButtonBox';
import Screen from './components/Screen';
import Button from './components/Button';


const App = () => {

  let [calc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

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
