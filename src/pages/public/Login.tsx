import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { object as yupObject, string as yupString } from "yup";
import { login } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";

const initialValues = {
  email: "",
  password: ""
};

const validationSchema = yupObject().shape({
  email: yupString().email("Ungültige E-Mail-Addresse").required("Pflichtfeld"),
  password: yupString().required("Pflichtfeld")
});

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col py-4 items-center justify-start px-8 h-full">
      <div className="w-full md:text-center text-xl mb-12">Anmeldung</div>
      <div className="w-full md:text-center text-2xl mb-16">
        Willkommen zurück!
      </div>
      <div className="h-full w-full max-w-xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(login(values.email, values.password));
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
