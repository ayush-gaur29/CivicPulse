import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("issues")) || [];
    setIssues(stored);
  }, []);

  // Prepare data for category chart
  const categoryCount = issues.reduce((acc, issue) => {
    const cat = issue.issueType || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCount).map((key) => ({
    category: key,
    count: categoryCount[key],
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Dashboard Overview</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-center">
          <h2 className="text-lg font-semibold">Total Issues</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-emerald-400">
            {issues.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-center">
          <h2 className="text-lg font-semibold">Resolved</h2>
          <p className="text-3xl font-bold text-green-600">
            {issues.filter((i) => i.status === "Resolved").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {issues.filter((i) => i.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
           Issues by Category
        </h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No issues reported yet.</p>
        )}
      </div>

      {/* Recent Reports Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">📝 Recent Reports</h2>

        {issues.length === 0 ? (
          <p className="text-center text-gray-500">No reports submitted yet.</p>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-lg">
                  {issue.issueType.charAt(0).toUpperCase() + issue.issueType.slice(1)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📍 {issue.location}
                </p>
                <p className="mt-1">{issue.description}</p>
                <p className="text-xs mt-2 text-gray-500">🕒 {issue.createdAt}</p>

                {/* Image Preview */}
                {issue.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={issue.imageUrl}
                      alt="Uploaded Issue"
                      className="w-40 h-40 object-cover rounded-lg cursor-pointer border border-gray-300 dark:border-gray-700"
                      onClick={() => setSelectedImage(issue.imageUrl)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Issue"
            className="max-w-3xl max-h-[80vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
