import { getNowPlaying } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const response = await getNowPlaying()
    const { is_playing, item, progress_ms } = await response.json()

    const data = {
        album: {
            name: item.album.name,
            cover: item.album.images[0].url,
            url: item.album.external_urls.spotify
        },
        artists: item.artists.map((artist: any) => (
            {
                name: artist.name,
                url: artist.external_urls.spotify
            }
        )),
        name: item.name,
        url: item.external_urls.spotify,
        progress: progress_ms,
        duration: item.duration_ms,
        explicit: item.explicit
    }
    

    return NextResponse.json({
        is_playing,
        data
    })

}