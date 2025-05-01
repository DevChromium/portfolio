import {Spotify} from "use-lanyard";
import { Spotify as SpotifyIcon } from "@/app/components/Icons/Spotify";
import Image from "next/image";
import {useEffect, useState} from "react";

type SpotifyCardProps = {
    data: Spotify
}

export function SpotifyCard({data}: SpotifyCardProps) {

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!data.timestamps?.start || !data.timestamps?.end) return;

        const start = data.timestamps.start;
        const end = data.timestamps.end;
        const totalDuration = end - start;
        setDuration(totalDuration);

        const update = () => {
            const now = Date.now();
            const current = Math.min(now - start, totalDuration); // Clamp
            setElapsed(current);
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [data.timestamps?.start, data.timestamps?.end]);

    const format = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        const pad = (n: number) => String(n).padStart(2, "0");

        return h > 0
            ? `${pad(h)}:${pad(m)}:${pad(s)}`
            : `${pad(m)}:${pad(s)}`;
    };

    const progressPercent = duration ? (elapsed / duration) * 100 : 0;

    return (
        <section className="bg-zinc-900 rounded-md p-4 text-zinc-100 space-y-4 outline outline-zinc-800 text-left">
            <span className="flex gap-[1ch] items-center">
                <SpotifyIcon className="w-4 h-4 text-white"/>
                Listening to Spotify
            </span>
            <div className="flex gap-4">
                <Image className="aspect-square w-24 h-24 rounded-md" src={data.album_art_url as string}
                       alt={data.album} width={100} height={100}/>
                <div className="w-full flex flex-col justify-between">
                    <span>
                        <p className="font-bold">{data.song}</p>
                        <p className="text-sm">on {data.album}</p>
                        <p className="text-sm">by {data.artist}</p>
                    </span>
                    {data.timestamps?.start && data.timestamps?.end && (
                        <div
                            className="text-sm text-zinc-400 mt-2 flex justify-between gap-2 select-none items-center">
                            <span>{format(elapsed)}</span>
                            <div className="w-full bg-zinc-700/60 h-2 rounded mt-1 overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-500"
                                    style={{width: `${progressPercent}%`}}
                                />
                            </div>
                            <span>{format(duration)}</span>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}