import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  title: string;
  link: string;
}

interface LinkListProps {
  links: Array<LinkProps>;
}

const LinkList = ({ links }: LinkListProps) => {
  return (
    <div>
      {links.map((link) => (
        <div>
          <Link to={link.link}>{link.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default LinkList;
