import React from "react";
import IssueForm from "../Components/IssueForm";

const ReportIssue = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <IssueForm />
      </div>
    </div>
  );
};

export default ReportIssue;
