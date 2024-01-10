"use client";
import { msToTime } from "@/lib/converters";
import { SpotifyResponse } from "@/types/Spotify";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";

interface SpotifyCardProps {
  data: SpotifyResponse;
  onSongFinish: () => void;
}

export const SpotifyCard = ({ data, onSongFinish }: SpotifyCardProps) => {
  const spotifyCardRef = useRef<RefObject<HTMLDivElement>>();
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
            onSongFinish();
            return songData.duration;
          }
          return newProgress;
        });
      }, 2000);
    }

    return () => clearInterval(interval); // Clean up the interval on unmount or finish
  }, [isFinished, songData.duration, onSongFinish]);

  return (
    <section className="bg-zinc-900/65 border border-zinc-900/95 rounded-md p-4 shadow-inner space-y-4">
      <div className="flex gap-2">
        <Image src={"/spotify.svg"} alt="Spotify logo" width={20} height={20} />
        <p className="max-w-prose text-sm font-semibold">
          Listening to Spotify
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <Image
          src={albumCover}
          alt={`Cover of album: ${songData.album.name}`}
          width={100}
          height={100}
          className="rounded-md shadow-sm"
        />
        <div className="w-full">
          <section>
            <div className="text-md font-bold inline-flex items-center gap-2">
              {songData.explicit ? (
                <span className="bg-white text-black rounded-sm text-[8px] w-3 h-3 text-center">
                  E
                </span>
              ) : (
                <></>
              )}
              <a
                className={`text-ellipsis hover:underline`}
                href={songData.url}
                target="_blank"
              >
                <span className="max-w-prose text-ellipsis">
                  {songData.name}
                </span>
              </a>
            </div>

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
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-sm">{msToTime(songProgress)}</p>
        <ProgressBar
          value={(songProgress / songData.duration) * 100}
          className="bg-[#1DB954]"
        />
        <p className="text-sm">{msToTime(songData.duration)}</p>
      </div>
    </section>
  );
};
