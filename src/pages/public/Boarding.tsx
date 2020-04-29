import * as queryString from "querystring";
import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "~/components/Button";
import { Logo } from "~/components/Logo";

const Boarding = ({ isHelper = true, location }) => {
  // TODO check if already able to log in
  const urlParams = queryString.parse(location && location.search);
  const redirect = urlParams["?redirect"];

  let loginLink = "/login";
  let registerLink = isHelper ? "/register/helper" : "/register/provider";

  if (redirect) {
    loginLink = loginLink + `?redirect=${redirect}`;
    registerLink = registerLink + `?redirect=${redirect}`;
  }

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
          <Link to={loginLink}>
            <PrimaryButton block>Einloggen</PrimaryButton>
          </Link>
        </div>
        <div>
          <p className="mb-2">Oder bist du neu hier?</p>
          <Link to={registerLink}>
            <PrimaryButton theme="border" block>
              Registrieren
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Boarding;
