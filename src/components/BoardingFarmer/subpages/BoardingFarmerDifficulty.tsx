import React from "react";
import { BoardingFarmerProps } from ".";
import { Input } from "~/components/Form/components";

type Props = BoardingFarmerProps;

const BoardingFarmerDifficulty = ({ state, handleUpdate }: Props) => {
  return (
    <Input
      value={state.difficulty}
      onChange={(e) => handleUpdate(+e.currentTarget.value)}
    />
  );
};

export default BoardingFarmerDifficulty;
