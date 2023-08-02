import { ReactElement, useState } from "react";
import type { FormEvent } from "react";

export function useMultiStep(steps: ReactElement[]) {
  const [stepsIndex, setStepIndex] = useState(0);

  function moveBack() {
    setStepIndex((index) => {
      if (index <= 0) {
        return index;
      }
      return index - 1;
    });
  }

  function moveForward(e: FormEvent) {
    e.preventDefault();
    setStepIndex((index) => {
      if (index >= steps.length - 1) {
        return index;
      }
      return index + 1;
    });
  }

  function moveTo(index: number) {
    setStepIndex(index);
  }

  return {
    stepsIndex,
    currentStep: steps[stepsIndex],
    moveBack,
    moveForward,
    moveTo,
    isLastStep: stepsIndex === steps.length - 1,
    isFirstStep: stepsIndex === 0,
  };
}
