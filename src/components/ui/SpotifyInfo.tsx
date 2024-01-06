import { getNowPlaying } from "@/lib/spotify";
import { SpotifyCard } from "./SpotifyCard";
import Image from "next/image"

export async function SpotifyInfo() {
  const songData = await getNowPlaying()

  return (
    songData.item.is_playing ?? (
      <>
        <h3 className="font-medium text-lg inline-flex gap-2 items-center">
          <Image
            priority
            src="/spotify.svg"
            alt="Spotify icon"
            width={30}
            height={30}
            className="text-white"
          />{" "}
          Listening to Spotify
        </h3>
        <SpotifyCard data={songData} />
      </>
    )
  );
}
