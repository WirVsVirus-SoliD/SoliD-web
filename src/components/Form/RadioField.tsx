import React from "react";
import { FCProps } from "~/types";
import { Radio } from "./components";
import { useFormField } from "./hooks";

type Props = {
  name: string;
} & Omit<
  FCProps<typeof Radio>,
  // These props except `name` come from the `useField` hook.
  "name" | "type" | "onBlur"
>;

const RadioField = ({ name, ...rest }: Props) => {
  const [field] = useFormField({ name, type: "radio" });

  return <Radio {...field} {...rest} />;
};

export default RadioField;
