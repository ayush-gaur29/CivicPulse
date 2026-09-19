import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Activity,
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertTriangle,
  Search,
  Filter,
  PlusCircle,
  Trash2,
  MapPin,
  Calendar,
  User,
  Mail,
  Maximize2,
  TrendingUp,
  FolderSync,
  RotateCcw,
  Eye,
  FileText,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useToast } from "../Components/ui/Toast";
import { useNotifications } from "../Context/NotificationContext";
import { canUpdateIssueStatus } from "../utils/auth";
import { StatusBadge, CategoryBadge } from "../Components/ui/Badge";
import Button from "../Components/ui/Button";
import Modal from "../Components/ui/Modal";
import EmptyState from "../Components/ui/EmptyState";

const CATEGORY_NAMES = {
  road: "Damaged Road",
  garbage: "Garbage Overflow",
  streetlight: "Streetlight Issue",
  water: "Water Supply",
  other: "Other Concern",
};

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issueToDelete, setIssueToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { resolvedTheme } = useTheme();
  const { showToast } = useToast();
  const { addNotification } = useNotifications();

  // Role check: determine if current user has administrative permissions
  const canEditStatus = canUpdateIssueStatus();

  // Set page title for SEO
  useEffect(() => {
    document.title = "Citizen Dashboard — CivicPulse";
  }, []);

  // Load issues from localStorage
  const loadIssues = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("issues")) || [];
      setIssues(stored);
    } catch {
      setIssues([]);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Update issue status (restricted to authorized administrators)
  const handleStatusChange = (id, newStatus) => {
    if (!canUpdateIssueStatus()) {
      showToast("Access Denied: Only authorized administrators can update issue status.", "error");
      return;
    }

    const updated = issues.map((issue) => {
      if (issue.id === id) {
        return { ...issue, status: newStatus };
      }
      return issue;
    });
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));

    const targetIssue = issues.find((i) => i.id === id);
    const locText = targetIssue?.location ? `at ${targetIssue.location}` : "";
    showToast(`Issue status updated to ${newStatus}`, "success");
    addNotification(
      "Status Updated",
      `Issue ${locText} marked as ${newStatus}.`,
      newStatus === "Resolved" ? "success" : "info"
    );

    // Update selectedIssue state if currently viewed
    if (selectedIssue && selectedIssue.id === id) {
      setSelectedIssue((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Delete issue
  const handleDeleteConfirm = () => {
    if (!issueToDelete) return;
    const updated = issues.filter((issue) => issue.id !== issueToDelete.id);
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
    showToast("Issue report deleted successfully", "info");

    if (selectedIssue && selectedIssue.id === issueToDelete.id) {
      setSelectedIssue(null);
    }
    setIssueToDelete(null);
  };

  // Calculations for Stat Cards
  const stats = useMemo(() => {
    const total = issues.length;
    const resolved = issues.filter((i) => i.status === "Resolved").length;
    const inProgress = issues.filter(
      (i) => i.status === "In Progress" || i.status === "inprogress"
    ).length;
    const pending = issues.filter(
      (i) => i.status === "Pending" || !i.status
    ).length;

    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return { total, resolved, inProgress, pending, resolutionRate };
  }, [issues]);

  // Data for Recharts Category Chart
  const chartData = useMemo(() => {
    const categoryCount = issues.reduce((acc, issue) => {
      const catKey = (issue.issueType || "other").toLowerCase();
      const displayName = CATEGORY_NAMES[catKey] || catKey.charAt(0).toUpperCase() + catKey.slice(1);
      acc[displayName] = (acc[displayName] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(categoryCount).map((cat) => ({
      category: cat,
      count: categoryCount[cat],
    }));
  }, [issues]);

  // Filtered & Sorted Issues
  const filteredIssues = useMemo(() => {
    return issues
      .filter((issue) => {
        // Search filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = (issue.name || "").toLowerCase().includes(q);
          const matchDesc = (issue.description || "").toLowerCase().includes(q);
          const matchLoc = (issue.location || "").toLowerCase().includes(q);
          const matchType = (issue.issueType || "").toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchType) return false;
        }

        // Status filter
        if (statusFilter !== "all") {
          const currentStatus = (issue.status || "Pending").toLowerCase();
          if (statusFilter.toLowerCase() !== currentStatus) return false;
        }

        // Category filter
        if (categoryFilter !== "all") {
          const currentCategory = (issue.issueType || "other").toLowerCase();
          if (categoryFilter.toLowerCase() !== currentCategory) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return (a.id || 0) - (b.id || 0);
        }
        // newest first (default)
        return (b.id || 0) - (a.id || 0);
      });
  }, [issues, searchTerm, statusFilter, categoryFilter, sortBy]);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      statusFilter !== "all" ||
      categoryFilter !== "all" ||
      sortBy !== "newest"
  );

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  // Recharts Chart Colors (Dark theme)
  const axisColor = "#94a3b8";
  const barColors = [
    "#3b82f6", // Blue
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
  ];

  return (
    <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Citizen Community Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
            Citizen Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Real-time monitoring of community reports, resolution metrics, and public infrastructure status.
          </p>
        </div>

        <Link to="/report" className="w-full sm:w-auto">
          <Button
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-md shadow-blue-500/25 min-h-[44px]"
          >
            Report New Issue
          </Button>
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Issues */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Reports
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
              {stats.total}
            </h3>
            <p className="text-[11px] text-cyan-400 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Community tracked</span>
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 text-cyan-400 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Resolved Issues */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Resolved Issues
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              {stats.resolved}
            </h3>
            <p className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{stats.resolutionRate}% resolution rate</span>
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* In Progress */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-1">
              {stats.inProgress}
            </h3>
            <p className="text-[11px] text-sky-400 mt-1 font-medium flex items-center gap-1">
              <PlayCircle className="w-3 h-3" />
              <span>Active municipal response</span>
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Pending */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Triage
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
              {stats.pending}
            </h3>
            <p className="text-[11px] text-amber-400 mt-1 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Awaiting review</span>
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Chart & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Bar Chart */}
        <div className="lg:col-span-8 p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Issues by Civic Category
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution of infrastructure reports across categories
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 w-fit">
              Live Data
            </span>
          </div>

          {chartData.length > 0 ? (
            <div className="w-full h-60 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <XAxis
                    dataKey="category"
                    stroke={axisColor}
                    fontSize={10}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke={axisColor}
                    fontSize={10}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                      color: "#f8fafc",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-60 sm:h-72 flex flex-col items-center justify-center text-center p-6">
              <FolderSync className="w-10 h-10 text-slate-500 mb-2" />
              <p className="text-sm font-semibold text-slate-300">
                No category data available yet
              </p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Submit civic issues using the report form to populate real-time analytics.
              </p>
            </div>
          )}
        </div>

        {/* Resolution Progress Summary */}
        <div className="lg:col-span-4 p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100 mb-1">
              Resolution Progress
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Overall status ratio of submitted reports
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Resolved ({stats.resolved})
                  </span>
                  <span className="text-slate-400">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-sky-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    In Progress ({stats.inProgress})
                  </span>
                  <span className="text-slate-400">
                    {stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Pending ({stats.pending})
                  </span>
                  <span className="text-slate-400">
                    {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
            💡 <strong>Tip:</strong> Click on any issue card to view complete report details, photo evidence, and status timeline.
          </div>
        </div>
      </div>

      {/* Interactive Controls: Search & Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports by location, description, reporter, or type..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-800/80 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer min-h-[40px]"
            >
              <option value="all">All Categories</option>
              <option value="road">Damaged Road</option>
              <option value="garbage">Garbage</option>
              <option value="streetlight">Streetlight</option>
              <option value="water">Water Supply</option>
              <option value="other">Other</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-initial px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer min-h-[40px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                icon={<RotateCcw className="w-3.5 h-3.5 text-slate-400" />}
                className="text-xs text-cyan-400 hover:text-cyan-300 min-h-[40px] px-2.5"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {[
            { id: "all", label: "All Statuses" },
            { id: "pending", label: "Pending" },
            { id: "in progress", label: "In Progress" },
            { id: "resolved", label: "Resolved" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition cursor-pointer min-h-[36px] flex items-center ${
                statusFilter === pill.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Issue Listing Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>Reported Civic Issues</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {filteredIssues.length}
            </span>
          </h2>
        </div>

        {filteredIssues.length === 0 ? (
          <EmptyState
            title="No matching civic issues found"
            description={
              hasActiveFilters
                ? "Try adjusting your search terms or filters to see more results."
                : "No issues have been reported in your area yet. Be the first to submit a report!"
            }
            action={
              hasActiveFilters ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearAllFilters}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Clear all filters
                </Button>
              ) : (
                <Link to="/report">
                  <Button size="sm" icon={<PlusCircle className="w-4 h-4" />}>
                    Submit a Report
                  </Button>
                </Link>
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="group flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-700 transition-all duration-200 overflow-hidden"
              >
                <div>
                  {/* Image Preview if available */}
                  {issue.imageUrl && (
                    <div className="relative h-44 w-full bg-slate-800 overflow-hidden group/img">
                      <img
                        src={issue.imageUrl}
                        alt="Issue photo"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedIssue(issue)}
                      />
                      <button
                        onClick={() => setSelectedImage(issue.imageUrl)}
                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 text-white backdrop-blur-xs hover:bg-slate-900 transition flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </button>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <CategoryBadge category={issue.issueType} size="sm" />
                      <StatusBadge status={issue.status} size="sm" />
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{issue.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {issue.description}
                    </p>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline pt-1 cursor-pointer min-h-[32px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Details & Timeline</span>
                    </button>
                  </div>
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="px-4 sm:px-5 py-3 bg-slate-800/40 border-t border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span className="truncate">{issue.createdAt}</span>
                    </div>
                    {issue.name && (
                      <div className="flex items-center gap-1 font-medium text-slate-300">
                        <User className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[120px]">{issue.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Admin Status Updater (if authorized) & Delete */}
                  <div className="flex items-center gap-2 shrink-0">
                    {canEditStatus && (
                      <select
                        value={issue.status || "Pending"}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                        className="px-2 py-1 text-[11px] font-semibold rounded-lg border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none cursor-pointer"
                        title="Update status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    )}

                    <button
                      onClick={() => setIssueToDelete(issue)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                      title="Delete issue"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Issue Details & Timeline Modal */}
      <Modal
        isOpen={Boolean(selectedIssue)}
        onClose={() => setSelectedIssue(null)}
        title="Civic Issue Details"
        maxWidth="max-w-2xl"
      >
        {selectedIssue && (
          <div className="space-y-6">
            {/* Header / Badges */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CategoryBadge category={selectedIssue.issueType} />
                <StatusBadge status={selectedIssue.status} />
              </div>
              {canEditStatus && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">
                    Update Status:
                  </span>
                  <select
                    value={selectedIssue.status || "Pending"}
                    onChange={(e) => handleStatusChange(selectedIssue.id, e.target.value)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-xl border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              )}
            </div>

            {/* Location & Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Location
                </span>
                <p className="font-medium text-slate-200 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{selectedIssue.location}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  Reported Date
                </span>
                <p className="font-medium text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedIssue.createdAt}</span>
                </p>
              </div>

              {selectedIssue.name && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Reporter Name
                  </span>
                  <p className="font-medium text-slate-200 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{selectedIssue.name}</span>
                  </p>
                </div>
              )}

              {selectedIssue.email && (
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Contact Email
                  </span>
                  <p className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>{selectedIssue.email}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Description of Issue</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {selectedIssue.description}
              </p>
            </div>

            {/* Status Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Status Lifecycle Timeline</span>
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 text-xs">
                {/* Step 1 */}
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
                  <p className="font-bold text-slate-200">
                    1. Report Submitted
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Logged on {selectedIssue.createdAt}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <span
                    className={`absolute -left-6 top-0.5 w-3 h-3 rounded-full ring-4 ring-slate-900 ${
                      selectedIssue.status === "In Progress" ||
                      selectedIssue.status === "Resolved"
                        ? "bg-sky-500"
                        : "bg-slate-700"
                    }`}
                  />
                  <p
                    className={`font-bold ${
                      selectedIssue.status === "In Progress" ||
                      selectedIssue.status === "Resolved"
                        ? "text-sky-400"
                        : "text-slate-400"
                    }`}
                  >
                    2. In Progress / Under Review
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {selectedIssue.status === "In Progress"
                      ? "Municipal response currently underway."
                      : selectedIssue.status === "Resolved"
                      ? "Inspection completed."
                      : "Awaiting field triage."}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <span
                    className={`absolute -left-6 top-0.5 w-3 h-3 rounded-full ring-4 ring-slate-900 ${
                      selectedIssue.status === "Resolved"
                        ? "bg-emerald-500"
                        : "bg-slate-700"
                    }`}
                  />
                  <p
                    className={`font-bold ${
                      selectedIssue.status === "Resolved"
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    3. Resolved & Closed
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {selectedIssue.status === "Resolved"
                      ? "The reported civic issue has been resolved."
                      : "Pending final resolution."}
                  </p>
                </div>
              </div>
            </div>

            {/* Evidence Image */}
            {selectedIssue.imageUrl && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Photo Evidence
                </h4>
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-800 max-h-64 flex items-center justify-center">
                  <img
                    src={selectedIssue.imageUrl}
                    alt="Issue Photo"
                    className="max-h-64 object-contain"
                  />
                  <button
                    onClick={() => setSelectedImage(selectedIssue.imageUrl)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 hover:bg-slate-900 transition cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end pt-4 border-t border-slate-800">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIssue(null)}
              >
                Close Details
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Image Zoom Modal */}
      <Modal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title="Issue Photo Evidence"
        maxWidth="max-w-2xl"
      >
        {selectedImage && (
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt="Full Issue Evidence"
              className="w-full max-h-[70vh] object-contain rounded-xl bg-black/30"
            />
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedImage(null)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(issueToDelete)}
        onClose={() => setIssueToDelete(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        {issueToDelete && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/50 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Are you sure you want to remove this report?
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  This report for <strong>{issueToDelete.location}</strong> will be permanently removed from the civic registry.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIssueToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete Report
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
