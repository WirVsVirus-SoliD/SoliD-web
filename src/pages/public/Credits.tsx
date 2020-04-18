import React from "react";
import { Title } from "~/components/Title";
import LinkList from "~/components/LinkList/LinkList";

const Credits = () => {
  const creditList = [
    {
      title: "Bildmaterial",
      link: "/credits/photo-material"
    },
    {
      title: "Open-Source-Projekte",
      link: "/404"
    }
  ];

  return (
    <div className="flex flex-col py-4 items-center px-8 h-full pb-20">
      <Title as="h1" className="w-full md:text-center text-xl mb-12">
        Credits
      </Title>
      <div className="w-full block">
        <LinkList links={creditList} />
      </div>
    </div>
  );
};

export default Credits;
