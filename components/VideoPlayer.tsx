"use client";

import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const videoEl = document.createElement("video");
    videoEl.className = "video-js vjs-big-play-centered vjs-fluid";
    containerRef.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      controls: true,
      responsive: true,
      fluid: true,
      preload: "metadata",
      poster,
      sources: [{ src, type: "video/mp4" }],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div
      className="relative aspect-video bg-navy-900 rounded-md overflow-hidden"
      aria-label="Video player"
      role="region"
    >
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
