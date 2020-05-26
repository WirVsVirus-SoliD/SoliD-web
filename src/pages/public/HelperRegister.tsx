import classnames from "classnames";
import { Formik, FormikProps } from "formik";
import React from "react";
import { Briefcase, CheckCircle, Info, User } from "react-feather";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString
} from "yup";
import { registerHelper } from "~/actions/user";
import { ReactComponent as EmailSentSvg } from "~/assets/icons/EmailSent.svg";
import { PrimaryButton } from "~/components/Button";
import { FormTitle, InputField } from "~/components/Form";
import { Checkbox, Radio } from "~/components/Form/components";
import { Requirements } from "~/components/Requirements";
import { Step, StepContent, useSteps } from "~/components/Steps";
import { Title } from "~/components/Title";

type FormProps = FormikProps<typeof initialValues>;
type PassedFormProps = Pick<
  FormProps,
  "setFieldValue" | "validateField" | "values" | "errors"
>;

export const steps: Step[] = [
  {
    title: "Hinweis",
    Icon: Info,
    okText: "Okay, verstanden"
  },
  {
    title: "Über dich",
    Icon: User,
    okText: "Weiter"
  },
  {
    title: "Konditionen",
    Icon: Briefcase,
    okText: "Registrieren"
  },
  {
    title: "Fertig!",
    Icon: CheckCircle,
    okText: "Weiter"
  }
];

