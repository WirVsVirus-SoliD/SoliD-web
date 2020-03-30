import React from "react";
import { BoardingFarmerProps } from ".";
import { Input } from "~/components/Form/components";

type Props = BoardingFarmerProps;

const BoardingFarmerHelpers = ({ state, handleUpdate }: Props) => {
  return (
    <div>
      <p className="mb-2">
        Bitte gib an, wie viele Helfer Du insgesamt benötigst.
      </p>
      <Input
        type="number"
        min={1}
        max={1000}
        value={state.helpersNeededCount}
        onChange={(e) => handleUpdate(e.currentTarget.value)}
        autoFocus
        block
      />
    </div>
  );
};

export default BoardingFarmerHelpers;
