import React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * A section header acts as a divider between different sections and is a great place
 * for titles and/or small menus.
 */
const SectionHeader = ({ children }: Props) => {
  return (
    <div className="flex justify-between items-center px-1 mb-4 border-b-2 border-gray-300">
      {children}
    </div>
  );
};

export default SectionHeader;
