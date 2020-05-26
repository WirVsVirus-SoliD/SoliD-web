import { Formik } from "formik";
import React from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch } from "react-redux";
import {
  boolean as yupBoolean,
  object as yupObject,
  string as yupString
} from "yup";
import { updateProvider } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";
import { Title } from "~/components/Title";

const sections = {
  0: {
    Content: ({ validateField, setFieldValue, values, errors }: any) => (
      <>
        {[
          ["account.firstName", "Vorname"],
          ["account.lastName", "Nachname"],
          ["account.phone", "Telefonnummer (optional)"]
        ].map(([key, label, type = "text"]) => (
          <InputField
            key={key}
            name={key}
            type={type}
            label={label}
            className="mb-4 text-brand"
            block
            onChange={(e) => setFieldValue(key, e.currentTarget.value)}
            onBlur={() => {
              validateField(key);
            }}
          />
        ))}
      </>
    ),
    title: "Ansprechpartner",
    validationSchema: yupObject().shape({
      account: yupObject().shape({
        firstName: yupString().required("Pflichtfeld"),
        lastName: yupString().required("Pflichtfeld"),
        phone: yupString()
      })
    })
  },
  1: {
    Content: ({ validateField, setFieldValue, values, errors }: any) => (
      <>
        {[
          ["farmName", "Betriebsname"],
          ["address.street", "Straße"],
          ["address.housenr", "Hausnummer"],
          ["address.zip", "PLZ"],
          ["address.city", "Ort"],
          ["url", "Webseite (optional)"]
        ].map(([key, label]) => (
          <InputField
            key={key}
            name={key}
            label={label}
            block
            className="mb-4 text-brand"
            onChange={(e) => setFieldValue(key, e.currentTarget.value)}
            onBlur={() => validateField(key)}
          />
        ))}
      </>
    ),
    title: "Dein Betrieb",
    validationSchema: yupObject().shape({
      bio: yupBoolean().required("Pflichtfeld"),
      farmName: yupString().required("Pflichtfeld"),
      address: yupObject().shape({
        street: yupString().required("Pflichtfeld"),
        housenr: yupString().required("Pflichtfeld"),
        zip: yupString().required("Pflichtfeld"),
        city: yupString().required("Pflichtfeld")
      }),
      url: yupString()
    })
  }
};

const ProviderProfileEdit = ({ data, editSection, setEditSection }) => {
  const dispatch = useDispatch();
  const section = sections[editSection];
  return (
    <div className="flex flex-col h-full px-8 py-4">
      <Formik
        initialValues={data}
        validationSchema={section.validationSchema}
        validateOnChange={false}
        onSubmit={(input) => {
          // @ts-ignore
          dispatch(updateProvider(input)).then((response) => {
            setEditSection(null);
          });
        }}
      >
        {({
          setFieldValue,
          values,
          handleSubmit,
          validateField,
          errors
        }: any) => (
          <>
            <div className="flex flex-row items-center mb-6">
              <button
                className="rounded-full bg-white-primary p-2"
                onClick={() => setEditSection(null)}
              >
                <ArrowLeft size={20} />
              </button>
              <Title as="h2" className="text-xl">
                {section.title}
              </Title>
            </div>
            <div className="flex-grow">
              <section.Content
                setFieldValue={setFieldValue}
                validateField={validateField}
                /*hiddenFields={hiddenFields}
                 setHiddenFields={setHiddenFields}*/
                values={values}
                errors={errors}
              />
              <PrimaryButton
                className="w-full mt-10"
                onClick={() => handleSubmit()}
              >
                <Title as="h6">Übernehmen</Title>
              </PrimaryButton>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ProviderProfileEdit;
