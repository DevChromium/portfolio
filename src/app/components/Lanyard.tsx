"use client"

import {useLanyardWS} from "use-lanyard";
import {SpotifyCard} from "@/app/components/SpotifyCard";
import {ActivityCard} from "@/app/components/ActivityCard";


export function Lanyard() {
    const data = useLanyardWS("257472912817258497", {
        api: {
            hostname: "lanyard.chrm.dev",
            secure: true
        }
    })

    if (!data) {
        return null;
    }

    return <section className="space-y-4 w-full">
        {data.spotify && <SpotifyCard data={data.spotify} />}
        {data.activities &&
            data.activities.filter((activity) => activity.type === 0).map((activity) => (
               <ActivityCard key={activity.name} data={activity}/>
            ))
        }
    </section>
}

