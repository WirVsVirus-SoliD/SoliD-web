import CircularProgress from "@material-ui/core/CircularProgress";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { object as yupObject, string as yupString } from "yup";
import { forgotPassword } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";

const initialValues = {
  email: ""
};

const validationSchema = yupObject().shape({
  email: yupString().email("Ungültige E-Mail-Addresse").required("Pflichtfeld")
});

const ForgotPassword = () => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    success: false
  });
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col py-4 items-center justify-start px-8 h-full">
      <div className="w-full md:text-center text-xl mb-12">Anmeldung</div>
      <div className="w-full md:text-center text-2xl mb-16">
        Passwort vergessen
      </div>
      <div className="h-full w-full max-w-xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setState({ ...state, loading: true });
            dispatch(forgotPassword(values.email))
              // @ts-ignore
              .then((response) => {
                setState({ ...state, loading: false, success: true });
              })
              .catch((error) => {
                setState({ ...state, loading: false, error: true });
              });
          }}
        >
          {({ values }: FormikProps<typeof initialValues>) => (
            <Form className="flex flex-col h-full">
              <div className="mb-6">
                <InputField name="email" label="E-Mail" block />
              </div>
              {state.loading && (
                <div className="text-center">
                  <CircularProgress />
                </div>
              )}
              {state.success && (
                <div className="text-green-500">E-Mail wurde gesendet</div>
              )}
              {state.error && (
                <div className="text-red-500">Ein Fehler ist aufgetreten</div>
              )}
              <div className="mt-auto sm:mt-0 items-center">
                <PrimaryButton type="submit" block disabled={state.loading}>
                  Senden
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
