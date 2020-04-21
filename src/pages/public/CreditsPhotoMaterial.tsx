import React from "react";
import { Title } from "~/components/Title";
import { List } from "~/components/List";

const CreditsPhotoMaterial = () => {
  const photoCreditList = [
    "Freepik from Flaticon",
    "Eucalyp from Flaction",
    "monkik from Flaction",
    "Good Ware from Flaction"
  ];

  return (
    <div className="flex flex-col py-4 items-center px-8 h-full pb-20">
      <Title as="h1" className="w-full md:text-center text-xl mb-12">
        Credits
      </Title>
      <Title as="h4" className="w-full md:text-center mb-3">
        Icons made by
      </Title>
      <div className="w-full block">
        <List listContent={photoCreditList} />
      </div>
    </div>
  );
};

export default CreditsPhotoMaterial;
