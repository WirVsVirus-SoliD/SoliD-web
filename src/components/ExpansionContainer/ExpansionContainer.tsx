import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { Title } from "~/components/Title";

interface ExpansionContainerProps {
  summary: string;
  details: string;
}

const ExpansionContainer = ({ summary, details }: ExpansionContainerProps) => {
  return (
    <ExpansionPanel className="shadow-none static" square={true}>
      <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMoreIcon />}>
        <Title as="h1" className="w-full">
          {summary}
        </Title>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="p-0">
        <p>{details}</p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionContainer;
