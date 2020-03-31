import React, { useState } from "react";
import classnames from "classnames";

type Props = {
  steps: Step[];
};

type Step = {
  title: string;
  Icon: React.ComponentType<IconProps>;
  Content: React.ComponentType<{}>;
};
// Copied from the definitions file of `react-feather`
type IconProps = {
  color?: string;
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

const Steps = ({ steps }: Props) => {
  const maxIndex = steps.length - 1;
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const goTo = (index: number) => {
    setActiveStepIndex(index < 0 ? 0 : index > maxIndex ? maxIndex : index);
  };
  const goPrevious = () => goTo(activeStepIndex - 1);
  const goNext = () => goTo(activeStepIndex + 1);
  const ActiveStepContent = steps[activeStepIndex].Content;

  return (
    <div>
      <ul className="flex">
        {steps.map(({ Icon, title }, i) => {
          const isActive = i < activeStepIndex;

          return (
            <li
              key={title}
              className={classnames(
                "steps__bar-list-item flex-grow overflow-hidden",
                {
                  "steps__bar-list-item--active": isActive,
                  "text-grey": i > activeStepIndex,
                  "text-brand": i <= activeStepIndex
                }
              )}
              onClick={() => setActiveStepIndex(i)}
            >
              <div
                className={classnames("steps__bar-icon inline-block px-2", {})}
              >
                <Icon />
              </div>
              <span
                className={classnames("block", {
                  "font-medium": i === activeStepIndex
                })}
              >
                {title}
              </span>
            </li>
          );
        })}
      </ul>
      <div>
        <ActiveStepContent />
      </div>
    </div>
  );
};

export default Steps;
