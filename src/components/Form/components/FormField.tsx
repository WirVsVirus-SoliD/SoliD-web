import React, {Fragment} from 'react';

type Props = {
  hasError: boolean;
  error?: string;
  children: React.ReactNode;
};

/**
 * A simple wrapper for a field in a form, which shows an error
 * if `hasError` is true.
 */
const FormField = ({hasError, error, children}: Props) => {
  return (
    <Fragment>
      {children}
      {hasError && <div className="mt-1 pl-1 text-red-600">{error}</div>}
    </Fragment>
  );
};

export default FormField;
