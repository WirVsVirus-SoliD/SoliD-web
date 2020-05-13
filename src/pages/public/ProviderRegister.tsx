import classnames from "classnames";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { Briefcase, CheckCircle, Info, User } from "react-feather";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  array as yupArray,
  boolean as yupBoolean,
  number as yupNumber,
  object as yupObject,
  ref as yupRef,
  string as yupString
} from "yup";
import { registerProvider } from "~/actions/user";
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
import { PrimaryButton } from "~/components/Button";
import { FormTitle, InputField } from "~/components/Form";
import { Radio } from "~/components/Form/components";
import { CheckIcon } from "~/components/Icon";
import SunIcon from "~/components/Icon/SunIcon";
import { Step, StepContent, useSteps } from "~/components/Steps";
import { Title } from "~/components/Title";
import { updateArray } from "~/lib/immutable";
import { MinWorkPeriod, StepCalculator } from "./components";

type FormProps = FormikProps<typeof initialValues>;
type PassedFormProps = Pick<
  FormProps,
  "setFieldValue" | "validateField" | "values" | "errors"
> & { hiddenFields: State; setHiddenFields: any };

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
    title: "Kulturen",
    Icon: SunIcon,
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
  {
    stepIndex: 1,
    Content: ({
      validateField,
      setFieldValue,
      values,
      errors
    }: PassedFormProps) => (
      <>
        {console.log(values, errors)}
        <FormTitle as="h2" className="mb-4">
          Ansprechpartner
        </FormTitle>
        {[
          ["account.firstName", "Vorname"],
          ["account.lastName", "Nachname"],
          ["account.phone", "Telefonnummer (optional)"],
          ["account.email", "E-Mail", "email"],
          ["account.password", "Passwort", "password"],
          ["account.password_confirmation", "Passwort wiederholen", "password"]
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
        <FormTitle as="h2" className="mt-10 mb-4">
          Dein Betrieb
        </FormTitle>
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
        <FormTitle as="h2" className="font-bold mt-10 mb-4">
          Betreibst du biologische oder konventionelle Landwirtschaft?
        </FormTitle>

        <div className="flex">
          {[
            ["Bio", true],
            ["Konventionell", false]
          ].map(([label, value], i) => {
            const checked = value === values.bio;

            return (
              <label
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("bio", value);
                }}
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
        {errors.bio && (
          <div className="mt-1 pl-1 text-red-600">{errors.bio}</div>
        )}
      </>
    ),
    validationSchema: yupObject().shape({
      account: yupObject().shape({
        firstName: yupString().required("Pflichtfeld"),
        lastName: yupString().required("Pflichtfeld"),
        phone: yupString(),
        email: yupString()
          .email("Ungültige E-Mail-Addresse")
          .required("Pflichtfeld"),
        password: yupString().required("Pflichtfeld"),
        password_confirmation: yupString()
          .required("Pflichtfeld")
          .oneOf([yupRef("password"), null], "Passwörter müssen übereinstimmen")
      }),
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
  },
  {
    stepIndex: 2,
    Content: ({ setFieldValue, values }: PassedFormProps) => (
      <>
        <FormTitle as="h2" className="mb-2">
          Kulturen auf deinem Betrieb
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
                    { "shadow-selection-brand bg-brand-light": checked }
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
    ),
    validationSchema: yupObject().shape({
      crops: yupArray() // TODO mindestens eine Kultur?
    })
  },
  {
    stepIndex: 3,
    Content: ({
      setFieldValue,
      values,
      hiddenFields,
      setHiddenFields,
      errors
    }: PassedFormProps) => (
      <>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Mindestbeschäftigungsdauer
          </FormTitle>
          <MinWorkPeriod onChange={(v) => setFieldValue("minWorkPeriod", v)} />
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
            /* FIXME onBlur={() => {
             console.log("ON BLUR", validateField("hourlyRate"));
             validateField("hourlyRate");
             }}*/
          />
        </div>

        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Tätigkeiten
          </FormTitle>
          <div className="flex flex-row justify-between ">
            {["Ernten", "Jäten", "Fahren"].map((value, i, array) => {
              const checked = values.workActivities.includes(value as string);
              return (
                <div className="flex-1 px-1" key={value as string}>
                  <label
                    className={classnames(
                      "block w-full border rounded-lg border-brand outline-none p-2 text-center",
                      { "bg-brand-light": checked }
                    )}
                    onClick={(event) => {
                      event.preventDefault();
                      setFieldValue(
                        "workActivities",
                        updateArray(
                          value as string,
                          values.workActivities.slice(0)
                        )
                      );
                    }}
                  >
                    <input
                      type="checkbox"
                      className="input--hidden"
                      checked={checked}
                      readOnly
                    />
                    <span className="text-brand pr-1">
                      {checked ? "✓" : "+"}
                    </span>
                    <span className="text-brand">{value}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <FormTitle as="h2" className="mb-2">
            Arbeitsbeginn
          </FormTitle>
          <textarea
            className="border border-black rounded-lg w-full p-2 mb-8"
            placeholder="Beschreibung eingeben"
            rows={4}
            onChange={(e) =>
              setFieldValue("workingConditions", e.currentTarget.value)
            }
            value={values.workingConditions}
          />
        </div>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Übernachtungsmöglichkeiten für Helfer*innen
          </FormTitle>
          <div>
            <Radio
              checked={hiddenFields.overnightPossible === true}
              onChange={() => {
                setHiddenFields((s) => ({ ...s, overnightPossible: true }));
                setFieldValue("overnightPrice", 0);
              }}
              block
            >
              Ja
            </Radio>
            <Radio
              checked={hiddenFields.overnightPossible === false}
              onChange={() => {
                setHiddenFields((s) => ({ ...s, overnightPossible: false }));
                setFieldValue("overnightPrice", undefined);
                setFieldValue("overnightInformation", "");
              }}
              block
            >
              Nein
            </Radio>
          </div>
          {hiddenFields.overnightPossible && (
            <div className="mt-2 mb-8">
              <FormTitle as="h2" className="mb-2">
                Übernachtungspreis (pro Nacht)
              </FormTitle>
              <StepCalculator
                initialValue={values.overnightPrice}
                steps={0.5}
                min={0}
                onChange={(v) => setFieldValue("overnightPrice", v)}
                // onBlur={() => validateField("overnightPrice")}
                // FIXME validation doesnt work
              />
              <FormTitle as="h2" className="mt-2 mb-2">
                Weitere Infos zur Übernachtung
              </FormTitle>
              <textarea
                className="border border-black rounded-lg w-full p-2"
                placeholder="Beschreibung eingeben"
                rows={4}
                onChange={(e) =>
                  setFieldValue("overnightInformation", e.currentTarget.value)
                }
                value={values.overnightInformation}
              />
            </div>
          )}
        </div>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Angaben zur Versorgung
          </FormTitle>
          <textarea
            className="border border-black rounded-lg w-full p-2"
            placeholder="Beschreibung eingeben"
            rows={4}
            onChange={(e) =>
              setFieldValue("providingInformation", e.currentTarget.value)
            }
            value={values.providingInformation}
          />
        </div>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Anreise der Helfer*innen
          </FormTitle>
          <div>
            <Radio
              checked={hiddenFields.pickupPossible === false}
              onChange={() => {
                setHiddenFields((s) => ({ ...s, pickupPossible: false }));
                setFieldValue("pickupRange", undefined);
              }}
              block
            >
              Eigenständig (keine Abholung)
            </Radio>
            <Radio
              checked={hiddenFields.pickupPossible === true}
              onChange={() => {
                setHiddenFields((s) => ({ ...s, pickupPossible: true }));
                setFieldValue("pickupRange", 0);
              }}
              block
            >
              Abholung möglich
            </Radio>
            {hiddenFields.pickupPossible && (
              <div className="mt-2 mb-8">
                <FormTitle as="h2" className="mt-1 mb-2">
                  Abholung im Umkreis von ... km
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
        </div>
        <div className="mb-8">
          <FormTitle as="h2" className="mb-2">
            Sprachen
          </FormTitle>
          <textarea
            className="border border-black rounded-lg w-full p-2"
            placeholder="Beschreibung eingeben"
            rows={4}
            onChange={(e) => setFieldValue("languages", e.currentTarget.value)}
            value={values.languages}
          />
        </div>
        <div className="mb-6">
          <FormTitle as="h2" className="mb-2">
            Sonstige Angaben
          </FormTitle>
          <textarea
            className="border border-black rounded-lg w-full p-2"
            placeholder="Beschreibung eingeben"
            rows={4}
            onChange={(e) =>
              setFieldValue("otherInformation", e.currentTarget.value)
            }
            value={values.otherInformation}
          />
        </div>
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
      hourlyRate: yupNumber().min(9.35).positive(),
      agbAccepted: yupBoolean().oneOf(
        [true],
        "Die AGB und Datenschutzbestimmungen müssen akzeptiert werden"
      )
    })
  },
  {
    stepIndex: 4,
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
    password_confirmation: ""
  },
  address: {
    street: "",
    housenr: "",
    zip: "",
    city: ""
  },
  agbAccepted: false,
  bio: undefined,
  url: "",
  farmName: "",
  minWorkPeriod: undefined,
  hourlyRate: 9.35,
  languages: "",
  otherInformation: "",
  overnightPrice: undefined,
  overnightInformation: "",
  pickupRange: undefined,
  providingInformation: "",
  crops: [] as string[],
  workActivities: [] as string[],
  workingConditions: ""
};

type State = {
  overnightPossible: boolean | undefined;
  pickupPossible: boolean | undefined;
};

const ProviderRegister = () => {
  const dispatch = useDispatch();
  const [hiddenFields, setHiddenFields] = useState<State>({
    overnightPossible: undefined,
    pickupPossible: undefined
  });
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
  // The step before the last one has a dot-notated index of '2.2'.
  // This allows us to identify when to submit our form using the click handler on the 'next' button.
  const shouldSubmitForm = currentDotIndex === "4";
  console.log(goNext);
  return (
    <div className="flex flex-col h-full px-8 py-4">
      <Formik
        initialValues={initialValues}
        validationSchema={contents[activeStepIndex].validationSchema}
        validateOnChange={false}
        onSubmit={(input) => {
          console.log(input);
          if (shouldSubmitForm) {
            // @ts-ignore
            dispatch(registerProvider(input)).then((response) => {
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
              {activeStepIndex !== 0 && <StepsBar className="mb-8 text-sm" />}
              <ActiveStepContent
                setFieldValue={setFieldValue}
                validateField={validateField}
                hiddenFields={hiddenFields}
                setHiddenFields={setHiddenFields}
                values={values}
                errors={errors}
              />
            </div>
            <div className="flex mt-8 mb-8">
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
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {shouldSubmitForm ? "Account erstellen" : activeStep.okText}
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
