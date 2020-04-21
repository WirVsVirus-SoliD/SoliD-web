import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
        <div className="py-3 border-t border-lightGrey last:border-b">
          <Link to={link.link}>
            <div>
              {link.title}
              <div className="float-right">
                <ChevronRightIcon />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LinkList;
