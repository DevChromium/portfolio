"use client";
import { SpotifyCard } from "./SpotifyCard";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

import {XCircle, Loader, VolumeX} from "lucide-react"

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
      <Alert>
        <AlertTitle className="flex gap-2 items-center"><XCircle /> Oh no!</AlertTitle>
        <AlertDescription>Something went wrong fetching the Spotify data.</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return <Alert>
    <AlertDescription className="flex gap-2 items-center"><Loader /> Loading...</AlertDescription>
  </Alert>
  }

  const currentSongData = data;

  if (!currentSongData.is_playing)
    return <Alert>
      <AlertTitle className="flex gap-2 items-center"><VolumeX /> It&apos;s quiet around here...</AlertTitle>
      <AlertDescription>I am currently not listening to Spotify</AlertDescription>
    </Alert>;

  return (
    <>
      <SpotifyCard
        data={currentSongData.song}
        onSongFinish={handleSongFinish}
      />
    </>
  );
}
