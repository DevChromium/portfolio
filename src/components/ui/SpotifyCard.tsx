"use client"

import { msToTime } from "@/lib/converters";
import { SongData } from "@/types/Spotify";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";

interface SpotifyCardProps {
  data: SongData;
}

export const SpotifyCard = ({ data }: SpotifyCardProps) => {

  const [progress, setProgress] = useState(
    (data.progress_ms / data.duration_ms) * 100
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 100 / (data.duration_ms / 1000);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [data.duration_ms]);

  const progressMs = (progress / 100) * data.duration_ms;


  return (
    <div
      style={{ backgroundImage: `url(${data.albumImageUrl})` }}
      className="bg-center rounded-md"
    >
      <div className="bg-black/65 backdrop-filter backdrop-blur-md border border-gray-950/95 rounded-md p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
        <Image
          src={data.albumImageUrl}
          alt={`Cover of album: ${data.album}`}
          width={100}
          height={100}
          className="rounded-md h-auto aspect-square"
        />
        <div className="w-full space-y-4">
          <section>
            <p className="text-md font-bold">{data.song}</p>
            <p className="text-sm">
              {data.artists}
            </p>
            <p className="text-sm">
              on{" "}
              <a
                href={data.albumUrl}
                target="_blank"
                className="hover:underline"
              >
                {data.album}
              </a>
            </p>
          </section>
          <section className="flex flex-col">
            <ProgressBar value={progress} className="bg-green-400" />
            <div className="inline-flex justify-between">
              <p className="text-sm">{msToTime(progressMs)}</p>
              <p className="text-sm">{msToTime(data.duration_ms)}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
