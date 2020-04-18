import React from "react";
import LinkList from "~/components/LinkList/LinkList";
import { Title } from "~/components/Title";
import { PrimaryButton } from "~/components/Button";
import { Link } from "react-router-dom";

const FaqOverview = () => {
  const specificFaqs = [
    {
      title: "Für Helfer*innen",
      link: "/faq/farmer"
    },
    {
      title: "Für Landwirt*innen",
      link: "/faq/helper"
    }
  ];

  return (
    <div className="flex flex-col py-4 items-center px-8 h-full pb-20">
      <Title as="h1" className="w-full md:text-center text-xl mb-12">
        Fragen und Antworten
      </Title>
      <div className="w-full block">
        <LinkList links={specificFaqs} />
      </div>
      <div className="absolute bottom-0 left-0 mb-4 w-full px-8 block object-bottom">
        <Link to="/credits">
          <PrimaryButton block theme="border">
            Credits
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default FaqOverview;
