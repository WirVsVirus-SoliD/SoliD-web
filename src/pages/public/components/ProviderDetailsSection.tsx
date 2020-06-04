import React from "react";
import { Title } from "~/components/Title";

const ProviderDetailsSection = ({
  title,
  text,
  titleStyle = "text-xl mb-2"
}) => {
  if (text == null) return null;

  return (
    <>
      <Title as="h3" className={titleStyle}>
        {title}
      </Title>
      <p className="mb-4">{text}</p>
    </>
  );
};

export default ProviderDetailsSection;
