import { useMultiStep } from "../hooks";
import {
  KeywordTable,
  InitialInputs,
  NavBar,
  GeneratedTagsDisplay,
} from "../components";
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

  const { currentStep, moveForward, moveBack, stepsIndex, moveTo, isLastStep } =
    useMultiStep([
      <InitialInputs
        key="InitialInputs"
        initalInputs={initalInputs}
        setInitialInputs={setInitialInputs}
      />,
      <KeywordTable
        key="KeywordTable"
        keyword={initalInputs.seedKeyword}
        keywordSuggestions={keywordSuggestions}
        setKeywordSuggestions={setKeywordSuggestions}
      />,
      <GeneratedTagsDisplay
        key="GeneratedTagsDisplay"
        keywords={Array.from(keywordSuggestions)}
        url={initalInputs.websiteUrl}
        companyName={initalInputs.companyName}
      />,
    ]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* <Breadcrumbs separator="›" aria-label="breadcrumbs">
        <div onClick={() => moveTo(0)}>Initial Inputs</div>
        <div onClick={() => moveTo(1)}>Keywords</div>
        <div onClick={() => moveTo(2)}>Results</div>
      </Breadcrumbs> */}

      <div className="flex-grow flex flex-col justify-center items-center">
        <form
          className="flex flex-col justify-between"
          onSubmit={(e) => {
            moveForward(e);
          }}
        >
          {currentStep}
          <div className="flex justify-between">
            <button
              className="rounded-md border-2 pr-2 pl-2 mt-2 hover:bg-logoColor hover:text-lightestGrey transition-all"
              type="button"
              onClick={moveBack}
            >
              Move Back
            </button>
            {!isLastStep && (
              <button
                className="rounded-md border-2 pr-2 pl-2 mt-2 hover:bg-logoColor hover:text-lightestGrey transition-all"
                type="submit"
              >
                Move Forward
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
