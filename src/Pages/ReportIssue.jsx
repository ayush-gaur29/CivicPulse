import React, { useEffect } from "react";
import IssueForm from "../Components/IssueForm";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

const ReportIssue = () => {
  useEffect(() => {
    document.title = "Report a Civic Issue — CivicPulse";
  }, []);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      {/* Breadcrumb / Title Area */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
          <span>Civic Action Portal</span>
          <span>•</span>
          <span>Issue Reporting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
          Submit a Public Infrastructure Issue
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
          Your report directly alerts local municipal authorities and helps your community prioritize critical repairs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Form Column */}
        <div className="lg:col-span-8">
          <IssueForm />
        </div>

        {/* Informational Sidebar Column */}
        <div className="lg:col-span-4 space-y-5 sm:space-y-6">
          {/* Guidelines Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4 text-slate-100 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Reporting Guidelines</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Be Specific:</strong> Provide nearby landmarks, cross streets, or building numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clear Photos:</strong> Capture the issue clearly in daylight to help field crews assess equipment needed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Describe Safety Risks:</strong> Mention if the issue poses an imminent threat to children or senior citizens.</span>
              </li>
            </ul>
          </div>

          {/* Action Workflow Timeline Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4 text-slate-100 font-bold text-base">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>What Happens Next?</span>
            </div>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 text-xs">
              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-slate-900" />
                <p className="font-semibold text-slate-200">1. Instant Triage</p>
                <p className="text-slate-400 mt-0.5">Your issue is indexed and assigned to the municipal department.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-900" />
                <p className="font-semibold text-slate-200">2. Field Verification</p>
                <p className="text-slate-400 mt-0.5">Local inspectors or automated monitoring inspect the location.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-900" />
                <p className="font-semibold text-slate-200">3. Resolution & Closure</p>
                <p className="text-slate-400 mt-0.5">Status updates to "Resolved" with completion notes on the dashboard.</p>
              </div>
            </div>
          </div>

          {/* Emergency Alert Box */}
          <div className="bg-rose-950/30 border border-rose-900/50 rounded-3xl p-6 text-xs text-rose-200">
            <div className="flex items-center gap-2 font-bold mb-2 text-rose-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Immediate Emergency?</span>
            </div>
            <p className="leading-relaxed mb-3">
              CivicPulse is designed for non-emergency public infrastructure repairs. If this is a life-threatening emergency, please dial civic emergency hotlines directly.
            </p>
            <div className="flex items-center gap-2 font-semibold text-rose-300">
              <PhoneCall className="w-4 h-4" />
              <span>Emergency Helpline: 112 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
