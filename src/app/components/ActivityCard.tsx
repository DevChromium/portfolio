import {Activity} from "use-lanyard";
import {Terminal} from "@/app/components/Icons/Terminal";
import {Controller} from "@/app/components/Icons/Controller";
import Image from "next/image";
import {Temporal} from "@js-temporal/polyfill";
import {useEffect, useState} from "react";

type ActivityCardProps = {
    data: Activity;
}

export function ActivityCard({data}: ActivityCardProps) {
    const specialActivities = ["phpstorm", "webstorm", "visual studio code", "code"]
    const startTimestamp = data.timestamps?.start;
    const [elapsed, setElapsed] = useState('');


    useEffect(() => {
        if (!startTimestamp) return;

        const startInstant = Temporal.Instant.fromEpochMilliseconds(startTimestamp);

        const updateElapsed = () => {
            const now = Temporal.Now.instant();
            const diff = now.since(startInstant, { largestUnit: "hour" });


            const pad = (num: number) => String(num).padStart(2, '0');

            const formatted = diff.hours > 0
                ? `${pad(diff.hours)}:${pad(diff.minutes)}:${pad(diff.seconds)}`
                : `${pad(diff.minutes)}:${pad(diff.seconds)}`;
            setElapsed(formatted);
        };

        updateElapsed();
        const interval = setInterval(updateElapsed, 1000);
        return () => clearInterval(interval);
    }, [startTimestamp]);

    return (
        <section className="bg-zinc-900 rounded-md p-4 text-zinc-100 space-y-4 outline outline-zinc-800 text-left">
            <span className="flex gap-[1ch] items-center">
                {specialActivities.includes(data.name.toLowerCase()) ?
                    (<>
                        <Terminal className="text-white w-4 h-4 rounded-[2px]"/>
                        Programming
                    </>)
                    : (<>
                        <Controller className="text-white w-4 h-4"/>
                        Playing
                    </>)
                }
            </span>
            <div className="flex gap-4">
                <ActivityImage activity={data}/>
                <div className="flex flex-col justify-between">
                    <span>
                        <p className="font-bold">{data.name}</p>
                        <p className="text-sm">{data.details}</p>
                        <p className="text-sm">{data.state}</p>
                    </span>
                    {startTimestamp && (
                        <span className="text-sm select-none text-zinc-400">{elapsed}</span>
                    )}
                </div>
            </div>
        </section>
    )
}

function ActivityImage({activity}: {activity: Activity}) {

    if(!activity.assets) {
        return <div className="w-24 h-24 rounded-md bg-zinc-800 flex justify-center items-center">
            <Controller className="text-white w-10 h-10" />
        </div>;
    }

    const url = activity.assets.large_image.startsWith("mp:external") ? extractRealImageUrl(activity.assets.large_image) : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}`;

    return activity.assets && (
        <Image className="aspect-square w-24 h-24 rounded-md"  src={url} alt={activity.name} width={100} height={100}/>
    )
}

function extractRealImageUrl(url: string): string {
    const index = url.indexOf("https/");
    if (index === -1) return url;

    return url.slice(index).replace(/^https\//, "https://");
}
