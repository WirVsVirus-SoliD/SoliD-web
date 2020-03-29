import classnames from 'classnames';
import React from 'react';
import Title, {Props as TitleProps} from './Title';

type Props = {
  as?: TitleProps['as'];
} & Omit<TitleProps, 'as'>;

const SectionTitle = ({className, as = 'h2', ...rest}: Props) => {
  const css = classnames('text-4xl', className);

  return <Title as={as} className={css} {...rest} />;
};

export default SectionTitle;
