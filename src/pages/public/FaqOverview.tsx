import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteHelper, deleteProvider, logOut } from "~/actions/user";
import { DangerButton, PrimaryButton } from "~/components/Button";
import LinkList from "~/components/LinkList/LinkList";
import { Title } from "~/components/Title";
import { useTypedSelector } from "~/reducers";

const FaqOverview = () => {
  const specificFaqs = [
    {
      title: "Für Helfer*innen",
      link: "/faq/farmer"
    },
    {
      title: "Für Landwirt*innen",
      link: "/faq/helper"
    }
  ];
  const user = useTypedSelector((state) => state.get("user"));
  const [confirmMode, setConfirmMode] = useState(false);
  const dispatch = useDispatch();
  const isProvider = user.get("type") === "provider";
  const deleteAccount = isProvider ? deleteProvider : deleteHelper;

  if (confirmMode)
    return (
      <div className="flex flex-col items-center h-full">
        <p className="text-red-500 mt-64">
          Soll der Account wirklich gelöscht werden?
        </p>
        <p className="mb-10 text-red-500">
          Dies kann nicht rückgängig gemacht werden!
        </p>
        <DangerButton
          className="mb-5"
          onClick={() => {
            // @ts-ignore
            dispatch(deleteAccount()).then((response) => {
              dispatch(logOut());
            });
          }}
        >
          LÖSCHEN
        </DangerButton>
        <PrimaryButton onClick={() => setConfirmMode(false)}>
          Abbrechen
        </PrimaryButton>
      </div>
    );

  return (
    <div className="flex flex-col py-4 items-center px-8 h-full">
      <Title as="h1" className="w-full md:text-center text-xl mb-12">
        Fragen und Antworten
      </Title>
      <div className="w-full block mb-10">
        <LinkList links={specificFaqs} />
      </div>
      {user.get("login") && (
        <>
          <div className="w-full block mb-5">
            <PrimaryButton
              className="w-full mt-auto"
              onClick={() => dispatch(logOut())}
            >
              <Title as="h6">Ausloggen</Title>
            </PrimaryButton>
          </div>
          <div className="w-full block">
            <DangerButton
              className="w-full mb-20"
              onClick={() => setConfirmMode(true)}
            >
              <div className="flex flex-row items-center justify-center">
                <DeleteForeverIcon className="mr-2" />
                <Title as="h6">Profil löschen</Title>
              </div>
            </DangerButton>
          </div>
        </>
      )}
      <div className="absolute bottom-0 left-0 mb-20 w-full px-8 block object-bottom">
        <Link to="/credits">
          <PrimaryButton block theme="border">
            Credits
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default FaqOverview;
