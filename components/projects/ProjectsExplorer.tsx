"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Maximize2,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { projectsList, type ProjectStatus, type ProjectItem } from "@/data/projects-list";
import { buildWhatsAppUrl } from "@/lib/links";

/**
 * Interactive Projects Explorer Component
 * Features two prominent buttons: "Ongoing Projects" and "Completed Projects"
 * in the exact signature brand green and warm ivory theme styling.
 */
export function ProjectsExplorer() {
  const [activeTab, setActiveTab] = useState<ProjectStatus>("ongoing");

  const ongoingProjects = projectsList.filter((p) => p.status === "ongoing");
  const completedProjects = projectsList.filter((p) => p.status === "completed");

  const displayedProjects = activeTab === "ongoing" ? ongoingProjects : completedProjects;

  return (
    <div className="flex flex-col gap-10">
      {/* =========================================================
          COMPACT & UNIQUE ARCHITECTURAL SWITCHER: ONGOING & COMPLETED
         ========================================================= */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-white border border-brand-line shadow-soft">
          {/* Button 1: Ongoing Projects */}
          <button
            type="button"
            onClick={() => setActiveTab("ongoing")}
            className={`group inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "ongoing"
                ? "bg-gradient-to-r from-[#153D16] via-[#245e1a] to-brand-primary text-white shadow-sm shadow-brand-primary/30"
                : "text-brand-muted hover:text-brand-dark hover:bg-brand-soft/70"
            }`}
          >
            <span className="relative flex size-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  activeTab === "ongoing" ? "animate-ping bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span
                className={`relative inline-flex size-2 rounded-full ${
                  activeTab === "ongoing" ? "bg-emerald-400" : "bg-amber-500"
                }`}
              />
            </span>
            <span>Ongoing Projects</span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "ongoing"
                  ? "bg-black/25 text-emerald-300 border border-white/10"
                  : "bg-brand-soft text-brand-dark/70 border border-brand-line/60"
              }`}
            >
              {ongoingProjects.length}
            </span>
          </button>

          {/* Button 2: Completed Projects */}
          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`group inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-[#153D16] via-[#245e1a] to-brand-primary text-white shadow-sm shadow-brand-primary/30"
                : "text-brand-muted hover:text-brand-dark hover:bg-brand-soft/70"
            }`}
          >
            <CheckCircle2
              className={`size-3.5 ${activeTab === "completed" ? "text-emerald-300" : "text-brand-primary"}`}
            />
            <span>Completed Projects</span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "completed"
                  ? "bg-black/25 text-emerald-300 border border-white/10"
                  : "bg-brand-soft text-brand-dark/70 border border-brand-line/60"
              }`}
            >
              {completedProjects.length}
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================
          PROJECT CARDS GRID: CONSTX OVERLAPPING FLOATING STYLE
         ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
        {displayedProjects.map((project) => {
          const isOngoing = project.status === "ongoing";
          const whatsappMsg = `Hello SKI Construction, I saw your ${project.status} project "${project.title}" in ${project.location} and would like to know more details.`;
          const enquiryUrl = buildWhatsAppUrl(whatsappMsg);

          return (
            <div
              key={project.id}
              className="group flex flex-col transition-all duration-300"
            >
              {/* 1. Upper Rounded Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-3xl bg-brand-soft border border-brand-line/70 shadow-sm">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.location} by SKI Construction`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none"
                />

                {/* Live Status Badge Top Right */}
                <div
                  className={`absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-bold backdrop-blur-xs shadow-xs ${
                    isOngoing
                      ? "bg-amber-500 text-white"
                      : "bg-brand-primary text-white"
                  }`}
                >
                  {isOngoing ? (
                    <>
                      <span className="inline-block size-2 rounded-full bg-white animate-pulse" />
                      <span>ONGOING</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-3 text-white" />
                      <span>COMPLETED</span>
                    </>
                  )}
                </div>

                {/* Location & Built-Up Area at Bottom of Photo */}
                <div className="absolute bottom-12 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold drop-shadow-md">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-emerald-300 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </span>
                  <span className="font-mono text-emerald-200 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10 shrink-0">
                    {project.area}
                  </span>
                </div>
              </div>

              {/* 2. Floating Overlapping White Card (Signature Constx Layout) */}
              <div className="-mt-9 mx-3 sm:mx-4 relative z-10 flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 shadow-card border border-brand-line/80 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:border-brand-primary/50">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-2 mt-2">
                    {project.description}
                  </p>

                  {/* Highlights Pill Strip */}
                  <div className="flex flex-wrap gap-1.5 my-3.5 pt-3 border-t border-brand-line/60">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-brand-dark bg-brand-soft px-2.5 py-1 rounded-lg border border-brand-line/80"
                      >
                        <CheckCircle2 className="size-3 text-brand-primary shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action Button with Arrow box */}
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn mt-1 flex items-center justify-between rounded-xl bg-brand-soft hover:bg-brand-primary text-brand-dark hover:text-white border border-brand-line/80 px-4 py-2.5 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                    <WhatsAppIcon className="size-4 text-brand-primary group-hover/btn:text-white transition-colors" />
                    <span>Enquire on WhatsApp</span>
                  </div>
                  <span className="flex size-7 items-center justify-center rounded-lg bg-white group-hover/btn:bg-white/20 text-brand-primary group-hover/btn:text-white shadow-xs transition-all duration-200">
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

