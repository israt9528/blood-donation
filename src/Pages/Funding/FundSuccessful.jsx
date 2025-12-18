import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom"; // Added Link for navigation
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaArrowLeft, FaReceipt } from "react-icons/fa";

const FundSuccessful = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post(`fund-successful?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-30">
      <div className="max-w-md w-full bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        {/* Success Header */}
        <div className="bg-success/10 py-10 flex flex-col items-center justify-center text-success">
          <div className="bg-success text-white p-4 rounded-full shadow-lg mb-4 animate-bounce">
            <FaCheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-success/80 font-medium">
            Thank you for your support
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 text-center">
          <p className="text-base-content/70 mb-6">
            Your generous contribution has been received and processed. A
            receipt has been sent to your email address.
          </p>

          {/* Session Info Card */}
          <div className="bg-base-200/50 rounded-xl p-4 mb-8 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-base-100 rounded-lg">
                <FaReceipt className="text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold opacity-50">
                  Session ID
                </p>
                <p className="text-sm font-mono truncate w-40 sm:w-56">
                  {sessionId || "Processing..."}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/funding" className="btn btn-primary w-full shadow-md">
              View Funding History
            </Link>
            <Link
              to="/"
              className="btn btn-ghost w-full flex items-center gap-2"
            >
              <FaArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="h-2 bg-gradient-to-r from-success via-primary to-secondary"></div>
      </div>
    </div>
  );
};

export default FundSuccessful;
