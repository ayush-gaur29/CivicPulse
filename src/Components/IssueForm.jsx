import React, { useState } from "react";
import { Send, MapPin, Camera } from "lucide-react";

const IssueForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    location: "",
    description: "",
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.issueType) {
      alert("⚠️ Please select a valid issue type.");
      return;
    }

    // Get existing issues from localStorage
    const existing = JSON.parse(localStorage.getItem("issues")) || [];

    // Create new issue object
    const newIssue = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      issueType: formData.issueType || "other",
      location: formData.location.trim(),
      description: formData.description.trim(),
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    // Save updated list
    localStorage.setItem("issues", JSON.stringify([...existing, newIssue]));

    alert("✅ Issue submitted successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      issueType: "",
      location: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-10 px-5 transition-colors duration-500">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="text-blue-600 dark:text-emerald-400" size={28} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Report a Local Issue
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Help improve your community by reporting local issues. Our civic
          authorities will review and act promptly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Ayush Gaur"
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g. ayush@example.com"
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-400"
              />
            </div>
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Type of Issue
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-400"
            >
              <option value="">Select an issue type</option>
              <option value="road">🚧 Damaged Road</option>
              <option value="garbage">🗑️ Garbage Overflow</option>
              <option value="streetlight">💡 Streetlight Issue</option>
              <option value="water">💧 Water Supply Problem</option>
              <option value="other">📋 Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. Sector 14, Gurgaon"
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Describe the issue briefly..."
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-emerald-400"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Upload Photo (optional)
            </label>
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer flex items-center space-x-2 text-blue-600 dark:text-emerald-400 hover:underline">
                <Camera size={20} />
                <span>Choose File</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {formData.image && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-emerald-500 text-white font-semibold w-full py-2.5 rounded-lg hover:bg-blue-700 dark:hover:bg-emerald-600 transition-all duration-300 shadow-md"
          >
            <Send size={18} />
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
