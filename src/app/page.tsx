import { SpotifyCard } from "@/components/ui/SpotifyCard";
import { getCurrentPlayback } from "@/lib/spotify";
import { Github, Mail } from "lucide-react";
import Image from "next/image";

export default async function Home() {

  let data = null

  try {
    data = await getCurrentPlayback();
  } catch(error) {
    console.log(error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="h-full w-full bg-gray-900/25 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-900/95 flex flex-col gap-4 p-4 max-w-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
          <Image
            src="/img/headshot.jpg"
            alt="Headshot image"
            width={100}
            height={100}
            className="rounded-md"
          />
          <section className="space-y-4">
            <div>
              <h1 className="font-bold text-2xl">Lucas Pauwels</h1>
              <p>Freelance Software Engineer</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-950/90 hover:bg-gray-900/90 border border-gray-900/95 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors ease-in-out">
                <Github />
              </button>
              <button className="bg-gray-950/90 hover:bg-gray-900/90 border border-gray-900/95 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors ease-in-out">
                <Mail />
              </button>
            </div>
          </section>
        </div>
        {data && <SpotifyCard data={data.item} />}
      </section>
    </main>
  );
}
