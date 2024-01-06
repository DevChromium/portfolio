"use client";
import { SpotifyCard } from "./SpotifyCard";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

export function SpotifyInfo() {
  const { data, error, mutate } = useSWR("/api/spotify", (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        return data;
      })
  );

  const handleSongFinish = () => {
    mutate("/api/spotify", { revalidate: true });
  };

  if (error) {
    return (
      <div className="bg-rose-950/50 border border-rose-900/90 rounded-md text-center font-bold py-6 px-4">
        Error loading in Spotify Data
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-green-950/50 border border-green-900/90 rounded-md text-center font-bold py-6 px-4">
        Loading...
      </div>
    );
  }

  const currentSongData = data;

  if (!currentSongData.is_playing)
    return (
      <div className="bg-rose-950/50 border border-rose-900/90 rounded-md text-center font-bold py-6 px-4">
        Currently not playing a song on Spotify
      </div>
    );

  return (
    <>
      <h3 className="font-medium text-lg inline-flex gap-2 items-center">
        <Image
          priority
          src="/spotify.svg"
          alt="Spotify icon"
          width={30}
          height={30}
          className="text-white"
        />{" "}
        Listening to Spotify
      </h3>
      <SpotifyCard
        data={currentSongData.song}
        onSongFinish={handleSongFinish}
      />
    </>
  );
}
