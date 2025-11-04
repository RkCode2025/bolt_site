// src/components/SpotifyFloatingPlayer.tsx
import React, { useState, useEffect } from "react";
import { SpotifyEmbed, SpotifyWebPlayer } from "./SpotifyPlayer";
import { SpotifyLogin } from "./SpotifyLogin";
import { X, Music } from "lucide-react";

interface Props {}

export const SpotifyFloatingPlayer: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string>("");
  const [trackUri, setTrackUri] = useState<string>(
    "spotify:track:4uLU6hMCjMI75M1A2tKUQC"
  );

  // keep panel open when token changes (optional)
  useEffect(() => {
    if (token) setOpen(true);
  }, [token]);

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          fixed bottom-6 right-6 z-50
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-green-600 hover:bg-green-700
          text-white shadow-xl
          transition-all duration-300
          ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}
        `}
        aria-label="Open Spotify player"
      >
        <Music className="w-7 h-7" />
      </button>

      {/* Panel */}
      <div
        className={`
          fixed inset-0 z-40 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`
          fixed bottom-6 right-6 z-50
          w-96 bg-gray-900 rounded-xl shadow-2xl
          overflow-hidden transition-all duration-300
          ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-green-400" />
            Spotify Player
          </h3>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-gray-700 transition"
            aria-label="Close player"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Track input */}
          <input
            type="text"
            placeholder="spotify:track:ID"
            value={trackUri}
            onChange={(e) => setTrackUri(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Simple embed */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-400">Simple Embed</p>
            <SpotifyEmbed uri={trackUri} height={80} />
          </div>

          {/* Full player (requires login) */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-400">Full Player</p>
            {!token ? (
              <SpotifyLogin onToken={setToken} />
            ) : (
              <>
                <SpotifyWebPlayer accessToken={token} trackUri={trackUri} />
                <button
                  onClick={() => setToken("")}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
