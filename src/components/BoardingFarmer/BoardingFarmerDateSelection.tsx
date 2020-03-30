import React, { useState } from "react";
import { NextStepProps } from ".";
import BaseButton from "../Button/BaseButton";
import { Calendar } from "../Calendar";
import { BoardingTitle } from "../Title";
import { BoardingFarmerStepsHeader } from "./steps";

type Props = {} & Pick<NextStepProps, "triggerNextPage">;

const BoardingFarmerDateSelection = (props: Props) => {
  const today = new Date();
  const [dates, setDates] = useState<[string, string]>(null);

  return (
    <div className="flex flex-col justify-between h-100vh py-4">
      <div>
        <BoardingFarmerStepsHeader handleGoBack={() => {}} />
        <BoardingTitle>Wann benötigst Du Unterstützung?</BoardingTitle>
        <Calendar
          onChange={setDates}
          className="mx-auto mt-4"
          minDate={today}
        />
      </div>
      <BaseButton
        className="bg-black text-white border-black"
        onClick={props.triggerNextPage}
        block
      >
        Kontaktdaten angeben
      </BaseButton>
    </div>
  );
};

export default BoardingFarmerDateSelection;
