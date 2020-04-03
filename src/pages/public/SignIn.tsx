import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "~/components/Logo";
import { PrimaryButton } from "~/components/Button";

const SignIn = () => {
  return (
    <div className="flex flex-col py-4 px-8 h-full">
      <div className="w-full flex-grow items-center">
        <div className="flex items-center h-full">
          <Logo withText className="mx-auto" />
        </div>
      </div>
      <div className="w-full text-center">
        <div className="mb-8">
          <p className="mb-2">Hast du bereits einen SoliD-Account?</p>
          <Link to="/login">
            <PrimaryButton block>Einloggen</PrimaryButton>
          </Link>
        </div>
        <div>
          <p className="mb-2">Oder bist du neu hier?</p>
          <Link to="/register">
            <PrimaryButton theme="border" block>
              Registrieren
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
