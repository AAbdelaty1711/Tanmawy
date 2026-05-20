"use client";

import React, { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from "lucide-react";

export interface PostCardProps {
  id: number;
  author: string;
  handle?: string;
  role?: string;
  time: string;
  content: string;
  category?: string;
  categoryColor?: string;
  likes: number;
  comments: number;
  reposts?: number;
  avatarUrl?: string;
  /** Optional gradient stops for the fallback avatar */
  avatarGradient?: string;
}

/** Formats numbers like Twitter: 1.2K, 42, etc. */
function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n > 0 ? String(n) : "";
}

function Avatar({
  name,
  url,
  gradient = "from-primary/20 to-secondary/20",
}: {
  name: string;
  url?: string;
  gradient?: string;
}) {
  const initial = name.charAt(0);
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-border"
      />
    );
  }
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient}
        flex items-center justify-center shrink-0 ring-1 ring-border`}
    >
      <span className="text-[13px] font-bold text-foreground">{initial}</span>
    </div>
  );
}

/** Twitter-style action button: icon + count, circular hover bg */
function ActionBtn({
  icon: Icon,
  count,
  activeColor,
  activeFill,
  active,
  onClick,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  count?: string;
  activeColor: string;    // e.g. "text-rose-500 hover:text-rose-500"
  activeFill?: string;    // e.g. "fill-rose-500"
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group flex items-center gap-1.5 transition-colors
        ${active ? activeColor : `text-muted-fg ${activeColor.replace(/text-/, "hover:text-")}`}
      `}
    >
      {/* Circle hover bg — exactly like Twitter */}
      <span
        className={`
          flex items-center justify-center w-8 h-8 rounded-full
          transition-colors duration-150
          ${active
            ? activeColor.replace(/text-/, "bg-").replace("500", "500/10")
            : "group-hover:" + activeColor.replace(/text-/, "bg-").replace("500", "500/10")}
        `}
      >
        <Icon
          className={`w-[17px] h-[17px] ${active && activeFill ? activeFill : ""}`}
          strokeWidth={active ? 2.5 : 2}
        />
      </span>
      {count && (
        <span className="text-[13px] tabular-nums -ml-0.5">{count}</span>
      )}
    </button>
  );
}

export default function PostCard({
  author,
  handle,
  role,
  time,
  content,
  category,
  categoryColor = "bg-emerald-500/10 text-emerald-700",
  likes: initialLikes,
  comments: initialComments,
  reposts: initialReposts = 0,
  avatarUrl,
  avatarGradient,
}: PostCardProps) {
  const [liked,    setLiked]    = useState(false);
  const [likes,    setLikes]    = useState(initialLikes);
  const [reposted, setReposted] = useState(false);
  const [reposts,  setReposts]  = useState(initialReposts);

  return (
    <article
      className="flex gap-3 px-4 pt-3 pb-2.5 border-b border-border
        hover:bg-slate-50/70 transition-colors duration-100 cursor-pointer"
    >
      {/* ── Avatar (right in RTL) ──── */}
      <Avatar name={author} url={avatarUrl} gradient={avatarGradient} />

      {/* ── Body ─────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Row 1: Name · handle · time · more */}
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0 text-right">
            <span className="text-[15px] font-bold text-foreground leading-tight truncate">
              {author}
            </span>
            {role && (
              <span className="text-[11px] text-slate-400 font-normal shrink-0 select-none">· {role}</span>
            )}
            <span className="text-[13px] text-muted-fg shrink-0">· {time}</span>
          </div>
          {/* More button */}
          <button
            className="shrink-0 flex items-center justify-center w-8 h-8 -mt-0.5
              rounded-full text-muted-fg hover:bg-primary/10 hover:text-primary
              transition-colors opacity-0 group-hover:opacity-100"
            aria-label="المزيد"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Category pill */}
        {category && (
          <span
            className={`inline-block text-[11px] font-semibold px-2.5 py-0.5
              rounded-full mb-2 tracking-wide ${categoryColor}`}
          >
            {category}
          </span>
        )}

        {/* Row 2: Content */}
        <p className="text-[15px] text-foreground leading-[1.6] mb-3 text-right">
          {content}
        </p>

        {/* Row 3: Actions */}
        <div className="flex items-center justify-between max-w-[340px]">
          <ActionBtn
            icon={MessageCircle}
            count={fmt(initialComments)}
            activeColor="text-primary"
            label="تعليق"
          />
          <ActionBtn
            icon={Repeat2}
            count={fmt(reposts)}
            activeColor="text-emerald-600"
            active={reposted}
            onClick={(e) => {
              e.stopPropagation();
              setReposted((p) => !p);
              setReposts((p) => p + (reposted ? -1 : 1));
            }}
            label="إعادة نشر"
          />
          <ActionBtn
            icon={Heart}
            count={fmt(likes)}
            activeColor="text-rose-500"
            activeFill="fill-rose-500"
            active={liked}
            onClick={(e) => {
              e.stopPropagation();
              setLiked((p) => !p);
              setLikes((p) => p + (liked ? -1 : 1));
            }}
            label="إعجاب"
          />
          <ActionBtn
            icon={Share}
            activeColor="text-secondary"
            label="مشاركة"
          />
        </div>
      </div>
    </article>
  );
}
