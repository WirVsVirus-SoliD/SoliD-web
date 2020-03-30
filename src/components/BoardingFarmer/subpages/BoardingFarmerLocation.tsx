import React from "react";
import { BoardingFarmerProps } from ".";
import { Input } from "~/components/Form/components";

type Props = BoardingFarmerProps;

const BoardingFarmerLocation = ({ state, handleUpdate }: Props) => {
  return (
    <div>
      <p className="mb-2">
        Wo wird Hilfe benötigt? Bitte gebe den Standort an, an dem potenzielle
        Helfer erscheinen sollen, um Dich zu unterstützen.
      </p>
      <Input
        value={state.location}
        onChange={(e) => handleUpdate(e.currentTarget.value)}
        placeholder="z. B. Frankfurt am Main"
        autoFocus
        block
      />
    </div>
  );
};

export default BoardingFarmerLocation;
