import React from "react";
import { useArrayManager } from "~/lib/hooks";
import { StepsBar } from "./components";
import { Step, StepContent } from ".";

type StepsBarRestProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

const EmptyRender = () => null;

export function useSteps(
  steps: Step[],
  contents: (StepContent | StepContent[])[]
) {
  const { goPrevious, goNext, ...rest } = useArrayManager(contents);
  const currentValue = rest.currentValue as StepContent;

  return {
    activeStepIndex: currentValue.stepIndex,
    activeStep: steps[currentValue.stepIndex],
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
