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
  ChevronDown,
  Maximize2,
  TrendingUp,
  FolderSync,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { useToast } from "../Components/ui/Toast";
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
  const [issueToDelete, setIssueToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { resolvedTheme } = useTheme();
  const { showToast } = useToast();

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

  // Update issue status
  const handleStatusChange = (id, newStatus) => {
    const updated = issues.map((issue) => {
      if (issue.id === id) {
        return { ...issue, status: newStatus };
      }
      return issue;
    });
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
    showToast(`Issue status updated to ${newStatus}`, "success");
  };

  // Delete issue
  const handleDeleteConfirm = () => {
    if (!issueToDelete) return;
    const updated = issues.filter((issue) => issue.id !== issueToDelete.id);
    setIssues(updated);
    localStorage.setItem("issues", JSON.stringify(updated));
    showToast("Issue report deleted successfully", "info");
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

  // Recharts Chart Colors based on theme
  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const barColors = [
    "#3b82f6", // Blue
    "#06b6d4", // Cyan
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Civic Intelligence & Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Civic Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time monitoring of community reports, resolution metrics, and neighborhood infrastructure status.
          </p>
        </div>

        <Link to="/report">
          <Button
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            className="shadow-md shadow-blue-500/25"
          >
            Report New Issue
          </Button>
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Issues */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Reports
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {stats.total}
            </h3>
            <p className="text-[11px] text-blue-600 dark:text-cyan-400 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Community tracked</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Resolved Issues */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Resolved Issues
            </p>
            <h3 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {stats.resolved}
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{stats.resolutionRate}% resolution rate</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">
              {stats.inProgress}
            </h3>
            <p className="text-[11px] text-sky-600 dark:text-sky-400 mt-1 font-medium flex items-center gap-1">
              <PlayCircle className="w-3 h-3" />
              <span>Active municipal crews</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <PlayCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Triage
            </p>
            <h3 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {stats.pending}
            </h3>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Awaiting authority review</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Issues by Civic Category
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Distribution of infrastructure reports across categories
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Live Data
            </span>
          </div>

          {chartData.length > 0 ? (
            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis
                    dataKey="category"
                    stroke={axisColor}
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke={axisColor}
                    fontSize={11}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#0f172a" : "#ffffff",
                      borderColor: isDark ? "#334155" : "#e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      color: isDark ? "#f8fafc" : "#0f172a",
                      fontSize: "12px",
                    }}
                    cursor={{ fill: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)" }}
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
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <FolderSync className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No category data available yet
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                Submit civic issues using the report form to populate real-time analytics.
              </p>
            </div>
          )}
        </div>

        {/* Resolution Progress Summary */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Resolution Progress
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Overall status ratio of submitted tickets
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Resolved ({stats.resolved})
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
                  <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    In Progress ({stats.inProgress})
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Pending ({stats.pending})
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            💡 <strong>Pro-tip:</strong> Change an issue's status to <em>In Progress</em> or <em>Resolved</em> using the status selector on each card.
          </div>
        </div>
      </div>

      {/* Interactive Controls: Search & Filters */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports by location, description, reporter, or type..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-cyan-400"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
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
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
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
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === pill.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
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
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Reported Civic Issues</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {filteredIssues.length}
            </span>
          </h2>
        </div>

        {filteredIssues.length === 0 ? (
          <EmptyState
            title="No matching civic issues found"
            description={
              searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search terms or filters to see more results."
                : "No issues have been reported in your area yet. Be the first to submit a report!"
            }
            action={
              <Link to="/report">
                <Button size="sm" icon={<PlusCircle className="w-4 h-4" />}>
                  Submit a Report
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 overflow-hidden"
              >
                <div>
                  {/* Image Preview if available */}
                  {issue.imageUrl && (
                    <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden group/img">
                      <img
                        src={issue.imageUrl}
                        alt="Issue photo"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => setSelectedImage(issue.imageUrl)}
                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 text-white backdrop-blur-xs hover:bg-slate-900 transition flex items-center gap-1 text-[11px] font-medium"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </button>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <CategoryBadge category={issue.issueType} size="sm" />
                      <StatusBadge status={issue.status} size="sm" />
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{issue.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {issue.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{issue.createdAt}</span>
                    </div>
                    {issue.name && (
                      <div className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                        <User className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">{issue.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Status Updater Dropdown & Delete */}
                  <div className="flex items-center gap-2">
                    <select
                      value={issue.status || "Pending"}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      className="px-2 py-1 text-[11px] font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
                      title="Update status"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => setIssueToDelete(issue)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
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
              className="w-full max-h-[70vh] object-contain rounded-xl bg-black/5"
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
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Are you sure you want to remove this report?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This report for <strong>{issueToDelete.location}</strong> will be permanently removed from the civic registry.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
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
