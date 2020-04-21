import React from "react";
import { ExpansionSection } from "~/components/ExpansionSection";

const FaqHelper = () => {
  const helperFaq = [
    {
      summary:
        "Was ist bei einem Arbeitsplatz in der Landwirtschaft besonders?",
      details:
        "Der Arbeitsplatz ist in der freien Natur, wodurch stark wechselnde und unter Umstände extreme Arbeitsbedingungen (Hitze, Regen, etc.) anzutreffen sind."
    },
    {
      summary: "Kann ich trotz Heuschnupfen in der Landwirtschaft helfen?",
      details:
        "Da Heuschnupfen bei jeder Person zu anderen Zeiten und in unterschiedlicher Stärke auftritt, muss das jede Person für sich selbst entscheiden. Wenn du dir unsicher bist und dir Sorgen machst, kontaktiere am besten den Landwirt persönlich, da dieser die auftretenden Unkräuter in seinen Feldern am besten kennt und du dadurch die Lage besser einschätzen kannst."
    },
    {
      summary: "Welche Qualifikationen benötige ich für eine Beschäftigung?",
      details:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },
    {
      summary: "Was tun, wenn der/die Landwirt*in sich nicht meldet?",
      details:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },
    {
      summary: "Was ist als Helfer*in zu tun, wenn Regen vorhergesagt ist?",
      details:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },
    {
      summary: "At vero eos et accusam et justo duo dolores et ea rebum?",
      details:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    }
  ];

  return (
    <ExpansionSection
      sectionTitle="Fragen und Antworten"
      faqContent={helperFaq}
    />
  );
};

export default FaqHelper;
