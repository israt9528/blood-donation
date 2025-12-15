import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const FundSuccessful = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post(`fund-successful?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return <div>successfully give fund</div>;
};

export default FundSuccessful;
