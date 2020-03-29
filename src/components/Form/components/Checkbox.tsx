import classNames from 'classnames';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  kind?: 'default' | 'borderless';
  block?: boolean;
} & Omit<React.HTMLProps<HTMLInputElement>, 'label'>;

const BorderlessStyle = {borderColor: 'transparent'};

const Checkbox = ({
  children,
  className,
  value,
  onChange,
  kind = 'default',
  block = false,
  ...rest
}: Props) => {
  return (
    <label
      className={classNames(
        'checkbox select-none',
        block ? 'block' : 'inline-block',
        className
      )}
      onKeyUp={onChange as any}
    >
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        {...rest}
        className="h-0 w-0"
      />
      <span
        className="pr-2"
        style={kind === 'borderless' ? BorderlessStyle : undefined}
      >
        {children}
      </span>
    </label>
  );
};

export default Checkbox;
