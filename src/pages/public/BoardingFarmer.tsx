import Container from "@material-ui/core/Container";
import classnames from "classnames";
import React, { useState } from "react";
import {
  BoardingFarmerContact,
  BoardingFarmerDateSelection,
  BoardingFarmerIntroduction,
  BoardingFarmerSupportData
} from "../../components/BoardingFarmer";
import { BooleanSwitch } from "../../components/Switch";

type Props = {};

const steps = [
  // { index: 0, Component: BoardingFarmerIntroduction },
  { index: 0, Component: BoardingFarmerSupportData },
  { index: 1, Component: BoardingFarmerDateSelection },
  { index: 2, Component: BoardingFarmerContact }
];

const lastIndex = steps.length - 1;
const dotSize = 9;
const DotStyles = { width: dotSize, height: dotSize };

function Dot({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={classnames(
        "inline-block rounded-full mr-2",
        isActive ? "bg-primary-dark" : "bg-primary-light"
      )}
      style={DotStyles}
    />
  );
}

const BoardingFarmer = ({}: Props) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const ActiveComponent = steps[activeStepIndex].Component;

  return (
    <Container>
      <BooleanSwitch
        value={hasStarted}
        trueRender={
          <ActiveComponent
            triggerNextPage={() =>
              setActiveStepIndex(
                activeStepIndex === lastIndex ? lastIndex : activeStepIndex + 1
              )
            }
            stepIndicatorBar={
              <div className="w-full block text-center">
                {steps.map((step, i) => (
                  <Dot key={step.index} isActive={i === activeStepIndex} />
                ))}
              </div>
            }
          />
        }
        falseRender={
          <BoardingFarmerIntroduction
            triggerNextPage={() => setHasStarted(true)}
          />
        }
      />
    </Container>
  );
};

export default BoardingFarmer;
