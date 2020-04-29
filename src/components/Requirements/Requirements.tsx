import React from "react";
import { InfoIcon } from "~/components/Icon";

const Requirements = () => {
  return (
    <>
      <div className="mb-8">
        <p className="font-bold mb-2">Bitte beachte:</p>
        <div className="flex flex-row mb-4">
          <div className="flex">
            <InfoIcon size={24} />
          </div>
          <p className="mx-2">
            Zuverlässigkeit steht an oberster Stelle!
            <br />
            Wenn du die Arbeit nicht antreten kannst, sag deiner Kontaktperson
            bitte unmittelbar ab, damit sie umplanen kann.
          </p>
        </div>
        <div className="flex flex-row mb-4">
          <div className="flex">
            <InfoIcon size={24} />
          </div>
          <p className="mx-2">
            Feldarbeit kann unter Umständen sehr <strong>anstrengend</strong>{" "}
            und <strong>belastend</strong> sein. Du solltest keine Probleme mit
            häufigem Bücken und längerer körperlicher Anstrengung haben.
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex">
            <InfoIcon size={24} />
          </div>
          <p className="mx-2 font-bold">Mindestalter: 15 Jahre</p>
        </div>
      </div>
    </>
  );
};

export default Requirements;
