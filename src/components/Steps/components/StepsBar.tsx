import React from "react";
import classnames from "classnames";
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
    <ul className={classnames("flex", className)} {...rest}>
      {steps.map(({ Icon, title }, i) => (
        <li
          key={title}
          className={classnames(
            "steps__bar-list-item flex-grow overflow-hidden",
            {
              "steps__bar-list-item--active": i < activeStepIndex,
              "text-grey": i > activeStepIndex,
              "text-brand": i <= activeStepIndex
            }
          )}
        >
          <div className="steps__bar-icon inline-block px-2">
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
      ))}
    </ul>
  );
};

export default StepsBar;
