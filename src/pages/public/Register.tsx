import React from "react";
import { Title } from "~/components/Title";
import { Step, useSteps } from "~/components/Steps";
import { PrimaryButton } from "~/components/Button";
import { Info, User, Briefcase, CheckCircle } from "react-feather";
import { CheckIcon } from "~/components/Icon";
import { Input } from "~/components/Form/components";
import { useHistory } from "react-router-dom";
import { FormTitle } from "~/components/Form";

const checklistTexts = [
  "Du bist für die Sicherheit der Helfer*innen verantwortlich",
  "Befolge die offiziellen Arbeitsschutzrichtlinien",
  "Stelle sicher, dass alle Helfer*innen versichert sind"
];

const steps: Step[] = [
  {
    title: "Hinweis",
    Icon: Info,
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
  {
    title: "Deine Daten",
    Icon: User,
    Content: () => (
      <>
        <FormTitle as="h2" className="mb-4">
          Ansprechpartner
        </FormTitle>
        <Input className="mb-4" block placeholder="Vorname" />
        <Input className="mb-4" block placeholder="Nachname" />
        <Input className="mb-4" block placeholder="Telefonnummer" />
        <Input className="mb-4" block placeholder="E-Mail" />
      </>
    )
  },
  {
    title: "Konditionen",
    Icon: Briefcase,
    Content: () => (
      <>
        <div className="mb-4">
          <FormTitle as="h2">Mindestbeschäftigungsdauer</FormTitle>
          {/* TODO: switch to radio buttons, when implementing form */}
          {/* FIXME: first-child selector not working. god knows why... */}
          {["1/2 Tag", "1 Tag", "1 Woche", "Länger"].map((text, i) => (
            <button
              key={i}
              className="border-2 border-r-0 last:border-r-2 first:rounded-l-2 last:rounded-r-full border-brand text-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium focus:text-white focus:bg-brand"
            >
              {text}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <FormTitle as="h2">Stundenlohn</FormTitle>
        </div>
        <div>
          <FormTitle as="h2">
            Übernachtungsmöglichkeiten für Helfer*innen
          </FormTitle>
        </div>
      </>
    )
  },
  {
    title: "Fertig!",
    Icon: CheckCircle,
    Content: () => <>hi</>
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
  } = useSteps(steps);

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
        <button
          onClick={activeStepIndex < 1 ? () => push("/signin") : goPrevious}
          className="flex-grow mr-4 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-full px-4 py-1 cursor-pointer"
        >
          Zurück
        </button>
        <PrimaryButton className="flex-grow" onClick={goNext}>
          Okay, verstanden!
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Register;
