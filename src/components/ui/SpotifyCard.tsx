"use client"

import { msToTime } from "@/lib/converters";
import { SpotifyResponse } from "@/types/Spotify";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";

interface SpotifyCardProps {
  data: SpotifyResponse;
}

export const SpotifyCard = ({ data }: SpotifyCardProps) => {
  const albumCover = data.item.album.images[0].url;
  const artists = data.item.artists;

  const [progress, setProgress] = useState(
    (data.progress_ms / data.item.duration_ms) * 100
  );

 useEffect(() => {
   const interval = setInterval(() => {
     setProgress((prevProgress) => {
       const newProgress = prevProgress + 100 / (data.item.duration_ms / 1000);
       return newProgress > 100 ? 100 : newProgress;
     });
   }, 1000);
   return () => clearInterval(interval);
 }, [data.item.duration_ms]);

 const progressMs = (progress / 100) * data.item.duration_ms;


  return (
    <div
      style={{ backgroundImage: `url(${albumCover})` }}
      className="bg-center rounded-md"
    >
      <div className="bg-black/65 backdrop-filter backdrop-blur-md border border-gray-950/95 rounded-md p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
        <Image
          src={albumCover}
          alt={`Cover of album: ${data.item.album.name}`}
          width={100}
          height={100}
          className="rounded-md h-auto aspect-square"
        />
        <div className="w-full space-y-4">
          <section>
            <p className="text-md font-bold">{data.item.name}</p>
            <p className="text-sm">
              by{" "}
              {artists.map((artist, index) => (
                <a
                  href={artist.external_urls.spotify}
                  key={index}
                  target="_blank"
                >
                  {index ? ", " : ""}
                  <span className="hover:underline">{artist.name}</span>
                </a>
              ))}
            </p>
            <p className="text-sm">
              on{" "}
              <a
                href={data.item.album.external_urls.spotify}
                target="_blank"
                className="hover:underline"
              >
                {data.item.album.name}
              </a>
            </p>
          </section>
          <section className="flex flex-col">
            <ProgressBar value={progress} className="bg-green-400" />
            <div className="inline-flex justify-between">
              <p className="text-sm">{msToTime(progressMs)}</p>
              <p className="text-sm">{msToTime(data.item.duration_ms)}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
