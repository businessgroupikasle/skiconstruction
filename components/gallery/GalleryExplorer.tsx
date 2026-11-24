"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  Film,
  Folder,
  FolderOpen,
  MapPin,
  Play,
  Video,
  X,
} from "lucide-react";
import type { GalleryItem, GalleryVideo } from "@/data/gallery";
import { projectFolders, type ProjectFolder, type ProjectMediaFile } from "@/data/projectFolders";

type MediaView = "folders" | "videos";

const views: readonly { id: MediaView; label: string; icon: LucideIcon }[] = [
  { id: "folders", label: "Project Folders", icon: Folder },
  { id: "videos", label: "Video Gallery", icon: Video },
];

interface GalleryExplorerProps {
  items?: readonly GalleryItem[];
  videos?: readonly GalleryVideo[];
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function GalleryExplorer({ items, videos = [] }: GalleryExplorerProps) {
  const searchParams = useSearchParams();
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => (typeof window !== "undefined" ? window.location.hash : ""),
    () => "",
  );
  const [chosenView, setChosenView] = useState<MediaView | null>(null);

  // Sync with URL parameters or hash
  const urlView = searchParams?.get("view") || searchParams?.get("tab");
  const isVideoFromUrl =
    urlView === "videos" ||
    urlView === "video" ||
    hash.toLowerCase() === "#project-videos" ||
    hash.toLowerCase() === "#video-gallery" ||
    hash.toLowerCase() === "#videos";

  const view: MediaView = chosenView ?? (isVideoFromUrl ? "videos" : "folders");

  useEffect(() => {
    const handleUrlState = () => {
      const h = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const v = params.get("view") || params.get("tab");
      if (
        v === "videos" ||
        v === "video" ||
        h === "#project-videos" ||
        h === "#video-gallery" ||
        h === "#videos"
      ) {
        setChosenView("videos");
      } else if (v === "folders" || h === "#folders" || h === "#project-folders") {
        setChosenView("folders");
      }
    };
    handleUrlState();
    window.addEventListener("hashchange", handleUrlState);
    window.addEventListener("popstate", handleUrlState);
    return () => {
      window.removeEventListener("hashchange", handleUrlState);
      window.removeEventListener("popstate", handleUrlState);
    };
  }, []);

  // Active folder selection state
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [openSubFolder, setOpenSubFolder] = useState<"photos" | "videos" | null>(null);
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(24);
  const [visibleVideosCount, setVisibleVideosCount] = useState(12);
  const [folderMediaFilter, setFolderMediaFilter] = useState<"all" | "photos" | "videos">("all");

  // Video modal player state
  const [activeVideoModal, setActiveVideoModal] = useState<{
    src: string;
    title: string;
    poster?: string;
  } | null>(null);

