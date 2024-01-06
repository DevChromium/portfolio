import { getNowPlaying } from "@/lib/spotify";
import { SpotifyResponse } from "@/types/Spotify";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {

    const response = await getNowPlaying()
    const data = await response.json()

    const song: SpotifyResponse = {
        album: {
            name: data.item.album.name,
            cover: data.item.album.images[0].url,
            url: data.item.album.external_urls.spotify
        },
        artists: data.item.artists.map((artist: any) => (
            {
                name: artist.name,
                url: artist.external_urls.spotify
            }
        )),
        name: data.item.name,
        url: data.item.external_urls.spotify,
        progress: data.progress_ms,
        duration: data.item.duration_ms,
        explicit: data.item.explicit
    }

    return NextResponse.json({
        is_playing: data.is_playing,
        song
    })

}