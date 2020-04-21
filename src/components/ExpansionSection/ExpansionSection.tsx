import React from "react";
import { ExpansionContainer } from "~/components/ExpansionContainer";
import { Title } from "~/components/Title";

interface FaqContent {
  summary: string;
  details: string;
}

interface ExpansionSectionProps {
  faqContent: Array<FaqContent>;
  sectionTitle: string;
}

const ExpansionSection = ({
  faqContent,
  sectionTitle
}: ExpansionSectionProps) => {
  const renderQA = () => {
    return faqContent.map((qa) => {
      return <ExpansionContainer summary={qa.summary} details={qa.details} />;
    });
  };

  return (
    <div className="flex flex-col py-4 items-center justify-start px-8 h-full pb-20">
      <Title as="h1" className="w-full md:text-center text-xl mb-12">
        {sectionTitle}
      </Title>
      <div className="w-full block">{renderQA()}</div>
    </div>
  );
};

export default ExpansionSection;
