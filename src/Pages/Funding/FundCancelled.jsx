import React from "react";
import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";

const FundCancelled = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-30">
      <div className="max-w-md w-full bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-200">
        {/* Warning/Cancel Header */}
        <div className="bg-error/10 py-10 flex flex-col items-center justify-center text-error">
          <div className="bg-error text-white p-4 rounded-full shadow-lg mb-4">
            <FaTimesCircle size={48} />
          </div>
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>
          <p className="text-error/80 font-medium text-center px-4">
            The transaction was not completed.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 text-center">
          <div className="flex items-center gap-2 justify-center text-warning mb-4">
            <FaExclamationTriangle />
            <span className="text-sm font-semibold uppercase tracking-wide">
              No charges were made
            </span>
          </div>

          <p className="text-base-content/70 mb-8">
            It looks like you cancelled the payment process. If you encountered
            an issue or would like to change your contribution amount, you can
            try again below.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Link
              to="/funding"
              className="btn btn-primary w-full shadow-md text-white"
            >
              Try Again
            </Link>

            <Link
              to="/"
              className="btn btn-ghost w-full flex items-center gap-2"
            >
              <FaArrowLeft size={14} /> Back to Homepage
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-base-200/50 p-4 text-center border-t border-base-200">
          <p className="text-xs text-base-content/50">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="link link-primary no-underline hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCancelled;
