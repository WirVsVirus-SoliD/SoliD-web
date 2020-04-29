import React from "react";
import { Title } from "~/components/Title";

const ProviderDetailsSection = ({ title, text }) => {
  if (text == null) return null;

  return (
    <>
      <Title as="h3" className="text-xl mb-2">
        {title}
      </Title>
      <p className="mb-4">{text}</p>
    </>
  );
};

export default ProviderDetailsSection;
