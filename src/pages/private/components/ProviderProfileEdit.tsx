import classnames from "classnames";
import { Formik } from "formik";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch } from "react-redux";
import {
  array as yupArray,
  boolean as yupBoolean,
  number as yupNumber,
  object as yupObject,
  string as yupString
} from "yup";
import { updateProvider } from "~/actions/user";
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
import { PrimaryButton } from "~/components/Button";
import { FormTitle, InputField } from "~/components/Form";
import { Radio } from "~/components/Form/components";
import { Title } from "~/components/Title";
import { updateArray } from "~/lib/immutable";
import { MinWorkPeriod, StepCalculator } from "~/pages/public/components";

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
            className="mb-4"
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
            className="mb-4"
            onChange={(e) => setFieldValue(key, e.currentTarget.value)}
            onBlur={() => validateField(key)}
          />
        ))}
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
    title: "Betrieb",
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
  },
  2: {
    Content: ({ setFieldValue, values }: any) => (
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
    ),
    title: "Kulturen",
    validationSchema: yupObject().shape({
      crops: yupArray() // TODO mindestens eine Kultur?
    })
  },
  3: {
    Content: ({
      setFieldValue,
      values,
      hiddenFields,
      setHiddenFields,
      errors
    }: any) => (
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
      </>
    ),
    title: "Konditionen",
    validationSchema: yupObject().shape({
      hourlyRate: yupNumber().min(9.35).positive()
    })
  }
};

const ProviderProfileEdit = ({ data, editSection, setEditSection }) => {
  const dispatch = useDispatch();
  const section = sections[editSection];
  const [hiddenFields, setHiddenFields] = useState({
    overnightPossible: !!data.overnightPrice,
    pickupPossible: !!data.pickupRange
  });
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
                hiddenFields={hiddenFields}
                setHiddenFields={setHiddenFields}
                values={values}
                errors={errors}
              />
              <PrimaryButton
                className="w-full mt-10 mb-20"
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
