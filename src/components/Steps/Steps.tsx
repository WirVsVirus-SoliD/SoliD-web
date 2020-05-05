import React from "react";
import { Step, StepContent } from ".";
import { useSteps } from "./useSteps";

type ChildrenProps = Omit<
  ReturnType<typeof useSteps>,
  "StepsBar" | "ActiveStepContent"
>;

export type Props = {
  steps: Step[];
  contents: StepContent[];
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
