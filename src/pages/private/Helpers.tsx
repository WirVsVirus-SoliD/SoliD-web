import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import { User } from "react-feather";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

/*{
 "applyDate": "2020-04-10T18:30:49.66Z[UTC]",
 "contacted": false,
 "helper": {
 "account": {
 "accountId": 4,
 "email": "kontakt@bauernhof-mueller.de",
 "firstName": "Bauer",
 "lastName": "Müller",
 "phone": "07195 57413"
 },
 "driverLicense": true,
 "employmentStatus": "Student",
 "fullTime": true,
 "helperId": 1,
 "pickupRange": 10,
 "pickupRequired": true
 },
 "inquiryId": 1
 }*/

type Inquiry = {
  inquiryId: number;
  contacted: boolean;
  applyDate: string;
  helper: object;
};

const HelperCard = ({ data }) => {
  const helper = data.helper;
  return (
    <div className="flex flex-row h-20">
      <User />
      <p>
        {helper.account.firstName} {helper.account.lastName.substr(0, 1)}.
      </p>
    </div>
  );
};

const Helpers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get(api.providers.inquired);
      setData(result.data);
    })();
  }, []);
  return (
    <Container>
      {data.map((helper) => (
        <HelperCard key={helper.inquiryId} data={helper} />
      ))}
    </Container>
  );
};

export default Helpers;
