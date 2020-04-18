import React from "react";

interface ListProps {
  listContent: Array<string>;
}

const List = ({ listContent }: ListProps) => {
  const renderList = () => {
    return listContent.map((listPoint) => (
      <li>
        <p>{listPoint}</p>
      </li>
    ));
  };

  return <ul className="pl-0 ml-5 items-start list-disc">{renderList()}</ul>;
};

export default List;
