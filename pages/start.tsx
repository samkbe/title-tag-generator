import { useMultiStep } from "../hooks";
import { BasicTable, InitialInputs, NavBar } from "../components";
import { useState } from "react";

export default function Start() {
  const [initalInputs, setInitialInputs] = useState({
    seedKeyword: "Testing",
    websiteUrl: "",
    companyName: "",
  });

  const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);

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