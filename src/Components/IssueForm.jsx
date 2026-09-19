import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  MapPin,
  Camera,
  User,
  Mail,
  FileText,
  AlertCircle,
  X,
  Crosshair,
  Loader2,
} from "lucide-react";
import { useToast } from "./ui/Toast";
import { useNotifications } from "../Context/NotificationContext";
import Button from "./ui/Button";

const ISSUE_TYPES = [
  { id: "road", label: "Damaged Road / Pothole", icon: "🚧", desc: "Cracks, potholes, asphalt damage" },
  { id: "garbage", label: "Garbage Overflow", icon: "🗑️", desc: "Uncollected trash, illegal dumping" },
  { id: "streetlight", label: "Streetlight Issue", icon: "💡", desc: "Non-functional or flickering lights" },
  { id: "water", label: "Water Supply Problem", icon: "💧", desc: "Pipeline burst, low pressure, contamination" },
  { id: "other", label: "Other Civic Concern", icon: "📋", desc: "Public property, parks, drainage" },
];

const IssueForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    location: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle standard input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image File Conversion to Base64 (so it persists across page reloads in localStorage)
  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file (PNG, JPG, JPEG, WEBP)", "error");
      return;
    }
    // Limit to 4MB
    if (file.size > 4 * 1024 * 1024) {
      showToast("Image size should be under 4MB", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Browser Geolocation Detector
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by your browser", "error");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formatted = `GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`;
        setFormData((prev) => ({
          ...prev,
          location: prev.location ? `${prev.location} (${formatted})` : formatted,
        }));
        setIsLocating(false);
        showToast("Location detected successfully!", "success");
      },
      (error) => {
        setIsLocating(false);
        let msg = "Could not retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission was denied. Please enter manually.";
        }
        showToast(msg, "warning");
      },
      { timeout: 10000 }
    );
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.issueType) {
      showToast("Please select the type of civic issue.", "warning");
      return;
    }

    if (!formData.location.trim()) {
      showToast("Please provide the issue location.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem("issues")) || [];

      const newIssue = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        issueType: formData.issueType || "other",
        location: formData.location.trim(),
        description: formData.description.trim(),
        status: "Pending",
        createdAt: new Date().toLocaleString(),
        imageUrl: formData.imagePreview || null,
      };

      localStorage.setItem("issues", JSON.stringify([newIssue, ...existing]));

      showToast("Issue submitted successfully! Authorities have been notified.", "success");
      addNotification(
        "Issue Submitted",
        `Your report for ${newIssue.location} has been successfully logged.`,
        "info"
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        issueType: "",
        location: "",
        description: "",
        image: null,
        imagePreview: null,
      });

      setIsSubmitting(false);

      // Optional smooth redirect to dashboard after brief delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch {
      setIsSubmitting(false);
      showToast("Failed to submit issue. Please try again.", "error");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-sm p-4 sm:p-7 md:p-10 text-slate-100">
      <div className="border-b border-slate-800 pb-5 sm:pb-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-cyan-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Report a Civic Issue
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Submit your report with precise location and photo evidence for swift civic action.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Citizen Contact */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>1. Reporter Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ayush Gaur"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-400/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. ayush@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-400/20 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Issue Type */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>2. Select Issue Category</span>
            </h3>
            <span className="text-xs text-rose-400 font-semibold">* Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ISSUE_TYPES.map((type) => {
              const isSelected = formData.issueType === type.id;
              return (
                <button
                  type="button"
                  key={type.id}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, issueType: type.id }))
                  }
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-950/20 ring-2 ring-cyan-400/20 shadow-xs"
                      : "border-slate-800 hover:border-slate-700 bg-slate-800/40"
                  }`}
                >
                  <span className="text-2xl shrink-0">{type.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        isSelected
                          ? "text-cyan-300"
                          : "text-slate-100"
                      }`}
                    >
                      {type.label}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {type.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Location */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>3. Location Details</span>
            </h3>
          </div>

          <div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sector 14, Main Market Road, Gurgaon"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-400/20 transition"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="shrink-0"
                icon={
                  isLocating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <Crosshair className="w-4 h-4 text-cyan-400" />
                  )
                }
              >
                <span className="hidden sm:inline">Use My GPS</span>
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Include landmark, street name, or nearby store for faster identification.
            </p>
          </div>
        </div>

        {/* Section 4: Description */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            <span>4. Detailed Description</span>
          </h3>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Describe the issue in detail (e.g. depth of pothole, duration of problem, hazard risk to pedestrians)..."
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-cyan-400 focus:ring-cyan-400/20 transition"
            />
          </div>
        </div>

        {/* Section 5: Photo Upload */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" />
            <span>5. Photo Evidence (Optional but Recommended)</span>
          </h3>

          {!formData.imagePreview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
                dragActive
                  ? "border-cyan-400 bg-blue-950/30"
                  : "border-slate-700 hover:border-slate-600 bg-slate-800/30"
              }`}
            >
              <input
                type="file"
                id="photo-upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-xs text-cyan-400">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Click to upload <span className="text-slate-400 font-normal">or drag & drop</span>
                </div>
                <p className="text-xs text-slate-400">
                  PNG, JPG, or WEBP up to 4MB
                </p>
              </label>
            </div>
          ) : (
            <div className="relative rounded-2xl border border-slate-700 overflow-hidden bg-slate-800 p-2 flex items-center gap-4">
              <img
                src={formData.imagePreview}
                alt="Upload preview"
                className="w-20 h-20 object-cover rounded-xl border border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {formData.image?.name || "Uploaded Photo"}
                </p>
                <p className="text-[11px] text-slate-400">
                  Photo ready for submission
                </p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/50 transition mr-2 cursor-pointer"
                title="Remove photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full shadow-md shadow-blue-500/25"
            icon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? "Submitting Issue..." : "Submit Civic Issue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
