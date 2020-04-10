import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Info, User, Briefcase, CheckCircle } from "react-feather";

import { Title } from "~/components/Title";
import { Step, useSteps, StepContent } from "~/components/Steps";
import { PrimaryButton } from "~/components/Button";
import { CheckIcon } from "~/components/Icon";
import { FormTitle } from "~/components/Form";
import { Radio } from "~/components/Form/components";

const checklistTexts = [
  "Du bist für die Sicherheit der Helfer*innen verantwortlich",
  "Befolge die offiziellen Arbeitsschutzrichtlinien",
  "Stelle sicher, dass alle Helfer*innen versichert sind"
];

const steps: Step[] = [
  {
    title: "Hinweis",
    Icon: Info
  },
  {
    title: "Deine Daten",
    Icon: User
  },
  {
    title: "Konditionen",
    Icon: Briefcase
  },
  {
    title: "Fertig!",
    Icon: CheckCircle
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
      Content: () => (
        <>
          <FormTitle as="h2" className="mb-4">
            Ansprechpartner
          </FormTitle>
          <TextField label="Vorname" className="mb-4 text-brand" fullWidth />
          <TextField label="Nachname" className="mb-4" fullWidth />
          <TextField label="Telefonnummer" className="mb-4" fullWidth />
          <TextField label="E-Mail" className="mb-4" fullWidth />
        </>
      )
    },
    {
      stepIndex: 1,
      Content: () => (
        <>
          <FormTitle as="h2" className="mb-4">
            Test
          </FormTitle>
          <TextField label="Vorname" className="mb-4 text-brand" fullWidth />
          <TextField label="Nachname" className="mb-4" fullWidth />
          <TextField label="Telefonnummer" className="mb-4" fullWidth />
          <TextField label="E-Mail" className="mb-4" fullWidth />
        </>
      )
    }
  ],
  {
    stepIndex: 2,
    Content: () => {
      const [hourlyWage, setHourlyWage] = useState(9.35);
      const [stayPrice, setStayPrice] = useState(5);

      return (
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
            <div className="flex items-stretch text-center">
              <button
                className="flex-grow border-2 border-r-0 rounded-l-full border-brand bg-brand text-white py-1"
                onClick={() => setHourlyWage(hourlyWage - 0.5)}
              >
                -
              </button>
              <div className="flex flex-grow items-center border-2 border-brand py-1 text-sm font-medium">
                <span className="w-full text-center">{`${hourlyWage.toFixed(
                  2
                )} €`}</span>
              </div>
              <button
                className="flex-grow border-2 border-l-0 rounded-r-full border-brand bg-brand text-white py-1"
                onClick={() => setHourlyWage(hourlyWage + 0.5)}
              >
                +
              </button>
            </div>
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
            <div className="flex items-stretch text-center">
              <button
                className="flex-grow border-2 border-r-0 rounded-l-full border-brand bg-brand text-white py-1"
                onClick={() => setStayPrice(stayPrice - 0.5)}
              >
                -
              </button>
              <div className="flex flex-grow items-center border-2 border-brand py-1 text-sm font-medium">
                <span className="w-full text-center">{`${stayPrice.toFixed(
                  2
                )} €`}</span>
              </div>
              <button
                className="flex-grow border-2 border-l-0 rounded-r-full border-brand bg-brand text-white py-1"
                onClick={() => setStayPrice(stayPrice + 0.5)}
              >
                +
              </button>
            </div>
          </div>
        </>
      );
    }
  },
  {
    stepIndex: 3,
    Content: () => {
      // Placeholder: remove when form is implemented
      const email = "abc@gmail.com";

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
              <strong>{email}</strong> geschickt. Bitte öffne diese.
            </p>
          </div>
        </div>
      );
    }
  }
];

const Register = () => {
  const { push } = useHistory();
  const {
    StepsBar,
    ActiveStepContent,
    goNext,
    goPrevious,
    activeStepIndex
  } = useSteps(steps, contents);

  return (
    <div className="flex flex-col h-full px-8 py-4">
      <div className="flex-grow">
        <Title as="h1" className="text-2xl mb-8" bold>
          Registrierung
        </Title>
        <StepsBar className="mb-8 text-sm" />
        <ActiveStepContent />
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
              Okay, verstanden!
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