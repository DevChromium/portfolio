"use client";
import { msToTime } from "@/lib/converters";
import { SpotifyResponse } from "@/types/Spotify";
import Image from "next/image";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";
import { getNowPlaying } from "@/lib/spotify";

interface SpotifyCardProps {
  data: SpotifyResponse;
}

export const SpotifyCard = ({ data }: SpotifyCardProps) => {
  const [songData, setSongData] = useState(data);
  console.log(songData);
  const [songProgress, setSongProgress] = useState(songData.progress);
  const [isFinished, setIsFinished] = useState(
    songProgress === songData.duration
  );

  const albumCover = songData.album.cover;
  const artists = songData.artists;

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
              <a className="hover:underline" href={songData.url} target="_blank">
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
          <section className="flex flex-col">
            <ProgressBar
              value={(songProgress / songData.duration) * 100}
              className="bg-green-400"
            />
            <div className="inline-flex justify-between">
              <p className="text-sm">{msToTime(songProgress)}</p>
              <p className="text-sm">{msToTime(songData.duration)}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