const contents: StepContent[] = [
  {
    stepIndex: 0,
    Content: () => <Requirements />
  },
  {
    stepIndex: 1,
    Content: ({
      setFieldValue,
      values,
      validateField,
      errors
    }: PassedFormProps) => (
      <>
        {[
          ["account.firstName", "Vorname"],
          ["account.lastName", "Nachname"],
          ["account.phone", "Telefonnummer"],
          ["account.email", "E-Mail", "email"],
          ["account.password", "Passwort", "password"],
          ["account.password_confirmation", "Passwort wiederholen", "password"]
        ].map(([key, label, type = "text"]) => (
          <InputField
            key={key}
            name={key}
            type={type}
            label={label}
            className="mb-4"
            block
            onChange={(e) => setFieldValue(key, e.currentTarget.value)}
            onBlur={() => validateField(key)}
          />
        ))}
        <div className="mb-2">
          <FormTitle as="h2" className="mb-2">
            Du bist
          </FormTitle>
          <div>
            {[
              ["Schüler*in", "Schüler*in"],
              ["Student*in", "Student*in"],
              ["Arbeitslos", "Arbeitslos"],
              ["Beschäftigt", "Beschäftigt"]
            ].map(([label, value], i) => {
              const checked = value === values.employmentStatus;

              return (
                <Radio
                  key={i}
                  checked={checked}
                  onChange={() => setFieldValue("employmentStatus", value)}
                  block
                >
                  {label}
                </Radio>
              );
            })}
            {errors.employmentStatus && (
              <div className="text-red-500">{errors.employmentStatus}</div>
            )}
          </div>
        </div>
      </>
    ),
    validationSchema: yupObject().shape({
      account: yupObject().shape({
        firstName: yupString().required("Pflichtfeld"),
        lastName: yupString().required("Pflichtfeld"),
        phone: yupString().required("Pflichtfeld"),
        email: yupString()
          .email("Ungültige E-Mail-Addresse")
          .required("Pflichtfeld"),
        password: yupString().required("Pflichtfeld"),
        password_confirmation: yupString()
          .required("Pflichtfeld")
          .oneOf([yupRef("password"), null], "Passwörter müssen übereinstimmen")
      }),
      employmentStatus: yupString().required("Pflichtfeld")
    })
  },
  {
    stepIndex: 2,
    Content: ({ setFieldValue, values, errors }: PassedFormProps) => (
      <>
        <div className="mb-6">
          <FormTitle as="h2" className="mb-2">
            Du suchst etwas für
          </FormTitle>
          <div>
            <Checkbox
              className="mb-2"
              checked={values.fullTime === true}
              onChange={() => setFieldValue("fullTime", !values.fullTime)}
              block
            >
              Vollzeit
            </Checkbox>
            <Checkbox
              checked={values.partTime === true}
              onChange={() => setFieldValue("partTime", !values.partTime)}
              block
            >
              Teilzeit
            </Checkbox>
          </div>
        </div>
        <div className="mb-6">
          <FormTitle as="h2" className="mb-2">
            Für die Anreise bist du
          </FormTitle>
          <div>
            <Radio
              className="mb-2"
              checked={values.pickupRequired === false}
              onChange={() => setFieldValue("pickupRequired", false)}
              block
            >
              Eigenständig
            </Radio>
            <Radio
              checked={values.pickupRequired === true}
              onChange={() => setFieldValue("pickupRequired", true)}
              block
            >
              Auf Abholung angewiesen
            </Radio>
          </div>
        </div>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Hast du einen Führerschein?
          </FormTitle>
          <div className="flex">
            {[
              ["Ja", true],
              ["Nein", false]
            ].map(([label, value], i) => {
              const checked = value === values.driverLicense;

              return (
                <label
                  key={i}
                  onClick={() => setFieldValue("driverLicense", value)}
                  className={classnames(
                    "relative flex-grow border-2 border-r-0 last:border-r-2 first:rounded-l-full last:rounded-r-full border-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium",
                    {
                      "bg-brand text-white": checked,
                      "text-brand": !checked
                    }
                  )}
                >
                  <input
                    type="radio"
                    className="input--hidden"
                    checked={checked}
                    readOnly
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </div>
        {values.driverLicense && (
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Wärst du bereit, ggf. Fahrertätigkeiten durchzuführen?
            </FormTitle>
            <div className="flex">
              {[
                ["Ja", true],
                ["Nein", false]
              ].map(([label, value], i) => {
                const checked = value === values.driverActivity;

                return (
                  <label
                    key={i}
                    onClick={() => setFieldValue("driverActivity", value)}
                    className={classnames(
                      "relative flex-grow border-2 border-r-0 last:border-r-2 first:rounded-l-full last:rounded-r-full border-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium",
                      {
                        "bg-brand text-white": checked,
                        "text-brand": !checked
                      }
                    )}
                  >
                    <input
                      type="radio"
                      className="input--hidden"
                      checked={checked}
                      readOnly
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <div className="flex flex-row mb-1 w-full">
            <div className="pr-3">
              <label
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("agbAccepted", !values.agbAccepted);
                }}
                className={classnames(
                  "rounded border-2 border-brand block w-6 h-6 text-center text-sm",
                  {
                    "bg-brand text-white": values.agbAccepted
                  }
                )}
              >
                <span>{values.agbAccepted ? "✓" : " "}</span>
                <input
                  type="checkbox"
                  className="input--hidden"
                  readOnly
                  checked={values.agbAccepted}
                />
              </label>
            </div>
            {/* FIXME AGB und Datenschutz */}
            <div>
              Ich akzeptiere die{" "}
              <a className="text-brand" href="" target="_blank">
                AGB
              </a>{" "}
              und{" "}
              <a className="text-brand" href="" target="_blank">
                Datenschutzbestimmungen
              </a>
            </div>
          </div>
          {errors.agbAccepted && (
            <div className="text-red-500">{errors.agbAccepted}</div>
          )}
        </div>
      </>
    ),
    validationSchema: yupObject().shape({
      agbAccepted: yupBoolean().oneOf(
        [true],
        "Die AGB und Datenschutzbestimmungen müssen akzeptiert werden"
      )
    })
  },
  {
    stepIndex: 3,
    Content: ({ values }: PassedFormProps) => {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <EmailSentSvg />
          </div>
          <div className="flex-grow">
            <Title
              as="h2"
              className="text-xl font-medium text-center mb-4"
              block
            >
              E-Mail-Verifizierung
            </Title>
            <p>
              Wir haben dir einen Bestätigungslink per E-Mail an
              <strong>{values.account.email}</strong> geschickt. Bitte öffne
              diese.
            </p>
          </div>
        </div>
      );
    }
  }
];

const initialValues = {
  account: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  },
  agbAccepted: false,
  employmentStatus: undefined,
  pickupRequired: undefined,
  driverLicense: undefined,
  driverActivity: undefined,
  fullTime: undefined,
  partTime: undefined
};

// TODO handle redirect to provider confirmHelp
const HelperRegister = () => {
  const dispatch = useDispatch();
  const { goBack } = useHistory();
  const {
    activeStep,
    ActiveStepContent,
    activeStepIndex,
    currentDotIndex,
    goNext,
    goPrevious,
    StepsBar
  } = useSteps(steps, contents);
  // The step before the last one has a dot-notated index of '2'.
  // This allows us to identify when to submit our form using the click handler on the 'next' button.
  const shouldSubmitForm = currentDotIndex === "2";

  return (
    <div className="flex flex-col h-full px-8 py-4">
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={contents[activeStepIndex].validationSchema}
        onSubmit={(input) => {
          console.log(input);
          if (shouldSubmitForm) {
            // @ts-ignore
            dispatch(registerHelper(input)).then((response) => {
              goNext();
            });
          } else goNext();
        }}
      >
        {({
          setFieldValue,
          values,
          handleSubmit,
          validateField,
          errors
        }: FormProps) => (
          <>
            <div className="flex-grow">
              <Title as="h1" className="text-2xl mb-8" bold>
                Registrierung
              </Title>
              <StepsBar className="mb-8 text-sm" />
              <ActiveStepContent
                setFieldValue={setFieldValue}
                validateField={validateField}
                values={values}
                errors={errors}
              />
            </div>
            <div className="flex">
              {activeStepIndex < steps.length - 1 ? (
                <>
                  <button
                    onClick={activeStepIndex < 1 ? () => goBack : goPrevious}
                    className="flex-grow mr-4 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-full px-4 py-1 cursor-pointer"
                  >
                    Zurück
                  </button>
                  <PrimaryButton
                    className="flex-grow"
                    onClick={() => handleSubmit()}
                  >
                    {activeStep.okText}
                  </PrimaryButton>
                </>
              ) : (
                <button className="text-brand underline block p-1 text-center mx-auto">
                  Ich habe keine E-Mail erhalten
                </button>
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default HelperRegister;
