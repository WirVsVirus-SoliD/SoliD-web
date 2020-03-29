import classnames from 'classnames';
import React from 'react';

type Props = {
  borderless?: boolean;
  block?: boolean;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>;
const Input = ({
  className,
  type = 'text',
  block = false,
  borderless = false,
  ...rest
}: Props) => {
  const css = classnames(
    'px-2 py-2 border-gray-400 rounded focus:border-secondary-dark',
    {'w-full block': block},
    {'border-2': !borderless},
    className
  );

  return <input type={type} className={css} {...rest} />;
};

export default Input;
