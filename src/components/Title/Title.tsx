import classnames from 'classnames';
import React from 'react';

export type Props = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  block?: boolean;
  bold?: boolean;
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement>;

const Title = ({
  as: Component = 'h6',
  block,
  bold,
  className,
  children,
  ...rest
}: Props) => {
  const css = classnames(
    'font-title',
    {block, 'font-medium': bold},
    className
  );

  return (
    <Component className={css} {...rest}>
      {children}
    </Component>
  );
};

export default Title;
