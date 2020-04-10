import React from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames";
import { Formik, FormikProps } from "formik";
import { Info, User, Briefcase, CheckCircle } from "react-feather";
import { TextField } from "@material-ui/core";

import { Title } from "~/components/Title";
import { Step, useSteps, StepContent } from "~/components/Steps";
import { PrimaryButton } from "~/components/Button";
import { CheckIcon } from "~/components/Icon";
import { FormTitle } from "~/components/Form";
import { Radio } from "~/components/Form/components";
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
        <a href="#more-details" className="underline text-brand">
          Mehr Infos
        </a>
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
            ["contact.firstName", "Vorname"],
            ["contact.lastName", "Nachname"],
            ["contact.phone", "Telefonnummer"],
            ["contact.email", "E-Mail"]
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
            ["farm.name", "Hofname"],
            ["farm.streetAddress", "Straße und Hausnummer"],
            ["farm.postalCode", "PLZ"],
            ["farm.location", "Ort"],
            ["farm.website", "Webseite (optional)"]
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
          <svg
            className="mx-auto"
            width="191"
            height="191"
            viewBox="0 0 191 191"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="95.5" cy="95.5" r="95.5" fill="url(#paint0_linear)" />
            <path
              d="M121.124 59.3753H112.592L103.661 50.4442C103.355 50.1373 102.992 49.8938 102.591 49.7279C102.191 49.562 101.762 49.4769 101.328 49.4775H88.1315C87.6981 49.4769 87.2689 49.562 86.8686 49.7279C86.4683 49.8938 86.1047 50.1373 85.7989 50.4442L76.8678 59.3753H68.3359C64.6969 59.3753 61.7374 62.3347 61.7374 65.9738V102.266C61.7374 105.905 64.6969 108.864 68.3359 108.864H121.124C124.763 108.864 127.722 105.905 127.722 102.266V65.9738C127.722 62.3347 124.763 59.3753 121.124 59.3753ZM94.73 98.9663C85.789 98.9663 78.2337 91.411 78.2337 82.4701C78.2337 73.5258 85.789 65.9738 94.73 65.9738C103.671 65.9738 111.226 73.5258 111.226 82.4701C111.226 91.411 103.671 98.9663 94.73 98.9663Z"
              fill="white"
            />
            <path
              d="M98.0317 72.5715H91.4332V79.17H84.8347V85.7685H91.4332V92.367H98.0317V85.7685H104.63V79.17H98.0317V72.5715Z"
              fill="white"
            />
            <path
              d="M46.0601 134.146H40.3916V140.111H38.6104V126.603H46.9785V128.069H40.3916V132.689H46.0601V134.146ZM48.1846 134.999C48.1846 134.016 48.3763 133.131 48.7598 132.346C49.1494 131.56 49.6875 130.954 50.374 130.528C51.0667 130.101 51.8553 129.887 52.7397 129.887C54.1066 129.887 55.2106 130.361 56.0518 131.307C56.8991 132.253 57.3228 133.512 57.3228 135.083V135.203C57.3228 136.181 57.1341 137.059 56.7568 137.838C56.3857 138.611 55.8507 139.214 55.1519 139.647C54.4591 140.08 53.6613 140.297 52.7583 140.297C51.3976 140.297 50.2936 139.823 49.4463 138.877C48.6051 137.931 48.1846 136.678 48.1846 135.12V134.999ZM49.9102 135.203C49.9102 136.317 50.1668 137.21 50.6802 137.885C51.1997 138.559 51.8924 138.896 52.7583 138.896C53.6304 138.896 54.3231 138.556 54.8364 137.875C55.3498 137.189 55.6064 136.23 55.6064 134.999C55.6064 133.898 55.3436 133.008 54.8179 132.327C54.2983 131.641 53.6056 131.298 52.7397 131.298C51.8924 131.298 51.209 131.635 50.6895 132.309C50.1699 132.983 49.9102 133.948 49.9102 135.203ZM61.8037 127.642V130.073H63.6777V131.4H61.8037V137.625C61.8037 138.027 61.8872 138.33 62.0542 138.534C62.2212 138.732 62.5057 138.831 62.9077 138.831C63.1056 138.831 63.3778 138.794 63.7241 138.719V140.111C63.2726 140.235 62.8335 140.297 62.4067 140.297C61.6398 140.297 61.0615 140.065 60.6719 139.601C60.2822 139.137 60.0874 138.478 60.0874 137.625V131.4H58.2598V130.073H60.0874V127.642H61.8037ZM65.0508 134.999C65.0508 134.016 65.2425 133.131 65.626 132.346C66.0156 131.56 66.5537 130.954 67.2402 130.528C67.9329 130.101 68.7215 129.887 69.606 129.887C70.9728 129.887 72.0768 130.361 72.918 131.307C73.7653 132.253 74.189 133.512 74.189 135.083V135.203C74.189 136.181 74.0003 137.059 73.623 137.838C73.252 138.611 72.717 139.214 72.0181 139.647C71.3254 140.08 70.5275 140.297 69.6245 140.297C68.2638 140.297 67.1598 139.823 66.3125 138.877C65.4714 137.931 65.0508 136.678 65.0508 135.12V134.999ZM66.7764 135.203C66.7764 136.317 67.033 137.21 67.5464 137.885C68.0659 138.559 68.7586 138.896 69.6245 138.896C70.4966 138.896 71.1893 138.556 71.7026 137.875C72.216 137.189 72.4727 136.23 72.4727 134.999C72.4727 133.898 72.2098 133.008 71.6841 132.327C71.1646 131.641 70.4718 131.298 69.606 131.298C68.7586 131.298 68.0752 131.635 67.5557 132.309C67.0361 132.983 66.7764 133.948 66.7764 135.203ZM85.2197 140.297C83.859 140.297 82.752 139.851 81.8984 138.961C81.0449 138.064 80.6182 136.867 80.6182 135.37V135.055C80.6182 134.059 80.8068 133.172 81.1841 132.392C81.5675 131.607 82.0994 130.995 82.7798 130.555C83.4663 130.11 84.2085 129.887 85.0063 129.887C86.3114 129.887 87.3257 130.317 88.0493 131.177C88.7729 132.037 89.1348 133.267 89.1348 134.869V135.584H82.3345C82.3592 136.573 82.6468 137.374 83.1973 137.987C83.7539 138.593 84.459 138.896 85.3125 138.896C85.9186 138.896 86.432 138.772 86.8525 138.525C87.2731 138.277 87.6411 137.949 87.9565 137.541L89.0049 138.358C88.1637 139.65 86.902 140.297 85.2197 140.297ZM85.0063 131.298C84.3136 131.298 83.7323 131.551 83.2622 132.058C82.7922 132.559 82.5015 133.264 82.3901 134.174H87.4185V134.044C87.369 133.172 87.134 132.497 86.7134 132.021C86.2928 131.539 85.7238 131.298 85.0063 131.298ZM92.9941 140.111H91.2778V130.073H92.9941V140.111ZM91.1387 127.41C91.1387 127.132 91.2222 126.897 91.3892 126.705C91.5623 126.514 91.8159 126.418 92.1499 126.418C92.4839 126.418 92.7375 126.514 92.9106 126.705C93.0838 126.897 93.1704 127.132 93.1704 127.41C93.1704 127.689 93.0838 127.921 92.9106 128.106C92.7375 128.292 92.4839 128.385 92.1499 128.385C91.8159 128.385 91.5623 128.292 91.3892 128.106C91.2222 127.921 91.1387 127.689 91.1387 127.41ZM97.373 130.073L97.4287 131.335C98.1956 130.37 99.1976 129.887 100.435 129.887C102.556 129.887 103.626 131.084 103.645 133.478V140.111H101.928V133.469C101.922 132.745 101.755 132.21 101.427 131.864C101.106 131.517 100.602 131.344 99.915 131.344C99.3584 131.344 98.8698 131.492 98.4492 131.789C98.0286 132.086 97.7008 132.476 97.4658 132.958V140.111H95.7495V130.073H97.373ZM107.077 140.111V131.4H105.491V130.073H107.077V129.043C107.077 127.967 107.365 127.135 107.94 126.548C108.515 125.96 109.328 125.666 110.38 125.666C110.776 125.666 111.168 125.719 111.558 125.824L111.465 127.216C111.175 127.16 110.865 127.132 110.538 127.132C109.981 127.132 109.551 127.296 109.248 127.624C108.945 127.945 108.793 128.409 108.793 129.015V130.073H110.937V131.4H108.793V140.111H107.077ZM119.036 139.118C118.368 139.904 117.387 140.297 116.095 140.297C115.025 140.297 114.208 139.987 113.646 139.369C113.089 138.744 112.807 137.823 112.801 136.604V130.073H114.518V136.558C114.518 138.079 115.136 138.84 116.373 138.84C117.684 138.84 118.556 138.351 118.989 137.374V130.073H120.706V140.111H119.073L119.036 139.118ZM113.812 127.392C113.812 127.114 113.896 126.882 114.063 126.696C114.236 126.504 114.49 126.408 114.824 126.408C115.158 126.408 115.411 126.504 115.584 126.696C115.758 126.882 115.844 127.114 115.844 127.392C115.844 127.67 115.758 127.902 115.584 128.088C115.411 128.273 115.158 128.366 114.824 128.366C114.49 128.366 114.236 128.273 114.063 128.088C113.896 127.902 113.812 127.67 113.812 127.392ZM117.802 127.41C117.802 127.132 117.885 126.897 118.052 126.705C118.225 126.514 118.479 126.418 118.813 126.418C119.147 126.418 119.401 126.514 119.574 126.705C119.747 126.897 119.833 127.132 119.833 127.41C119.833 127.689 119.747 127.921 119.574 128.106C119.401 128.292 119.147 128.385 118.813 128.385C118.479 128.385 118.225 128.292 118.052 128.106C117.885 127.921 117.802 127.689 117.802 127.41ZM122.914 135.009C122.914 133.444 123.275 132.201 123.999 131.279C124.723 130.351 125.681 129.887 126.875 129.887C128.1 129.887 129.055 130.32 129.742 131.186L129.825 130.073H131.393V139.87C131.393 141.169 131.007 142.192 130.233 142.941C129.466 143.689 128.434 144.063 127.135 144.063C126.411 144.063 125.703 143.909 125.01 143.599C124.318 143.29 123.789 142.866 123.424 142.328L124.314 141.299C125.05 142.208 125.95 142.662 127.014 142.662C127.849 142.662 128.499 142.427 128.962 141.957C129.432 141.487 129.667 140.825 129.667 139.972V139.109C128.981 139.901 128.044 140.297 126.856 140.297C125.681 140.297 124.729 139.823 123.999 138.877C123.275 137.931 122.914 136.641 122.914 135.009ZM124.639 135.203C124.639 136.335 124.871 137.226 125.335 137.875C125.799 138.518 126.448 138.84 127.283 138.84C128.366 138.84 129.16 138.348 129.667 137.365V132.782C129.142 131.823 128.353 131.344 127.302 131.344C126.467 131.344 125.814 131.669 125.344 132.318C124.874 132.968 124.639 133.929 124.639 135.203ZM138.156 140.297C136.796 140.297 135.688 139.851 134.835 138.961C133.981 138.064 133.555 136.867 133.555 135.37V135.055C133.555 134.059 133.743 133.172 134.121 132.392C134.504 131.607 135.036 130.995 135.716 130.555C136.403 130.11 137.145 129.887 137.943 129.887C139.248 129.887 140.262 130.317 140.986 131.177C141.709 132.037 142.071 133.267 142.071 134.869V135.584H135.271C135.296 136.573 135.583 137.374 136.134 137.987C136.69 138.593 137.396 138.896 138.249 138.896C138.855 138.896 139.368 138.772 139.789 138.525C140.21 138.277 140.578 137.949 140.893 137.541L141.941 138.358C141.1 139.65 139.839 140.297 138.156 140.297ZM137.943 131.298C137.25 131.298 136.669 131.551 136.199 132.058C135.729 132.559 135.438 133.264 135.327 134.174H140.355V134.044C140.306 133.172 140.07 132.497 139.65 132.021C139.229 131.539 138.66 131.298 137.943 131.298ZM145.689 130.073L145.745 131.335C146.512 130.37 147.514 129.887 148.751 129.887C150.872 129.887 151.942 131.084 151.961 133.478V140.111H150.245V133.469C150.238 132.745 150.071 132.21 149.744 131.864C149.422 131.517 148.918 131.344 148.231 131.344C147.675 131.344 147.186 131.492 146.766 131.789C146.345 132.086 146.017 132.476 145.782 132.958V140.111H144.066V130.073H145.689Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="95.5"
                y1="0"
                x2="95.5"
                y2="191"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#199057" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )
    }
  ],
  [
    {
      stepIndex: 2,
      Content: () => (
        <>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Mindestbeschäftigungsdauer
            </FormTitle>
            <div className="flex">
              {/* TODO: switch to radio buttons, when implementing form */}
              {/* FIXME: first-child selector not working. god knows why... */}
              {["1/2 Tag", "1 Tag", "1 Woche", "Länger"].map((text, i) => (
                <button
                  key={i}
                  className="flex-grow border-2 border-r-0 last:border-r-2 first:rounded-l-full last:rounded-r-full border-brand text-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium focus:text-white focus:bg-brand"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Stundenlohn
            </FormTitle>

            <StepCalculator
              initialValue={9.35}
              steps={0.5}
              min={0}
              renderValue={(v) => `${v.toFixed(2)} €`}
            />
          </div>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Übernachtungsmöglichkeiten für Helfer*innen
            </FormTitle>
            <div>
              <Radio block>Ja</Radio>
              <Radio block>Nein</Radio>
            </div>
          </div>
          <div>
            <FormTitle as="h2" className="mb-2">
              Übernachtungspreis
            </FormTitle>
            <StepCalculator
              initialValue={5}
              steps={0.5}
              min={0}
              renderValue={(v) => `${v.toFixed(2)} €`}
            />
          </div>
        </>
      )
    },
    {
      stepIndex: 2,
      Content: () => (
        <>
          <div className="mb-8">
            <FormTitle as="h2" className="mb-2">
              Anreise der Helfer*innen
            </FormTitle>
            <div>
              <Radio block>Eigenständig (keine Abholung)</Radio>
              <Radio block>
                Abholung möglich, mit einer maximalen Entfernung von bis zu ...
              </Radio>
            </div>
            <StepCalculator
              initialValue={5}
              steps={5}
              min={0}
              renderValue={(v) => `${v.toFixed(0)} km`}
              className="mt-4"
            />
          </div>
          <div>
            <FormTitle as="h2" className="mb-2">
              Zusätzliche Angaben
            </FormTitle>
            <p className="text-gray-600 text-sm mb-2">
              Arbeitsbeginn, Übernachtungsmöglichkeit, Verplegung, Sprache, etc.
            </p>
            <textarea
              className="border border-black rounded-lg w-full p-2"
              placeholder="Beschreibung eingeben"
              rows={4}
            ></textarea>
          </div>
        </>
      )
    },
    {
      stepIndex: 2,
      Content: () => {
        return (
          <>
            <FormTitle as="h2" className="mb-2">
              Kulturen (Allergien der Helfer*innen)/
            </FormTitle>
            <div className="flex flex-wrap -m-1">
              {[
                "Spargel",
                "Erdbeeren",
                "Hopfen",
                "Weinbau",
                "Obstbau",
                "Salate",
                "Gurken",
                "Kohl",
                "Radieschen",
                "Sonstige"
              ].map((type, i, array) => (
                <div
                  key={type}
                  className={classnames("p-1", {
                    "w-1/3": i < array.length - 1,
                    "w-full": i === array.length - 1
                  })}
                >
                  <button className="w-full border rounded-lg focus:shadow-selection-brand border-brand focus:bg-brand-light">
                    <span
                      //  Temporary until icons are added
                      style={{ lineHeight: 4 }}
                    >
                      {type}
                    </span>
                  </button>
                </div>
              ))}
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
            <svg
              width="176"
              height="176"
              viewBox="0 0 176 176"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="88" cy="88" r="88" fill="#94E1AE" />
              <path
                d="M12.1 4H76.9C81.355 4 85 7.65625 85 12.125V60.875C85 65.3438 81.355 69 76.9 69H12.1C7.645 69 4 65.3438 4 60.875V12.125C4 7.65625 7.645 4 12.1 4Z"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M85 4L44.5 32L4 4"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
              <strong>{values.contact.email}</strong> geschickt. Bitte öffne
              diese.
            </p>
          </div>
        </div>
      );
    }
  }
];

const initialValues = {
  contact: { firstName: "", lastName: "", phone: "", email: "" },
  farm: {
    name: "",
    streetAddress: "",
    postalCode: "",
    location: "",
    website: ""
  }
};

const Register = () => {
  const { push } = useHistory();
  const {
    activeStep,
    ActiveStepContent,
    activeStepIndex,
    goNext,
    goPrevious,
    StepsBar
  } = useSteps(steps, contents);

  return (
    <div className="flex flex-col h-full px-8 py-4">
      <div className="flex-grow">
        <Title as="h1" className="text-2xl mb-8" bold>
          Registrierung
        </Title>
        <StepsBar className="mb-8 text-sm" />
        <Formik
          initialValues={initialValues}
          onSubmit={(input) => {
            console.log(input);
          }}
        >
          {({ setFieldValue, values }: FormProps) => (
            <ActiveStepContent setFieldValue={setFieldValue} values={values} />
          )}
        </Formik>
      </div>
      <div className="flex">
        {activeStepIndex < steps.length - 1 ? (
          <>
            <button
              onClick={activeStepIndex < 1 ? () => push("/signin") : goPrevious}
              className="flex-grow mr-4 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-full px-4 py-1 cursor-pointer"
            >
              Zurück
            </button>
            <PrimaryButton className="flex-grow" onClick={goNext}>
              {activeStep.okText}
            </PrimaryButton>
          </>
        ) : (
          <button className="text-brand underline block p-1 text-center mx-auto">
            Ich habe keine E-Mail erhalten
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
