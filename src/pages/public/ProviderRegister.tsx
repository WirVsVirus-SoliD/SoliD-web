import { TextField } from "@material-ui/core";
import classnames from "classnames";
import { Formik, FormikProps } from "formik";
import React from "react";
import { Briefcase, CheckCircle, Info, User } from "react-feather";
import { useHistory } from "react-router-dom";
import { ReactComponent as Asparagus } from "~/assets/icons/cultures/asparagus.svg";
import { ReactComponent as Basket } from "~/assets/icons/cultures/basket.svg";
import { ReactComponent as Cabbage } from "~/assets/icons/cultures/cabbage.svg";
import { ReactComponent as Cucumber } from "~/assets/icons/cultures/cucumber.svg";
import { ReactComponent as Grape } from "~/assets/icons/cultures/grape.svg";
import { ReactComponent as Hop } from "~/assets/icons/cultures/hop.svg";
import { ReactComponent as Lettuce } from "~/assets/icons/cultures/lettuce.svg";
import { ReactComponent as Radish } from "~/assets/icons/cultures/radish.svg";
import { ReactComponent as Strawberry } from "~/assets/icons/cultures/strawberry.svg";
import { ReactComponent as Vegetables } from "~/assets/icons/cultures/vegetables.svg";
import { ReactComponent as EmailSentSvg } from "~/assets/icons/EmailSent.svg";
import { ReactComponent as UploadFarmPhotoSvg } from "~/assets/icons/UploadFarmPhoto.svg";
import { PrimaryButton } from "~/components/Button";
import { FormTitle } from "~/components/Form";
import { Radio } from "~/components/Form/components";
import { CheckIcon } from "~/components/Icon";
import { Step, StepContent, useSteps } from "~/components/Steps";
import { Title } from "~/components/Title";
import { updateArray } from "~/lib/immutable";
import { StepCalculator } from "./components";

type FormProps = FormikProps<typeof initialValues>;
type PassedFormProps = Pick<FormProps, "setFieldValue" | "values">;

const checklistTexts = [
  "Du bist für die Sicherheit der Helfer*innen verantwortlich",
  "Befolge die offiziellen Arbeitsschutzrichtlinien",
  "Stelle sicher, dass alle Helfer*innen versichert sind"
];

