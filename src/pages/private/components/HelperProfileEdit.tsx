import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import classnames from "classnames";
import { Formik } from "formik";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useDispatch } from "react-redux";
import { object as yupObject, string as yupString } from "yup";
import { updateHelper } from "~/actions/user";
import { AvatarUpload } from "~/components/AvatarUpload";
import { PrimaryButton } from "~/components/Button";
import BaseButton from "~/components/Button/BaseButton";
import { FallbackImage } from "~/components/FallbackImage";
import { FormTitle, InputField } from "~/components/Form";
import { Checkbox, Radio } from "~/components/Form/components";
import { Title } from "~/components/Title";
import api from "~/lib/api";

const validationSchema = yupObject().shape({
  account: yupObject().shape({
    firstName: yupString().required("Pflichtfeld"),
    lastName: yupString().required("Pflichtfeld"),
    phone: yupString().required("Pflichtfeld")
  }),
  employmentStatus: yupString().required("Pflichtfeld")
});

const HelperProfileEdit = ({ data, setEditMode }: any) => {
  const dispatch = useDispatch();
  const [avatarMode, setAvatarMode] = useState(false);
  delete data.account.accountId;
  delete data.account.email;
  delete data.helperId;

  if (avatarMode)
    return (
      <div>
        <div className="flex flex-row items-center mb-6">
          <button
            className="rounded-full bg-white-primary p-2"
            onClick={() => setAvatarMode(false)}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <AvatarUpload aspectRatio={1} close={() => setAvatarMode(false)} />
      </div>
    );

  return (
    <div className="mx-4 pt-8">
      <button
        className="rounded-full bg-white-primary p-2"
        onClick={() => setEditMode(false)}
      >
        <ArrowLeft size={20} />
      </button>
      <div className="mb-5">
        <Title as="h1" className="text-2xl mb-6" bold>
          Profil bearbeiten
        </Title>
      </div>
      <Formik
        initialValues={data}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={(input) => {
          // @ts-ignore
          dispatch(updateHelper(input)).then((response) => {
            setEditMode(false);
          });
        }}
      >
        {({
          setFieldValue,
          values,
          handleSubmit,
          validateField,
          errors
        }: any) => (
          <div>
            <div className="flex flex-row justify-between">
              <div>
                {[
                  ["account.firstName", "Vorname"],
                  ["account.lastName", "Nachname"]
                ].map(([key, label, type = "text"]) => (
                  <InputField
                    key={key}
                    name={key}
                    type={type}
                    label={label}
                    className="mb-4"
                    block
                    onChange={(e) => setFieldValue(key, e.currentTarget.value)}
                    onBlur={() => validateField(key)}
                  />
                ))}
              </div>
              <div className="relative">
                <FallbackImage
                  src={api.media.downloadPicture(data.account.accountId)}
                  width={32}
                  height={32}
                >
                  <Avatar className="w-32 h-32" />
                </FallbackImage>
                <BaseButton
                  className="absolute bottom-0 right-0"
                  onClick={() => setAvatarMode(true)}
                >
                  <PhotoCameraIcon />
                </BaseButton>
              </div>
            </div>
            {[["account.phone", "Telefonnummer"]].map(
              ([key, label, type = "text"]) => (
                <InputField
                  key={key}
                  name={key}
                  type={type}
                  label={label}
                  className="mb-4"
                  block
                  onChange={(e) => setFieldValue(key, e.currentTarget.value)}
                  onBlur={() => validateField(key)}
                />
              )
            )}
            <div className="mb-2">
              <FormTitle as="h2" className="mb-2">
                Du bist
              </FormTitle>
              <div>
                {[
                  ["Schüler*in", "Schüler*in"],
                  ["Student*in", "Student*in"],
                  ["Arbeitslos", "Arbeitslos"],
                  ["Beschäftigt", "Beschäftigt"]
                ].map(([label, value], i) => {
                  const checked = value === values.employmentStatus;

                  return (
                    <Radio
                      key={i}
                      checked={checked}
                      onChange={() => setFieldValue("employmentStatus", value)}
                      block
                    >
                      {label}
                    </Radio>
                  );
                })}
                {errors.employmentStatus && (
                  <div className="text-red-500">{errors.employmentStatus}</div>
                )}
                <div className="mb-6">
                  <FormTitle as="h2" className="mb-2">
                    Du suchst etwas für
                  </FormTitle>
                  <div>
                    <Checkbox
                      className="mb-2"
                      checked={values.fullTime === true}
                      onChange={() =>
                        setFieldValue("fullTime", !values.fullTime)
                      }
                      block
                    >
                      Vollzeit
                    </Checkbox>
                    <Checkbox
                      checked={values.partTime === true}
                      onChange={() =>
                        setFieldValue("partTime", !values.partTime)
                      }
                      block
                    >
                      Teilzeit
                    </Checkbox>
                  </div>
                </div>
                <div className="mb-6">
                  <FormTitle as="h2" className="mb-2">
                    Für die Anreise bist du
                  </FormTitle>
                  <div>
                    <Radio
                      className="mb-2"
                      checked={values.pickupRequired === false}
                      onChange={() => setFieldValue("pickupRequired", false)}
                      block
                    >
                      Eigenständig
                    </Radio>
                    <Radio
                      checked={values.pickupRequired === true}
                      onChange={() => setFieldValue("pickupRequired", true)}
                      block
                    >
                      Auf Abholung angewiesen
                    </Radio>
                  </div>
                </div>
                <div className="mb-8">
                  <FormTitle as="h2" className="mb-2">
                    Hast du einen Führerschein?
                  </FormTitle>
                  <div className="flex">
                    {[
                      ["Ja", true],
                      ["Nein", false]
                    ].map(([label, value], i) => {
                      const checked = value === values.driverLicense;

                      return (
                        <label
                          key={i}
                          onClick={() => setFieldValue("driverLicense", value)}
                          className={classnames(
                            "flex-grow border-2 border-r-0 last:border-r-2 first:rounded-l-full last:rounded-r-full border-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium",
                            {
                              "bg-brand text-white": checked,
                              "text-brand": !checked
                            }
                          )}
                        >
                          <input
                            type="radio"
                            className="input--hidden"
                            checked={checked}
                            readOnly
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>
                {values.driverLicense && (
                  <div className="mb-8">
                    <FormTitle as="h2" className="mb-2">
                      Wärst du bereit, ggf. Fahrertätigkeiten durchzuführen?
                    </FormTitle>
                    <div className="flex">
                      {[
                        ["Ja", true],
                        ["Nein", false]
                      ].map(([label, value], i) => {
                        const checked = value === values.driverActivity;

                        return (
                          <label
                            key={i}
                            onClick={() =>
                              setFieldValue("driverActivity", value)
                            }
                            className={classnames(
                              "flex-grow border-2 border-r-0 last:border-r-2 first:rounded-l-full last:rounded-r-full border-brand text-sm py-1 px-2 first:pl-4 last:pr-4 font-medium",
                              {
                                "bg-brand text-white": checked,
                                "text-brand": !checked
                              }
                            )}
                          >
                            <input
                              type="radio"
                              className="input--hidden"
                              checked={checked}
                              readOnly
                            />
                            {label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
                <PrimaryButton className="w-full mb-20" onClick={handleSubmit}>
                  <Title as="h6">Übernehmen</Title>
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default HelperProfileEdit;
