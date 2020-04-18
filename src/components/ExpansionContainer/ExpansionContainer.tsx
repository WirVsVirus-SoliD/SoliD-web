import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import "./ExpansionContainer.css";
import { Title } from "~/components/Title";

interface ExpansionContainerProps {
  summary: string;
  details: string;
}

const ExpansionContainer = ({ summary, details }: ExpansionContainerProps) => {
  return (
    <ExpansionPanel className="shadowless" square={true}>
      <ExpansionPanelSummary className="no-padding" expandIcon={<ExpandMore />}>
        <Title as="h1" className="w-full">
          {summary}
        </Title>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="no-padding">
        <p>{details}</p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionContainer;
