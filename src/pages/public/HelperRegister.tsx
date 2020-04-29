import { TextField } from "@material-ui/core";
import classnames from "classnames";
import { Formik, FormikProps } from "formik";
import React from "react";
import { Briefcase, CheckCircle, Info, User } from "react-feather";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerHelper } from "~/actions/user";
import { ReactComponent as EmailSentSvg } from "~/assets/icons/EmailSent.svg";
import { PrimaryButton } from "~/components/Button";
import { FormTitle } from "~/components/Form";
import { Checkbox, Radio } from "~/components/Form/components";
import { Requirements } from "~/components/Requirements";
import { Step, StepContent, useSteps } from "~/components/Steps";
import { Title } from "~/components/Title";

type FormProps = FormikProps<typeof initialValues>;
type PassedFormProps = Pick<FormProps, "setFieldValue" | "values">;

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
    okText: "Weiter"
  },
  {
    title: "Fertig!",
    Icon: CheckCircle,
    okText: "Weiter"
  }
];

const contents: (StepContent | StepContent[])[] = [
  {
    stepIndex: 0,
    Content: () => <Requirements />
  },

  {
    stepIndex: 1,
    Content: ({ setFieldValue, values }: PassedFormProps) => (
      <>
        {[
          ["account.firstName", "Vorname"],
          ["account.lastName", "Nachname"],
          ["account.phone", "Telefonnummer"],
          ["account.email", "E-Mail", "email"],
          ["account.password", "Passwort", "password"],
          ["account.password_confirmation", "Passwort wiederholen", "password"]
        ].map(([key, label, type = "text"]) => (
          <TextField
            key={key}
            type={type}
            label={label}
            className="mb-4 text-brand"
            fullWidth
            onChange={(e) => setFieldValue(key, e.currentTarget.value)}
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
          </div>
        </div>
      </>
    )
  },
  {
    stepIndex: 2,
    Content: ({ setFieldValue, values }: PassedFormProps) => (
      <>
        <div className="mb-2">
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
        <div className="mb-2">
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
                // FIXME Richtiger Attributname hinterlegen
                const checked = value === values.driverJobs;

                return (
                  <label
                    key={i}
                    onClick={() => setFieldValue("driverJobs", value)}
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
      </>
    )
  },
  {
    stepIndex: 3,
    Content: ({ values }: PassedFormProps) => {
      return (
        <div className="flex flex-col items-center">
          <div className="mb-8">
            {/* TODO: request svg from design team (group icon in Figma to allow svg export) */}
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
              Wir haben dir einen Bestätigungslink per E-Mail an{" "}
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
  employmentStatus: null,
  pickupRequired: null,
  driverLicense: null,
  driverJobs: false,
  fullTime: null,
  partTime: null
};

// TODO handle redirect to provider confirmHelp
const HelperRegister = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
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
        onSubmit={(input) => {
          console.log(input);
          // @ts-ignore
          dispatch(registerHelper(input)).then((response) => {
            goNext();
          });
        }}
      >
        {({ setFieldValue, values, handleSubmit }: FormProps) => (
          <>
            <div className="flex-grow">
              <Title as="h1" className="text-2xl mb-8" bold>
                Registrierung
              </Title>
              <StepsBar className="mb-8 text-sm" />
              <ActiveStepContent
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
            <div className="flex">
              {activeStepIndex < steps.length - 1 ? (
                <>
                  <button
                    onClick={
                      activeStepIndex < 1 ? () => push("/signin") : goPrevious
                    }
                    className="flex-grow mr-4 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-full px-4 py-1 cursor-pointer"
                  >
                    Zurück
                  </button>
                  <PrimaryButton
                    className="flex-grow"
                    onClick={() => {
                      shouldSubmitForm ? handleSubmit() : goNext();
                    }}
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
