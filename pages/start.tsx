import { useMultiStep } from "../hooks";
import { BasicTable, InitialInputs, NavBar } from "../components";
import { useState } from "react";

export default function Start() {
  const [initalInputs, setInitialInputs] = useState({
    seedKeyword: "",
    websiteUrl: "",
    companyName: "",
  });

  const [keywordSuggestions, setKeywordSuggestions] = useState<Set<string>>(
    new Set()
  );

  const { currentStep, moveForward, moveBack, stepsIndex } = useMultiStep([
    <InitialInputs
      initalInputs={initalInputs}
      setInitialInputs={setInitialInputs}
      key="InitialInputs"
    />,
    <BasicTable
      key="BasicTable"
      keyword={initalInputs.seedKeyword}
      keywordSuggestions={keywordSuggestions}
      setKeywordSuggestions={setKeywordSuggestions}
    />,
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
