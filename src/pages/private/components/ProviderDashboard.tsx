import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import { User } from "react-feather";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import momentInstance from "~/lib/momentInstance";

const HelperCard = ({ data }) => {
  const helper = data.helper;
  return (
    <div className="flex flex-row h-20">
      <User width={70} height={70} />
      <div className="pl-2">
        <p>
          {helper.account.firstName} {helper.account.lastName.substr(0, 1)}.
        </p>
        <div className="rounded bg-grey text-white p-1">
          {momentInstance(data.applyDate).format("L")}
        </div>
      </div>
    </div>
  );
};

const ProviderDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get(api.inquiries.collection);
      setData(result.data);
    })();
  }, []);
  return (
    <Container>
      <Title as="h2" className="text-2xl pt-6 mb-2">
        Meine Anfragen
      </Title>
      {data.map((helper) => (
        <HelperCard key={helper.inquiryId} data={helper} />
      ))}
    </Container>
  );
};

export default ProviderDashboard;
