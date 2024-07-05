"use client";
import { msToTime } from "@/lib/converters";
import { SpotifyResponse } from "@/types/spotify";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { motion } from "framer-motion";
import { MarqueeBounce } from "../core/MarqueeBounce";
import gsap from "gsap"

interface SpotifyCardProps {
  data: SpotifyResponse;
  onSongFinish: () => void;
}

export const SpotifyCard = ({ data, onSongFinish }: SpotifyCardProps) => {
  const [songData, _] = useState(data);
  const [songProgress, setSongProgress] = useState(songData.progress);
  const [isFinished, setIsFinished] = useState(
    songProgress === songData.duration
  );

  const [textWidth, setTextWidth] = useState<number>(0);
  const [maxTitleWidth, setMaxTitleWidth] = useState<number>(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const textWidthRef = useRef<HTMLDivElement>(null);
  const spotifyCardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const updateMaxTitleWidth = () => {
      if (titleRef.current) {
        const sectionWidth = titleRef.current.clientWidth;
        setMaxTitleWidth(sectionWidth);
      }
    };

    updateMaxTitleWidth();
    window.addEventListener("resize", updateMaxTitleWidth);

    return () => {
      window.removeEventListener("resize", updateMaxTitleWidth);
    };
  }, [songData.name]);

  useEffect(() => {
    const updateTextWidth = () => {
      if (textWidthRef.current) {
        setTextWidth(textWidthRef.current.clientWidth);
      }
    };

    updateTextWidth();
    window.addEventListener("resize", updateTextWidth);
    return () => {
      window.removeEventListener("resize", updateTextWidth);
    };
  }, [])

  return (
    <motion.section className="bg-zinc-950 border border-zinc-800 rounded-md p-4 shadow-inner space-y-4 w-full " ref={spotifyCardRef}>
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
        <div className="w-full overflow-hidden">
          <section ref={titleRef}>
            <div className="text-md font-bold inline-flex items-center gap-2">
              {songData.explicit ? (
                <Image
                  src={"/explicit.svg"}
                  alt="Excplicit song"
                  width={20}
                  height={20}
                  className="z-10 bg-zinc-950"
                />
              ) : (
                <></>
              )}
              <div className="inline-flex" ref={textWidthRef}>
                <MarqueeBounce
                  text={songData.name}
                  url={songData.url}
                  textWidth={textWidth}
                  maxTextWidth={maxTitleWidth}
                />
              </div>
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
    </motion.section>
  );
};
