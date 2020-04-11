import React from "react";
import { useSteps } from "./useSteps";
import { Step, StepContent } from ".";

type ChildrenProps = Omit<
  ReturnType<typeof useSteps>,
  "StepsBar" | "ActiveStepContent"
>;

export type Props = {
  steps: Step[];
  contents: (StepContent | StepContent)[];
  children?: (props: ChildrenProps) => React.ReactNode;
};

const Steps = ({ steps, contents, children }: Props) => {
  const { StepsBar, ActiveStepContent, ...rest } = useSteps(steps, contents);

  return (
    <>
      <StepsBar />
      <ActiveStepContent />
      {children && children(rest)}
    </>
  );
};

export default Steps;
