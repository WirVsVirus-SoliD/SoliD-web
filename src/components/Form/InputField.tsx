import classnames from 'classnames';
import React from 'react';
import {FCProps} from '../../types';
import {FormField, FormLabel, Input} from './components';
import {useFormField} from './hooks';

type Props = {
  label?: string;
  name: string;
  block?: boolean;
} & Omit<FCProps<typeof Input>, 'name'>;

const InputField = ({
  name,
  type = 'text',
  style,
  block = false,
  className,
  label,
  ...rest
}: Props) => {
  const css = classnames({'w-full block': block}, className);
  const [field, {error, hasError}] = useFormField({name, type});
  // Reset bottom margin for error message.
  const styles = hasError ? {...style, marginBottom: 0} : style;
  const input = (
    <Input type={type} {...field} className={css} {...rest} style={styles}/>
  );

  return (
    <FormField hasError={hasError} error={error}>
      {typeof label === 'string' ? (
        <FormLabel title={label} block={block}>
          {input}
        </FormLabel>
      ) : (
        input
      )}
    </FormField>
  );
};

export default InputField;
