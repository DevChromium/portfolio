import { getCurrentPlayback } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const response = await getCurrentPlayback();

    if (response.status === 204 || response.status > 400) {
        return NextResponse.json({ is_playing: false })
    }

    const jsonData = await response.json();

    const data = {
        is_playing: jsonData.is_playing,
        song: jsonData.item.name,
        artists: jsonData.item.artists.map((artist: { name: string }) => artist.name).join(", "),
        album: jsonData.item.album.name,
        albumUrl: jsonData.item.album.external_urls.spotify,
        albumImageUrl: jsonData.item.album.images[0].url,
        songUrl: jsonData.item.external_urls.spotify,
        progress_ms: jsonData.progress_ms,
        duration_ms: jsonData.item.duration_ms
    }

    return NextResponse.json(data);
}