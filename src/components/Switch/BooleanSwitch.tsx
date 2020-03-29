import React from 'react';

type Props = {
  value: boolean;
  trueRender: JSX.Element;
  falseRender: JSX.Element;
};

/**
 * Renders one of two components based on the state of `props.value`.
 */
const BooleanSwitch = ({value, trueRender, falseRender}: Props) => {
  if (value) {
    return trueRender;
  } else {
    return falseRender;
  }
};

export default BooleanSwitch;
