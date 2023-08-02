import { useMultiStep } from "../hooks";
import { useState } from "react";
import {
  KeywordTable,
  InitialInputs,
  NavBar,
  GeneratedTagsDisplay,
} from "../components";

export default function Start() {
  const [initalInputs, setInitialInputs] = useState({
    seedKeyword: "",
    websiteUrl: "",
    companyName: "",
  });

  const [keywordSuggestions, setKeywordSuggestions] = useState<Set<string>>(
    new Set()
  );

  const { currentStep, moveForward, moveBack, isLastStep, isFirstStep } =
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
      <div className="flex-grow flex flex-col justify-center items-center">
        <form
          className="flex flex-col justify-between w-full items-center px-8 md:px-0"
          onSubmit={(e) => {
            moveForward(e);
          }}
        >
          {currentStep}
          <div className="flex justify-between">
            {!isFirstStep && (
              <button
                className="rounded-md border-2 pr-2 pl-2 mt-2 hover:bg-logoColor hover:text-lightestGrey transition-all"
                type="button"
                onClick={moveBack}
              >
                Back
              </button>
            )}
            {!isLastStep && (
              <button
                className="rounded-md border-2 pr-2 pl-2 mt-2 hover:bg-logoColor hover:text-lightestGrey transition-all"
                type="submit"
              >
                Forward
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
