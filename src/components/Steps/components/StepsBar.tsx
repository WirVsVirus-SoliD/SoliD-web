import classnames from "classnames";
import React from "react";
import { Props as StepsProps } from "../Steps";

type Props = {
  activeStepIndex: number;
  steps: StepsProps["steps"];
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;
const StepsBar = ({ activeStepIndex, steps, className, ...rest }: Props) => {
  return (
    <ul className={classnames("flex justify-between", className)} {...rest}>
      {steps.map(({ Icon, title }, i) => {
        if (i === 0) return null;

        return (
          <li
            key={title}
            className={classnames(
              "steps__bar-list-item flex flex-grow flex-row relative overflow-hidden",
              {
                "steps__bar-list-item--active": i < activeStepIndex,
                "text-grey": i > activeStepIndex,
                "text-brand": i <= activeStepIndex
              }
            )}
          >
            <div className="flex flex-col items-center">
              <div className="relative inline-block px-2">
                <Icon />
              </div>
              <span
                className={classnames("steps__bar-list-item-icon", {
                  "font-medium": i === activeStepIndex
                })}
              >
                {title}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default StepsBar;
