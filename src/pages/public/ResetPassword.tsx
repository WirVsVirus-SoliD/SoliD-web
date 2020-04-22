import CircularProgress from "@material-ui/core/CircularProgress";
import { Form, Formik, FormikProps } from "formik";
import * as queryString from "querystring";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { object as yupObject, ref, string as yupString } from "yup";
import { resetPassword } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";

const initialValues = {
  password: "",
  password_confirmation: ""
};

const validationSchema = yupObject().shape({
  password: yupString().required("Pflichtfeld"),
  password_confirmation: yupString()
    .required("Pflichtfeld")
    .oneOf([ref("password"), null], "Passwörter müssen übereinstimmen")
});

const ResetPassword = ({ location }) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    success: false
  });
  const dispatch = useDispatch();
  const urlParams = queryString.parse(location && location.search);
  return (
    <div className="flex flex-col py-4 items-center justify-start px-8 h-full">
      <div className="w-full md:text-center text-xl mb-12">Anmeldung</div>
      <div className="w-full md:text-center text-2xl mb-16">
        Passwort zurücksetzen
      </div>
      <div className="h-full w-full max-w-xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setState({ ...state, loading: true });
            dispatch(resetPassword(values, urlParams["?token"]))
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
                <InputField
                  name="password"
                  label="Passwort"
                  type="password"
                  block
                  className="mb-4"
                />
                <InputField
                  name="password_confirmation"
                  label="Passwort wiederholen"
                  type="password"
                  block
                />
              </div>
              {state.loading && (
                <div className="text-center">
                  <CircularProgress />
                </div>
              )}
              {state.success && (
                <div className="text-green-500">
                  Passwort wurde zurückgesetzt
                </div>
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

export default ResetPassword;
