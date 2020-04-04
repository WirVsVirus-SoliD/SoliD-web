import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as yup from "yup";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";

const initialValues = {
  email: ""
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Ungültige E-Mail-Addresse").required("Pflichtfeld")
});

const ForgotPassword = () => {
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
                <div className="mt-auto sm:mt-0 items-center">
                  <PrimaryButton type="submit" block>
                    Senden
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

export default ForgotPassword;
