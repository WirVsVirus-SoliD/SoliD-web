import CircularProgress from "@material-ui/core/CircularProgress";
import * as queryString from "querystring";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { confirmEmail } from "~/actions/user";

const EmailConfirmation = ({ location }) => {
  const [state, setState] = useState({
    loading: true,
    success: false,
    error: false
  });
  const dispatch = useDispatch();
  const { push } = useHistory();
  const urlParams = queryString.parse(location && location.search);
  const token = urlParams["?token"];
  const providerId = urlParams["providerId"];

  useEffect(() => {
    (async () => {
      dispatch(confirmEmail(token))
        // @ts-ignore
        .then((response) => {
          setState((state) => ({ ...state, success: true, loading: false }));
          setTimeout(() => {
            push(`/providers/${providerId}/confirmHelp`);
          }, 2000);
        })
        .catch((error) => {
          setState((state) => ({ ...state, loading: false, error: true }));
        });
    })();
  }, [dispatch, providerId, push, token]);

  return (
    <div className="mt-4 mx-auto my-auto text-center">
      {state.loading && (
        <>
          <p className="mb-4">Ihr Account wird bestätigt</p>
          <CircularProgress />
        </>
      )}
      {state.success && (
        <div className="text-green-500">
          Ihr Account wurde erfolgreich bestätigt, Sie werden weitergeleitet...
        </div>
      )}
      {state.error && (
        <div className="text-red-500">
          <p>Ein Fehler ist aufgetreten.</p>
          <p>Ihr Account konnte nicht bestätigt werden.</p>
        </div>
      )}
    </div>
  );
};

export default EmailConfirmation;
