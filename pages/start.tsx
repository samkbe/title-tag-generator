import { useMultiStep } from "../hooks";
import { BasicTable, InitialInputs, NavBar } from "../components";
import { useState } from "react";

export default function Start() {
  const [initalInputs, setInitialInputs] = useState({
    seedKeyword: "",
    websiteUrl: "",
    companyName: "",
  });

  const [keywords, setKeywords] = useState<string[]>([]);

  const { currentStep, moveForward, moveBack, stepsIndex } = useMultiStep([
    <InitialInputs
      initalInputs={initalInputs}
      setInitialInputs={setInitialInputs}
      key="sushsoo"
    />,
    <BasicTable key="27w37" />,
    <div key="3">Step 3</div>,
  ]);

  return (
    <>
      <NavBar />
      <div>
        {currentStep}
        <button onClick={moveBack}>Move Back</button>
        <button onClick={moveForward}>Move Forward</button>
      </div>
    </>
  );
}
