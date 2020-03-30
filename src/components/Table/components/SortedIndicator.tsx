import React from "react";

type Props = {
  isSorted: boolean;
  isSortedDesc: boolean;
};

/**
 * We want to show a small indicator, whenever a user sorts a column inside a table.
 * This component handles the different states.
 */
const SortedIndicator = ({ isSorted, isSortedDesc }: Props) => {
  if (!isSorted) {
    return null;
  }

  if (isSortedDesc) {
    return <span>🔽</span>;
  } else {
    return <span>🔼</span>;
  }
};

export default SortedIndicator;
