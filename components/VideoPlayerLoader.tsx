"use client";

import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-navy-900 rounded-md flex items-center justify-center">
      <p className="text-caption text-muted">Loading video player…</p>
    </div>
  ),
});

export default VideoPlayer;
