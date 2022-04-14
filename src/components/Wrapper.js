import React from "react";
import "./Wrapper.css";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";


const Wrapper = () => {
    return <div className="wrapper">
        <Screen value={0} />
        <ButtonBox />

    </div>;
};


export default Wrapper;