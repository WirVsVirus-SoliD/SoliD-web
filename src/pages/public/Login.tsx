import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";

const initialValues = {
  email: "",
  password: ""
};

const validate = (values) => {
  const errors: { email?: string; password?: string } = {};

  if (!values.email) {
    errors.email = "Pflichtfeld";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Ungültige E-Mail-Addresse";
  }

  return errors;
};

const Login = () => {
  return (
    <div className="flex flex-col py-4 items-center justify-start px-8 h-full">
      <div className="w-full md:text-center text-xl mb-12">Anmeldung</div>
      <div className="w-full md:text-center text-2xl mb-16">
        Willkommen zurück!
      </div>
      <div className="h-full w-full max-w-xs">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => {
            console.log(values);
            window.alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }: FormikProps<typeof initialValues>) => {
            return (
              <Form className="flex flex-col h-full">
                <div className="mb-6">
                  <InputField name="email" label="E-Mail" block />
                </div>
                <div className="mb-8">
                  <InputField
                    className="mb-2"
                    name="password"
                    label="Passwort"
                    type="password"
                    block
                  />
                  <Link to="/forgot-password">
                    <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                      Passwort zurücksetzen
                    </div>
                  </Link>
                </div>
                <div className="mt-auto sm:mt-0 items-center">
                  <PrimaryButton type="submit" block>
                    Anmelden
                  </PrimaryButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
