import React, { useState } from "react";
import { StepsBar } from "./components";
import { Step } from ".";

type StepsBarRestProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export function useSteps(steps: Step[]) {
  const maxIndex = steps.length - 1;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const goTo = (index: number) => {
    setActiveStepIndex(index < 0 ? 0 : index > maxIndex ? maxIndex : index);
  };
  const goPrevious = () => goTo(activeStepIndex - 1);
  const goNext = () => goTo(activeStepIndex + 1);

  return {
    activeStepIndex,
    goPrevious,
    goNext,
    StepsBar: (props: StepsBarRestProps) => (
      <StepsBar activeStepIndex={activeStepIndex} steps={steps} {...props} />
    ),
    ActiveStepContent: steps[activeStepIndex].Content
  };
}
