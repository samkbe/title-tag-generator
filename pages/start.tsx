import { useMultiStep } from "../hooks";
import { BasicTable, InitialInputs, NavBar } from "../components";
import { useState } from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";

export default function Start() {
  const [initalInputs, setInitialInputs] = useState({
    seedKeyword: "",
    websiteUrl: "",
    companyName: "",
  });

  const [keywordSuggestions, setKeywordSuggestions] = useState<Set<string>>(
    new Set()
  );

  const { currentStep, moveForward, moveBack, stepsIndex, moveTo } =
    useMultiStep([
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
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Breadcrumbs separator="›" aria-label="breadcrumbs">
        <div onClick={() => moveTo(0)}>Initial Inputs</div>
        <div onClick={() => moveTo(1)}>Keywords</div>
        <div onClick={() => moveTo(2)}>Results</div>
      </Breadcrumbs>
      <div className="flex-grow flex flex-col justify-center items-center">
        {currentStep}
        <div className="flex justify-between w-full md:max-w-sm lg:max-w-xl">
          <button onClick={moveBack}>Move Back</button>
          <button onClick={moveForward}>Move Forward</button>
        </div>
      </div>
    </div>
  );
}
