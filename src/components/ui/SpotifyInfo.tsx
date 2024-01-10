"use client";
import { SpotifyCard } from "./SpotifyCard";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { Alert } from "../core/Alert";

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
    return <Alert intent="danger" text="Error loading in Spotify Data..." />;
  }

  if (!data) {
    return <Alert intent="info" text="Loading..."/>
  }

  const currentSongData = data;

  if (!currentSongData.is_playing)
    return <Alert intent="primary" text="Currently not listening to Spotify" />;

  return (
    <>
      <SpotifyCard
        data={currentSongData.song}
        onSongFinish={handleSongFinish}
      />
    </>
  );
}