  const activeFolder = useMemo(
    () => projectFolders.find((f) => f.id === activeFolderId),
    [activeFolderId],
  );

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* ========================================================================= */}
      {/* 1. Main View Navigation Switch (Folders | Photos | Videos)               */}
      {/* ========================================================================= */}
      <nav aria-label="Gallery views" className="flex justify-center">
        <div
          role="group"
          aria-label="Choose gallery view"
          className="inline-flex flex-wrap justify-center gap-1.5 rounded-full border border-brand-line bg-white p-1.5 shadow-soft"
        >
          {views.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setChosenView(id);
                  setActiveFolderId(null);
                  setOpenSubFolder(null);
                  if (typeof window !== "undefined") {
                    const newHash = id === "videos" ? "#video-gallery" : "#folders";
                    window.history.replaceState(null, "", `/gallery?view=${id}${newHash}`);
                  }
                }}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 sm:px-7 ${
                  active
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-brand-dark hover:bg-brand-soft hover:text-brand-primary"
                }`}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. PROJECT FOLDERS VIEW (Authentic OS Folder / Album System)              */}
      {/* ========================================================================= */}
      {view === "folders" && (
        <section aria-label="Project Folders">
          {/* A. If a folder is opened: Show 2 Dedicated Sub-Folders (Images & Videos) */}
          {activeFolder ? (
            <div className="flex flex-col gap-8">
              {/* Folder Breadcrumb & Back Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-3">
                  {openSubFolder ? (
                    <button
                      type="button"
                      onClick={() => setOpenSubFolder(null)}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-xs sm:text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="size-4" />
                      Back to {activeFolder.name} Folders
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFolderId(null);
                        setOpenSubFolder(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-xs sm:text-sm font-bold text-brand-dark transition-colors hover:bg-brand-primary hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="size-4" />
                      Back to All Project Folders
                    </button>
                  )}

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-brand-muted">
                    <span>Project Folders</span>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={() => setOpenSubFolder(null)}
                      className={`cursor-pointer hover:underline ${
                        openSubFolder ? "text-brand-muted" : "text-brand-dark font-bold"
                      }`}
                    >
                      {activeFolder.name}
                    </button>
                    {openSubFolder && (
                      <>
                        <span>/</span>
                        <span className="text-brand-dark font-bold">
                          {openSubFolder === "photos" ? "Site Photographs" : "Site Videos"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-brand-primary px-3 py-1 border border-brand-primary/20">
                    <Camera className="size-3.5" />
                    {activeFolder.photos.length} Photos
                  </span>
                  {activeFolder.videos.length > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 px-3 py-1 border border-amber-300">
                      <Film className="size-3.5" />
                      {activeFolder.videos.length} Videos
                    </span>
                  )}
                </div>
              </div>

              {/* Folder Details Banner */}
              <div className="flex flex-col gap-2 rounded-2xl bg-white border border-brand-line/70 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
                  <MapPin className="size-3.5 text-brand-primary" />
                  <span>{activeFolder.location} • {activeFolder.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                  {activeFolder.name}
                </h2>
                <p className="text-sm text-brand-muted">
                  {openSubFolder === "photos"
                    ? "Viewing high-resolution site photographs. Click any photo to view in high resolution."
                    : openSubFolder === "videos"
                    ? "Viewing live site progress recordings. Click any video to play with audio."
                    : "This project archive contains 2 media folders (Images & Videos). Click a folder below to explore its contents."}
                </p>
              </div>

              {/* ================================================================= */}
              {/* LEVEL 2: TWO SUB-FOLDERS (IMAGES & VIDEOS)                        */}
              {/* ================================================================= */}
              {!openSubFolder && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 max-w-4xl mx-auto w-full">
                  {/* SUB-FOLDER 1: IMAGES / PHOTOS FOLDER */}
                  <div
                    onClick={() => setOpenSubFolder("photos")}
                    className="group relative flex flex-col cursor-pointer transition-all duration-300"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-2 translate-x-1.5 rounded-3xl bg-brand-soft/80 border border-brand-line/70 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-1 pointer-events-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-1 -translate-x-1 rounded-3xl bg-neutral-100 border border-brand-line/50 transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-1 pointer-events-none"
                    />

                    <div className="relative flex flex-col rounded-3xl bg-white border border-brand-line shadow-soft transition-all duration-300 group-hover:border-brand-primary/50 group-hover:shadow-card overflow-hidden z-10">
                      {/* Tab Header */}
                      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-brand-line/60 bg-gradient-to-b from-[#faf8f5] to-white">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-brand-primary text-white text-xs font-mono font-bold shadow-xs">
                            <Folder className="size-4" />
                          </span>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-dark">
                            FOLDER · IMAGES
                          </span>
                        </div>
                        <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
                          {activeFolder.photos.length} Photos
                        </span>
                      </div>

                      {/* Folder Cover */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={activeFolder.photos[0]?.src || activeFolder.coverPhoto}
                          alt={`${activeFolder.name} photos folder`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white text-brand-dark px-4 py-2 text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <FolderOpen className="size-4 text-brand-primary" />
                            <span>Open Images Folder</span>
                          </span>
                        </div>
                        <div className="absolute bottom-3 inset-x-4">
                          <h3 className="text-lg font-bold text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                            Site Construction Photographs
                          </h3>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-5 bg-white border-t border-brand-line/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-brand-muted font-medium">
                          <Camera className="size-4 text-brand-primary" />
                          <span>{activeFolder.photos.length} High-Resolution Files</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary group-hover:translate-x-1 transition-transform">
                          Open Folder →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SUB-FOLDER 2: VIDEOS FOLDER */}
                  <div
                    onClick={() => setOpenSubFolder("videos")}
                    className="group relative flex flex-col cursor-pointer transition-all duration-300"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-2 translate-x-1.5 rounded-3xl bg-amber-500/10 border border-amber-500/20 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-1 pointer-events-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-1 -translate-x-1 rounded-3xl bg-neutral-100 border border-brand-line/50 transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-1 pointer-events-none"
                    />

                    <div className="relative flex flex-col rounded-3xl bg-white border border-brand-line shadow-soft transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-card overflow-hidden z-10">
                      {/* Tab Header */}
                      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-brand-line/60 bg-gradient-to-b from-[#fdfbf7] to-white">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-white text-xs font-mono font-bold shadow-xs">
                            <Film className="size-4" />
                          </span>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-dark">
                            FOLDER · VIDEOS
                          </span>
                        </div>
                        <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-700">
                          {activeFolder.videos.length} Videos
                        </span>
                      </div>

                      {/* Folder Cover */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={activeFolder.videos[0]?.poster || activeFolder.coverPhoto}
                          alt={`${activeFolder.name} videos folder`}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex size-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400">
                            <Play className="ml-0.5 size-6 fill-current" />
                          </span>
                        </div>
                        <div className="absolute bottom-3 inset-x-4">
                          <h3 className="text-lg font-bold text-white drop-shadow-md group-hover:text-amber-300 transition-colors">
                            Site Progress Videos
                          </h3>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-5 bg-white border-t border-brand-line/60 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-brand-muted font-medium">
                          <Film className="size-4 text-amber-600" />
                          <span>{activeFolder.videos.length} Live Progress Recordings</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
                          Open Folder →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* LEVEL 3A: INSIDE IMAGES FOLDER                                    */}
              {/* ================================================================= */}
              {openSubFolder === "photos" && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-line/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Camera className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-brand-dark">Site Construction Photographs</h3>
                        <p className="text-xs text-brand-muted">Click any photo to view in high resolution.</p>
                      </div>
                    </div>
                    {activeFolder.videos.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setOpenSubFolder("videos")}
                        className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        <Film className="size-3.5" />
                        <span>Switch to Videos Folder ({activeFolder.videos.length}) →</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {activeFolder.photos.slice(0, visiblePhotosCount).map((photo, idx) => (
                      <div
                        key={`photo-${idx}`}
                        onClick={() =>
                          setActiveVideoModal({
                            src: photo.src,
                            title: `${activeFolder.name} - Site Photo ${idx + 1}`,
                          })
                        }
                        className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-900 border border-brand-line/70 shadow-soft cursor-pointer hover:border-brand-primary/60 hover:shadow-card transition-all duration-300"
                      >
                        <Image
                          src={photo.src}
                          alt={`${activeFolder.name} photo`}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[0.68rem] font-bold text-white uppercase border border-white/20">
                          <Camera className="size-3 text-brand-accent" />
                          <span>Photo #{idx + 1}</span>
                        </div>
                        <div className="absolute bottom-3 inset-x-3 text-white text-xs font-semibold truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {photo.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeFolder.photos.length > visiblePhotosCount && (
                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={() => setVisiblePhotosCount((prev) => prev + 24)}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-7 py-3 text-xs sm:text-sm font-bold text-brand-dark shadow-xs hover:border-brand-primary hover:text-brand-primary cursor-pointer transition-colors"
                      >
                        <Camera className="size-4 text-brand-primary" />
                        <span>Load More Photos ({activeFolder.photos.length - visiblePhotosCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ================================================================= */}
              {/* LEVEL 3B: INSIDE VIDEOS FOLDER                                    */}
              {/* ================================================================= */}
              {openSubFolder === "videos" && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-line/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                        <Film className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-brand-dark">Site Progress Videos</h3>
                        <p className="text-xs text-brand-muted">Click any video to play the full on-site recording with audio.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenSubFolder("photos")}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-brand-primary hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <Camera className="size-3.5" />
                      <span>Switch to Images Folder ({activeFolder.photos.length}) →</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {activeFolder.videos.slice(0, visibleVideosCount).map((vid, idx) => (
                      <div
                        key={`vid-${idx}`}
                        onClick={() =>
                          setActiveVideoModal({
                            src: vid.src,
                            title: `${activeFolder.name} - Site Video ${idx + 1}`,
                            poster: vid.poster,
                          })
                        }
                        className="group relative aspect-16/10 overflow-hidden rounded-2xl bg-neutral-900 border border-brand-line/70 shadow-soft cursor-pointer hover:border-amber-400 hover:shadow-card transition-all duration-300"
                      >
                        <Image
                          src={vid.poster || activeFolder.coverPhoto}
                          alt={`${activeFolder.name} video`}
                          fill
                          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex size-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-xl transition-all duration-300 group-hover:scale-115 group-hover:bg-amber-400">
                            <Play className="ml-0.5 size-6 fill-current" />
                          </span>
                        </div>
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[0.7rem] font-bold text-amber-300 uppercase border border-amber-500/30">
                          <Film className="size-3" />
                          <span>Video #{idx + 1}</span>
                        </div>
                        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-bold">
                          <span className="truncate pr-2">{vid.name}</span>
                          <span className="shrink-0 text-[0.7rem] text-amber-300 group-hover:underline">Play ▶</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeFolder.videos.length > visibleVideosCount && (
                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={() => setVisibleVideosCount((prev) => prev + 12)}
                        className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-7 py-3 text-xs sm:text-sm font-bold text-amber-900 shadow-xs hover:bg-amber-100 cursor-pointer transition-colors"
                      >
                        <Film className="size-4 text-amber-600" />
                        <span>Load More Videos ({activeFolder.videos.length - visibleVideosCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* B. Root: Display All Project Folders */
            <div className="flex flex-col gap-8">
              {/* Folders Overview Title */}
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold tracking-[0.22em] text-brand-primary uppercase mb-2">
                  SITE ARCHIVES &amp; ALBUMS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark">
                  Explore Project Folders
                </h2>
                <p className="mt-2 text-sm text-brand-muted">
                  Click any project folder to view authentic on-site construction photos and structural progress videos.
                </p>
              </div>

              {/* Folders Grid: Tactile Architectural Dossier & Multi-Media Stack Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
                {projectFolders.map((folder, idx) => (
                  <div
                    key={folder.id}
                    onClick={() => setActiveFolderId(folder.id)}
                    className="group relative flex flex-col cursor-pointer transition-all duration-300"
                  >
                    {/* Layer 1: Stacked Background Card with Subtle Tilt (Physical Folder / Album Depth) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-2 translate-x-1.5 rounded-3xl bg-brand-soft/80 border border-brand-line/70 transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-3 group-hover:rotate-1 pointer-events-none"
                    />
                    {/* Layer 2: Second Offset Paper Sheet Behind */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-1 -translate-x-1 rounded-3xl bg-neutral-100 border border-brand-line/50 transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-1 pointer-events-none"
                    />

                    {/* Main Physical Project Dossier Card */}
                    <div className="relative flex flex-col rounded-3xl bg-white border border-brand-line shadow-soft transition-all duration-300 group-hover:border-brand-primary/50 group-hover:shadow-card overflow-hidden z-10">
                      
                      {/* Physical Tab Header with File Number, Category & Location */}
                      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-brand-line/60 bg-gradient-to-b from-[#faf8f5] to-white">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white text-xs font-mono font-bold shadow-xs">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[0.68rem] font-mono uppercase tracking-wider font-bold text-brand-muted truncate">
                              {folder.category}
                            </span>
                            <span className="text-xs font-semibold text-brand-dark flex items-center gap-1">
                              <MapPin className="size-3 shrink-0 text-brand-accent" />
                              <span className="truncate">{folder.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Direct Media Count Badges */}
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft border border-brand-line/80 px-2.5 py-1 text-[0.68rem] font-bold text-brand-primary">
                            <Camera className="size-3" />
                            <span>{folder.photosCount}</span>
                          </span>
                          {folder.videosCount > 0 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[0.68rem] font-bold text-amber-700">
                              <Film className="size-3" />
                              <span>{folder.videosCount}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cover Photo with Realistic Shadow and Smooth Hover Reveal */}
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={folder.coverPhoto}
                          alt={folder.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Hover Overlay: Interactive Folder Open Prompt */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white text-brand-dark px-4 py-2 text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <FolderOpen className="size-4 text-brand-primary" />
                            <span>Open Project Archive</span>
                          </span>
                        </div>

                        {/* Title Overlay on Cover */}
                        <div className="absolute bottom-3 inset-x-4">
                          <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md line-clamp-1 group-hover:text-emerald-300 transition-colors">
                            {folder.name}
                          </h3>
                        </div>
                      </div>

                      {/* Mini Preview Strip: Real Photos & Videos from Inside This Folder */}
                      <div className="p-4 bg-white border-t border-brand-line/60">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[0.68rem] font-mono uppercase tracking-wider font-semibold text-brand-muted">
                            Included Media Preview
                          </span>
                          <span className="text-[0.72rem] font-bold text-brand-primary group-hover:underline">
                            View all {folder.photosCount + folder.videosCount} files →
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          {/* Thumb 1 (Photo 1) */}
                          {folder.photos[1] ? (
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 border border-brand-line/70">
                              <Image
                                src={folder.photos[1].src}
                                alt={`${folder.name} preview 1`}
                                fill
                                sizes="120px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-4/3 rounded-xl bg-brand-soft/50 border border-dashed border-brand-line/60" />
                          )}

                          {/* Thumb 2 (Photo 2) */}
                          {folder.photos[2] ? (
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 border border-brand-line/70">
                              <Image
                                src={folder.photos[2].src}
                                alt={`${folder.name} preview 2`}
                                fill
                                sizes="120px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-4/3 rounded-xl bg-brand-soft/50 border border-dashed border-brand-line/60" />
                          )}

                          {/* Thumb 3: Video thumbnail with play badge or Photo 3 */}
                          {folder.videos[0] ? (
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-900 border border-amber-500/40">
                              <Image
                                src={folder.videos[0].poster || folder.coverPhoto}
                                alt={`${folder.name} video preview`}
                                fill
                                sizes="120px"
                                className="object-cover opacity-85"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <span className="flex size-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                                  <Play className="ml-0.5 size-3 fill-current" />
                                </span>
                              </div>
                              <span className="absolute bottom-1 right-1 rounded bg-black/85 px-1 py-0.2 text-[0.6rem] font-mono font-bold text-amber-300">
                                VIDEO
                              </span>
                            </div>
                          ) : folder.photos[3] ? (
                            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 border border-brand-line/70">
                              <Image
                                src={folder.photos[3].src}
                                alt={`${folder.name} preview 3`}
                                fill
                                sizes="120px"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="aspect-4/3 rounded-xl bg-brand-soft/50 border border-dashed border-brand-line/60" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. ALL PROJECT VIDEOS VIEW                                                */}
      {/* ========================================================================= */}
      {view === "videos" && (
        <section
          id="project-videos"
          aria-labelledby="project-videos-heading"
          className="scroll-mt-28 flex flex-col gap-10"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden="true" className="hidden h-px w-20 bg-brand-accent sm:block" />
            <h2 id="project-videos-heading" className="text-2xl font-extrabold text-brand-dark sm:text-3xl">
              Project <span className="text-brand-primary">Videos</span>
            </h2>
            <span aria-hidden="true" className="hidden h-px w-20 bg-brand-accent sm:block" />
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full min-w-0">
            {videos.map((vid) => (
              <li key={vid.id} className="w-full min-w-0">
                <div
                  onClick={() =>
                    setActiveVideoModal({
                      src: vid.src,
                      title: vid.title,
                      poster: vid.poster,
                    })
                  }
                  className="group flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-line/80 bg-white text-left shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer"
                >
                  <span className="relative block aspect-video w-full overflow-hidden bg-brand-dark">
                    <Image
                      src={vid.poster}
                      alt={vid.title}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-xl transition-transform duration-300 group-hover:scale-115">
                        <Play className="ml-0.5 size-6 fill-current" />
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-brand-ink min-w-0 w-full">
                    <Film aria-hidden="true" className="size-4 shrink-0 text-brand-primary" />
                    <span className="min-w-0 flex-1 line-clamp-2 leading-snug break-words">{vid.title}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. In-Place Video Player / Photo Viewer Modal                             */}
      {/* ========================================================================= */}
      {activeVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-neutral-950 border border-brand-line/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-5 py-3.5 text-white gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveVideoModal(null);
                  setChosenView("videos");
                }}
                aria-label="Back to Video Gallery"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 border border-white/10 hover:border-emerald-400/50"
              >
                <ArrowLeft className="size-4 text-emerald-400" />
                <span>Back</span>
              </button>
              <h3 className="text-xs sm:text-base font-bold text-white truncate max-w-lg text-center flex-1">
                {activeVideoModal.title}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setActiveVideoModal(null);
                  setChosenView("videos");
                }}
                aria-label="Close"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            {/\.(mp4|webm|mov|m4v|ogg)$/i.test(activeVideoModal.src) ? (
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideoModal(null);
                    setChosenView("videos");
                  }}
                  aria-label="Back to Video Gallery"
                  className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white px-3 py-1.5 text-xs font-bold backdrop-blur-md border border-white/25 shadow-lg transition-all cursor-pointer hover:scale-105"
                >
                  <ArrowLeft className="size-3.5 text-emerald-400" />
                  <span>Back to Video Gallery</span>
                </button>
                <video
                  src={activeVideoModal.src}
                  poster={activeVideoModal.poster}
                  controls
                  autoPlay
                  playsInline
                  className="size-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="relative flex max-h-[82vh] w-full items-center justify-center bg-black/50 p-2 sm:p-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideoModal(null);
                    setChosenView("videos");
                  }}
                  aria-label="Back to Gallery"
                  className="absolute top-4 left-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white px-3 py-1.5 text-xs font-bold backdrop-blur-md border border-white/25 shadow-lg transition-all cursor-pointer hover:scale-105"
                >
                  <ArrowLeft className="size-3.5 text-emerald-400" />
                  <span>Back to Gallery</span>
                </button>
                <img
                  src={activeVideoModal.src}
                  alt={activeVideoModal.title}
                  className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/10 px-4 sm:px-5 py-3 bg-neutral-900/80">
              <button
                type="button"
                onClick={() => {
                  setActiveVideoModal(null);
                  setChosenView("videos");
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4 text-emerald-400" />
                <span>Back to Video Gallery</span>
              </button>
              <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">SKI Construction Verified Site Video</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
