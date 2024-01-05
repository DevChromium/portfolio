import { Item } from "@/types/Spotify";
import Image from "next/image"

interface SpotifyCardProps {
    data: Item;
}

export const SpotifyCard = ({ data }: SpotifyCardProps) => {
    const albumCover = data.album.images[0].url;
    const artists = data.artists.map(artist => artist.name).join(', ')

    return (
      <div
        style={{ backgroundImage: `url(${albumCover})` }}
        className="bg-center rounded-md"
      >
        <div className="bg-black/65 backdrop-filter backdrop-blur-md border border-gray-950/95 rounded-md p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
          <Image
            src={albumCover}
            alt={`Cover of album: ${data.album.name}`}
            width={100}
            height={100}
            className="rounded-md"
          />
          <div className="w-full">
            <p className="text-sm font-bold">{data.name}</p>
            <p className="text-sm">
              by <span className="italic">{artists}</span>
            </p>
            <p className="text-sm">
              on <span className="-italic">{data.album.name}</span>
            </p>
          </div>
        </div>
      </div>
    );
};
