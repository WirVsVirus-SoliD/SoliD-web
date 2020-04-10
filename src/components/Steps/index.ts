export { default as Steps } from "./Steps";
export { useSteps } from "./useSteps";

// Copied from the definitions file of `react-feather`
type IconProps = {
  color?: string;
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

export type Step = {
  title: string;
  Icon: React.ComponentType<IconProps>;
  okText: string;
};

export type StepContent = {
  stepIndex: number;
  Content: React.ComponentType<any>;
};
