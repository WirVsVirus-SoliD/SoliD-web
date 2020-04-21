import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { validate } from "~/actions/user";
import { ResponsiveSvgBackground } from "~/components/Background";
import { PrimaryButton } from "~/components/Button";
import storage from "~/lib/storage";
import { SplashScreen } from "~/pages/public/index";
import { ResponsiveLandingTitle } from "./components";

const ResetTopMarginStyles = { marginTop: 0 };

type Props = {};

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const token = storage.getAccessToken();

  useEffect(() => {
    if (token) {
      dispatch(validate("/dashboard"))
        // @ts-ignore
        .then(({ response, redirect }) => {
          setTimeout(() => {
            setLoading(false);
            history.push(redirect);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
            // TODO TRY REFRESH TOKEN IN MIDDLEWARE?
            storage.clearStorage();
            history.push("/login");
          }, 2000);
        });
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [token, history, dispatch]);

  if (loading) return <SplashScreen />;

  return (
    <>
      <div className="relative z-10 flex flex-col h-full px-4">
        {/* Logo and subtitle */}
        <div className="flex-grow">
          <div className="flex items-center h-full">
            <ResponsiveLandingTitle
              className="block mb-16"
              style={ResetTopMarginStyles}
            />
          </div>
        </div>

        {/* C2A buttons */}
        <div className="w-full block pb-4">
          <Link to="/map">
            <PrimaryButton block className="tracking-wider mb-2">
              Ich will helfen
            </PrimaryButton>
          </Link>
          <Link to="/register/provider">
            <PrimaryButton block className="tracking-wider">
              Ich benötige Hilfe
            </PrimaryButton>
          </Link>

          <p className="mt-12 mb-2 text-center text-sm">
            Oder hast du schon einen Account?
          </p>
          <Link to="/signin">
            <PrimaryButton block theme="border" className="tracking-wider">
              Anmelden
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Bottom background */}
      <ResponsiveSvgBackground width={360} height={201}>
        <g opacity="0.2">
          <path
            opacity="0.5"
            d="M98 0C37.2 0 -58.3333 16 -109 24V322H387V16C345.333 10.6667 158.8 0 98 0Z"
            fill="#DCB38E"
          />
          <path
            d="M51 58C-27.4 58 -84.6667 79.3333 -114 95V282H364V52C349.333 62.6667 265.2 81 230 81C186 81 149 58 51 58Z"
            fill="#94E1AE"
          />
          <path
            opacity="0.5"
            d="M108 89C29.6 89 -87.6667 110.333 -117 126V330H368C375.2 330 371 165.667 368 89C353.333 99.6667 288.2 111 253 111C209 111 206 89 108 89Z"
            fill="#197649"
          />
        </g>
      </ResponsiveSvgBackground>
    </>
  );
};

export default Home;