const steps: Step[] = [
  {
    title: "Hinweis",
    Icon: Info,
    okText: "Okay, verstanden"
  },
  {
    title: "Deine Daten",
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
    Content: () => (
      <>
        <p className="mb-8">
          Bevor du fortfährst: Verantwortung und Sicherheit stehen an oberster
          Stelle!
        </p>
        <ul className="mb-4">
          {checklistTexts.map((text, i) => (
            <li key={i} className="flex align-top pl-8 mb-2">
              <div className="inline-block -ml-8 mr-2">
                <CheckIcon />
              </div>
              <p className="inline-block font-medium">{text}</p>
            </li>
          ))}
        </ul>
      </>
    )
  },
  [
    {
      stepIndex: 1,
      Content: (props: PassedFormProps) => (
        <>
          <FormTitle as="h2" className="mb-4">
            Ansprechpartner
          </FormTitle>
          {[
            ["account.firstName", "Vorname"],
            ["account.lastName", "Nachname"],
            ["account.phone", "Telefonnummer"],
            ["account.email", "E-Mail"]
          ].map(([key, label]) => (
            <TextField
              key={key}
              label={label}
              className="mb-4 text-brand"
              fullWidth
              onChange={(e) => props.setFieldValue(key, e.currentTarget.value)}
            />
          ))}
        </>
      )
    },
    {
      stepIndex: 1,
      Content: (props: PassedFormProps) => (
        <>
          <FormTitle as="h2" className="mb-4">
            Dein Hof
          </FormTitle>
          {[
            ["farmName", "Hofname"],
            ["address.street", "Straße"],
            ["address.housenr", "Hausnummer"],
            ["address.zip", "PLZ"],
            ["address.city", "Ort"],
            ["url", "Webseite (optional)"]
          ].map(([key, label]) => (
            <TextField
              key={key}
              label={label}
              className="mb-4 text-brand"
              fullWidth
              onChange={(e) => props.setFieldValue(key, e.currentTarget.value)}
            />
          ))}
        </>
      )
    },
    {
      stepIndex: 1,
      Content: () => (
        <>
          <FormTitle as="h2" className="mb-4">
            Foto deines Hofes
          </FormTitle>
          <UploadFarmPhotoSvg className="mx-auto" />
        </>
      )
    }
  ],
  [
    {
      stepIndex: 2,
      Content: ({ setFieldValue, values }: PassedFormProps) => (
        <>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Mindestbeschäftigungsdauer
            </FormTitle>
            <div className="flex">
              {[
                ["1/2 Tag", 0.5],
                ["1 Tag", 1],
                ["1 Woche", 7],
                ["Länger", Infinity]
              ].map(([label, value], i) => {
                const checked = value === values.minWorkPeriod;

                return (
                  <label
                    key={i}
                    onClick={() => setFieldValue("minWorkPeriod", value)}
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
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Stundenlohn
            </FormTitle>

            <StepCalculator
              initialValue={values.hourlyRate}
              steps={0.5}
              min={9.35}
              renderValue={(v) => `${v.toFixed(2)} €`}
              onChange={(v) => setFieldValue("hourlyRate", v)}
            />
          </div>
          <div className="mb-2">
            <FormTitle as="h2" className="mb-2">
              Übernachtungsmöglichkeiten für Helfer*innen
            </FormTitle>
            <div>
              <Radio
                checked={values.overnightPossible === true}
                onClick={() => setFieldValue("overnightPossible", true)}
                block
              >
                Ja
              </Radio>
              <Radio
                checked={values.overnightPossible === false}
                onClick={() => setFieldValue("overnightPossible", false)}
                block
              >
                Nein
              </Radio>
            </div>
          </div>
          {values.overnightPossible && (
            <div>
              <FormTitle as="h2" className="mb-2">
                Übernachtungspreis
              </FormTitle>
              <StepCalculator
                initialValue={values.overnightPrice}
                steps={0.5}
                min={0}
                renderValue={(v) => `${v.toFixed(2)} €`}
                onChange={(v) => setFieldValue("overnightPrice", v)}
              />
            </div>
          )}
        </>
      )
    },
    {
      stepIndex: 2,
      Content: ({ setFieldValue, values }: PassedFormProps) => (
        <>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Anreise der Helfer*innen
            </FormTitle>
            <div>
              <Radio
                checked={!values.pickupPossible}
                onClick={() => setFieldValue("pickupPossible", false)}
                block
              >
                Eigenständig (keine Abholung)
              </Radio>
              <Radio
                checked={values.pickupPossible}
                onClick={() => setFieldValue("pickupPossible", true)}
                block
              >
                Abholung möglich
              </Radio>
            </div>
            {values.pickupPossible && (
              <div>
                <FormTitle as="h2" className="mt-1 mb-2">
                  Abholung im Umkreis von ...
                </FormTitle>
                <StepCalculator
                  initialValue={values.pickupRange}
                  steps={5}
                  min={0}
                  renderValue={(v) => `${v.toFixed(0)} km`}
                  onChange={(v) => setFieldValue("pickupRange", v)}
                />
              </div>
            )}
          </div>
          <div>
            <FormTitle as="h2" className="mb-2">
              Zusätzliche Angaben
            </FormTitle>
            <p className="text-gray-600 text-sm mb-2">
              Arbeitsbeginn, Übernachtungsmöglichkeit, Verpflegung, Sprache,
              etc.
            </p>
            <textarea
              className="border border-black rounded-lg w-full p-2"
              placeholder="Beschreibung eingeben"
              rows={4}
              onChange={(e) =>
                setFieldValue("additionalNotes", e.currentTarget.value)
              }
              value={values.additionalNotes}
            />
          </div>
        </>
      )
    },
    {
      stepIndex: 2,
      Content: ({ setFieldValue, values }: PassedFormProps) => {
        return (
          <>
            <FormTitle as="h2" className="mb-2">
              Kulturen (Allergien der Helfer*innen)/
            </FormTitle>
            <div className="flex flex-wrap -m-1">
              {[
                ["Spargel", Asparagus],
                ["Erdbeeren", Strawberry],
                ["Hopfen", Hop],
                ["Weinbau", Grape],
                ["Obstbau", Basket],
                ["Salate", Lettuce],
                ["Gurken", Cucumber],
                ["Kohl", Cabbage],
                ["Radieschen", Radish],
                ["Sonstige", Vegetables]
              ].map(([type, Icon], i, array) => {
                const isLast = i === array.length - 1;
                const checked = values.crops.includes(type as string);

                return (
                  <div
                    key={type as string}
                    className={classnames("p-1", {
                      "w-1/3": !isLast,
                      "w-full": isLast
                    })}
                  >
                    <label
                      className={classnames(
                        "block w-full border rounded-lg border-brand outline-none p-2 text-center",
                        {
                          "shadow-selection-brand bg-brand-light": checked
                        }
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        setFieldValue(
                          "crops",
                          updateArray(type as string, values.crops.slice(0))
                        );
                      }}
                    >
                      <input
                        type="checkbox"
                        className="input--hidden"
                        checked={checked}
                        readOnly
                      />
                      <Icon
                        className={classnames({
                          "mx-auto": !isLast,
                          "inline-block mr-2": isLast
                        })}
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        );
      }
    }
  ],
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
  account: { firstName: "", lastName: "", phone: "", email: "" },
  address: {
    street: "",
    housenr: "",
    postalCode: "",
    city: "",
    website: ""
  },
  farmName: "",
  minWorkPeriod: null,
  hourlyRate: 9.35,
  overnightPossible: null,
  overnightPrice: 5,
  pickupPossible: null,
  pickupRange: 5,
  additionalNotes: "",
  crops: [] as string[]
};

const ProviderRegister = () => {
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
  // The step before the last one has a dot-notated index of '2.2'.
  // This allows us to identify when to submit our form using the click handler on the 'next' button.
  const shouldSubmitForm = currentDotIndex === "2.2";

  return (
    <div className="flex flex-col h-full px-8 py-4">
      <Formik
        initialValues={initialValues}
        onSubmit={(input) => {
          console.log(input);
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
                      goNext();
                      shouldSubmitForm && handleSubmit();
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

export default ProviderRegister;