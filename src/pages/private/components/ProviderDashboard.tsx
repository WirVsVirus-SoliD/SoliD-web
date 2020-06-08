import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import MailIcon from "@material-ui/icons/Mail";
import React, { useEffect } from "react";
import { User } from "react-feather";
import { useDispatch } from "react-redux";
import { deleteInquiry, getInquiries } from "~/actions/inquiries";
import { FallbackImage } from "~/components/FallbackImage";
import TeaIcon from "~/components/Icon/TeaIcon";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import momentInstance from "~/lib/momentInstance";
import { useTypedSelector } from "~/reducers";

const HelperCard = ({ data }) => {
  const helper = data.helper;
  const dispatch = useDispatch();

  if (helper === null)
    return (
      <div className="flex flex-col shadow-xl rounded p-2 mb-4 bg-gray-50">
        <CloseIcon
          className="ml-auto mr-2"
          onClick={() => {
            // @ts-ignore
            dispatch(deleteInquiry(data.inquiryId)).then((response) => {
              dispatch(getInquiries());
            });
          }}
        />
        Dieser Helfer hat seine Anfrage zurückgezogen.
      </div>
    );

  return (
    <div className="flex flex-row shadow-xl rounded p-2 mb-4">
      <div className="flex flex-col">
        <FallbackImage
          src={api.media.downloadPicture(helper.account.accountId)}
          width={70}
          height={70}
        >
          <User width={70} height={70} />
        </FallbackImage>
      </div>
      <div className="flex flex-col pl-2 pr-2  w-full">
        <div className="mb-2">
          <Title as="h4">
            {helper.account.firstName} {helper.account.lastName.substr(0, 1)}.
          </Title>
          <p>{helper.employmentStatus}</p>
          <p>Angefragt am: {momentInstance(data.applyDate).format("L")}</p>
        </div>
        <div className="mb-4">
          <p>E-Mail</p>
          <div className="flex flex-row justify-between ">
            <p>{helper.account.email}</p>
            <a href={`mailto:${helper.account.email}`}>
              <MailIcon className="text-brand w-8 h-8" />
            </a>
          </div>
        </div>
        <div className="mb-4">
          <p>Handynummer</p>
          <div className="flex flex-row justify-between">
            <a href={`tel:${helper.account.phone}`}>{helper.account.phone}</a>
            <a href={`tel:${helper.account.phone}`}>
              <LocalPhoneIcon className="text-brand w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center text-center mt-40">
      <TeaIcon />
      <Title as="h2" className="mt-10 font-bold text-xl">
        Abwarten und Tee trinken
      </Title>
      <p className="mx-10 mt-4">
        Wir geben dir Bescheid, wenn Helfer*innen bei dir arbeiten möchten.
      </p>
    </div>
  );
};

const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const inquiries = useTypedSelector((state) => state.get("inquiries"));

  useEffect(() => {
    dispatch(getInquiries());
  }, []);

  if (inquiries.get("loading"))
    return (
      <div className="h-full w-full mt-64 text-center">
        <CircularProgress />
      </div>
    );

  return (
    <Container>
      <Title as="h2" className="text-2xl pt-6 mb-2">
        Meine Anfragen
      </Title>
      {inquiries.get("items")?.map((helper) => (
        <HelperCard key={helper.inquiryId} data={helper} />
      ))}
      {inquiries.get("items")?.length === 0 && <EmptyState />}
      <div className="h-20" />
    </Container>
  );
};

export default ProviderDashboard;
