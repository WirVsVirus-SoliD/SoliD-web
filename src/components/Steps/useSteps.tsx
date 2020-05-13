import React from "react";
import { useArrayManager } from "~/lib/hooks";
import { Step, StepContent } from ".";
import { StepsBar } from "./components";

type StepsBarRestProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

const EmptyRender = () => null;

export function useSteps(steps: Step[], contents: StepContent[]) {
  const { goPrevious, goNext, currentDotIndex, ...rest } = useArrayManager(
    contents
  );
  const currentValue = rest.currentValue as StepContent;

  return {
    activeStepIndex: currentValue.stepIndex,
    activeStep: steps[currentValue.stepIndex],
    currentDotIndex,
    goPrevious,
    goNext,
    StepsBar: (props: StepsBarRestProps) => (
      <StepsBar
        activeStepIndex={currentValue.stepIndex}
        steps={steps}
        {...props}
      />
    ),
    ActiveStepContent: currentValue?.Content ?? EmptyRender
  };
}
