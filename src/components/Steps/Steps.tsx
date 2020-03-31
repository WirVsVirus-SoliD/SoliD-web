import React from "react";
import { useSteps } from "./useSteps";
import { Step } from ".";

type ChildrenProps = Omit<
  ReturnType<typeof useSteps>,
  "StepsBar" | "ActiveStepContent"
>;

export type Props = {
  steps: Step[];
  children?: (props: ChildrenProps) => React.ReactNode;
};

const Steps = ({ steps, children }: Props) => {
  const { StepsBar, ActiveStepContent, ...rest } = useSteps(steps);

  return (
    <>
      <StepsBar />
      <ActiveStepContent />
      {children(rest)}
    </>
  );
};

export default Steps;
