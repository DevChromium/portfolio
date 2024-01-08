"use client";
import { msToTime } from "@/lib/converters";
import { SpotifyResponse } from "@/types/Spotify";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";

interface SpotifyCardProps {
  data: SpotifyResponse;
  onSongFinish: () => void;
}

export const SpotifyCard = ({ data, onSongFinish }: SpotifyCardProps) => {
  const [songData, setSongData] = useState(data);
  const [songProgress, setSongProgress] = useState(songData.progress);
  const [isFinished, setIsFinished] = useState(
    songProgress === songData.duration
  );

  const albumCover = songData.album.cover;
  const artists = songData.artists;

  useEffect(() => {
    let interval: any;
    if (!isFinished) {
      interval = setInterval(() => {
        setSongProgress((prevProgress) => {
          const newProgress = prevProgress + 2000;
          if (newProgress >= songData.duration) {
            setIsFinished(true); // Mark as finished when progress reaches duration
            onSongFinish()
            return songData.duration;
          }
          return newProgress;
        });
      }, 2000);
    }

    return () => clearInterval(interval); // Clean up the interval on unmount or finish
  }, [isFinished, songData.duration, onSongFinish]);

  return (
    <div
      style={{ backgroundImage: `url(${albumCover})` }}
      className="bg-center rounded-md"
    >
      <div className="bg-black/65 backdrop-filter backdrop-blur-md border border-gray-950/95 rounded-md p-4 flex flex-col sm:flex-row gap-4 sm:items-center shadow-inner">
        <Image
          src={albumCover}
          alt={`Cover of album: ${songData.album.name}`}
          width={100}
          height={100}
          className="rounded-md h-auto aspect-square shadow-sm"
        />
        <div className="w-full space-y-4">
          <section>
            <span className="text-md font-bold inline-flex items-center gap-2">
              {songData.explicit ? <span>&#127348;</span> : <></>}
              <a
                className="hover:underline"
                href={songData.url}
                target="_blank"
              >
                {songData.name}
              </a>
            </span>
            <p className="text-sm">
              by{" "}
              {artists.map((artist, index) => (
                <a href={artist.url} key={index} target="_blank">
                  {index ? ", " : ""}
                  <span className="hover:underline">{artist.name}</span>
                </a>
              ))}
            </p>
            <p className="text-sm">
              on{" "}
              <a
                href={songData.album.url}
                target="_blank"
                className="hover:underline"
              >
                {songData.album.name}
              </a>
            </p>
          </section>
          <div className="flex gap-2 items-center">
            <p className="text-sm">{msToTime(songProgress)}</p>
            <ProgressBar
              value={(songProgress / songData.duration) * 100}
              className="bg-green-400"
            />
            <p className="text-sm">{msToTime(songData.duration)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
