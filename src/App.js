import Wrapper from './components/Wrapper';
import React, { useState } from "react";
import ButtonBox from './components/ButtonBox';
import Screen from './components/Screen';


const App = () => {

  let [calc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox />
    </Wrapper>

  );
};
export default App;
